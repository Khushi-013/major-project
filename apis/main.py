from typing import Annotated
from fastapi import FastAPI, File, UploadFile, Form
import uvicorn
import io
from PDF_Text import get_text_from_pdf, pages
from calculateScore import case_complex, complexity_score
from predict_timeline import predict_label
from db import insert_case_info, establish_connection, insert_case_proofs, Read
import joblib


# Load the trained model and encoders
clf = joblib.load('models/timeline_model80.pkl')
onehot_encoder = joblib.load('models/onehot_encoder.pkl')
label_encoder = joblib.load('models/label_encoder.pkl')
target_encoder = joblib.load('models/target_encoder.pkl')

app = FastAPI()

"""
@app.post("/login/")    #IGNORE 
async def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    #verify the user date from database
    return {"username": "user Found"}



@app.post("/resister/") #IGNORE 
async def resistration(userType: Annotated[str, Form()], name: Annotated[str, Form()], 
                        password: Annotated[str, Form()], email_id: Annotated[str, Form()], 
                        mo_no: Annotated[int, Form()],
                        profile_photo: UploadFile = File(...), ):
    #add data in database
    return {"None": None}


#IGNORE 
def convert_to_binary_data(file: UploadFile):
    #Converts uploaded file to binary data
    return file.file.read()
"""

@app.get("/")
async def dashboard():
    establish_connection()
    civil = Read(""" SELECT Count(*) FROM case_info where case_type = 'Civil' """)
    establish_connection()
    criminal = Read(""" SELECT Count(*) FROM case_info where case_type = 'Criminal' """)
    establish_connection()
    family = Read(""" SELECT Count(*) FROM case_info where case_type = 'Family' """)

    return {
        'CIVIL' : civil[0],
        'CRIMINAL' : criminal[0],
        'FAMILY' : family[0]
    }


@app.post("/case_resistration/")
async def case_res(case_id: Annotated[int, Form()], case_filing_date: Annotated[str, Form()], case_type: Annotated[str, Form()], 
                    case_category: Annotated[str, Form()],filed_case_type: Annotated[str, Form()], dv_case: Annotated[str, Form()], 
                    laws_applied: Annotated[str, Form()],parties_involved: Annotated[int, Form()], 
                    relevant_doc: UploadFile = File(...), other_proofs : UploadFile = File(...) ):


    #Complexity Score should be calculated
    
    # Read the PDF file content as bytes
    plaintiffs_proof_binary = await other_proofs.read() # binary
    plaintiffs_proof = io.BytesIO(plaintiffs_proof_binary)     # IoBytesdataasPDF

    petition_complaint_binary = await relevant_doc.read()  # binary
    
    print("file", plaintiffs_proof)

    number_of_proof_doc = pages(plaintiffs_proof)       #first parameter
    case_type_complex = complexity_score(case_type, case_category)   #second parameter

    case_complexity_score = number_of_proof_doc + parties_involved + case_type_complex     # overall score = with third parameter parties involved
    case_complexity = case_complex(case_complexity_score)                                   # high, low, medium

    print(case_complexity)

    #timeline_prediction
    input = [ case_type, dv_case, filed_case_type ]
    timeline = predict_label(clf, onehot_encoder, label_encoder, target_encoder, input)

    print(timeline)

    #insert case data into database
    establish_connection()
    insert_case_info(case_id,
    case_filing_date,
    case_type,
    case_category,
    filed_case_type,
    dv_case, 
    laws_applied,
    timeline,
    case_complexity_score,
    case_complexity,
    parties_involved)


    #insert Documents into database & binary conversion

    establish_connection()
    insert_case_proofs(case_id, petition_complaint_binary, plaintiffs_proof_binary)


    return {"Complexity: ": case_complexity,
            "Timeline : ": timeline}


@app.get("/case_information/")
async def get_case_data():
    sql_select_query = "SELECT * FROM case_info"

    establish_connection()
    records = Read(sql_select_query)

    print(records)
    # Display the retrieved records
    for row in records:
        print(f"Case ID: {row[0]}, Filing Date: {row[1]}, Case Type: {row[2]}, "
              f"Category: {row[3]}, Filed Case Type: {row[4]}, "
              f"DV Case: {row[5]}, Laws Applied: {row[6]}, "
              f"Timeline: {row[7]}, Complexity Score: {row[8]}, "
              f"Complexity: {row[9]}, Status: {row[10]}, Parties_involved: {row[13]}, "
              f"Disposition Date: {row[11]}, Disposition Status: {row[12]}")
              
    return records

"""
@app.post("/upload-pdf/")
async def read_pdf(
    filename: Annotated[str, Form()], file: UploadFile = File(...)
):
    try:
        # Read the PDF file content as bytes
        contents = await file.read()
        pdf_file = io.BytesIO(contents)

        clean_text = get_text_from_pdf(pdf_file)

        return {"text": clean_text}
    except Exception as e:
        return {"error": str(e)}
"""


if __name__ == '__main__':

    uvicorn.run(app, host = 'localhost', port = 8000)





