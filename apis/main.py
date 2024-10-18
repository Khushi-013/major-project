from typing import Annotated
from fastapi import FastAPI, File, UploadFile, Form
import uvicorn
from PyPDF2 import PdfReader
import io
from PDF_Text import get_text_from_pdf, pages
import datetime
import calculateScore
import docs_complexity
import Response

app = FastAPI()


@app.post("/login/")
async def login(username: Annotated[str, Form()], password: Annotated[str, Form()]):
    #verify the user date from database
    return {"username": "user Found"}



@app.post("/resister/")
async def resistration(userType: Annotated[str, Form()], name: Annotated[str, Form()], 
                        password: Annotated[str, Form()], email_id: Annotated[str, Form()], 
                        mo_no: Annotated[int, Form()],
                        profile_photo: UploadFile = File(...), ):
    #add data in database
    return {"None": None}



@app.post("/case_resistration/")
async def case_res(court_name: Annotated[str, Form()],case_Type: Annotated[str, Form()], category: Annotated[str, Form()], 
                   case_title: Annotated[str, Form()], applicale_law: Annotated[str, Form()], 
                   parties_involved: Annotated[int, Form()], relevant_doc: UploadFile = File(...), 
                   other_proofs : UploadFile = File(...) ):


    #Complexity Score should be calculated

    # Read the PDF file content as bytes
    contents = await other_proofs.read()
    pdf_file = io.BytesIO(contents)
    clean_text = get_text_from_pdf(pdf_file)

    number_of_proof_doc = docs_complexity.pages(pdf_file)
    case_type_complex = calculateScore.complexity_score(case_Type, category)

    complexity = number_of_proof_doc + parties_involved + case_type_complex

    content = await other_proofs.read()
    case_doc_content = io.BytesIO(content)
    clean_text = get_text_from_pdf(case_doc_content)

    text = "Is the given information scenario below ralating to the case category \"" + category + "\"\n"
    text = text + "\nScenario: " + clean_text + "\n"
    promt = text + "just return answer as True or False"

    status = Response.get_response(prompt= promt)

    #Database Entry should be done
    num = 2 #SQl QUERY 2         
    case_num = "C" + str(num)
    filing_date = datetime.datetime()
    
    return {"Complexity: ": complexity,
            "Relevant doc? : ": status}



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



if __name__ == '__main__':

    uvicorn.run(app, host = 'localhost', port = 8000)





