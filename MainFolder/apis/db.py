import mysql.connector as msc

con = None
cursor = None

# establish the database connection
def establish_connection():
    global con, cursor
    try:
        con = msc.connect(
            host="localhost",
            user="root",
            passwd="vipul",
            database="court_management"
        )
        cursor = con.cursor()
    except Exception as e:
        print(e)

# Insert data into the 'case_info' table
def insert_case_info(case_id, case_filing_date, case_type, case_category,
                     filed_case_type, dv_case, laws_applied, timeline,
                     case_complexity_score, case_complexity, parties_involved,
                     case_status=None, case_disp_date=None, disp_status=None):
    try:

        sql_insert_query = """ 
        INSERT INTO case_info (case_id, case_filing_date, case_type, 
                                case_category, filed_case_type, dv_case, 
                                laws_applied, timeline, 
                                case_complexity_score, case_complexity, parties_involved,
                                case_status, case_disp_date, disp_status) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
        """
        
        cursor.execute(sql_insert_query, (case_id, case_filing_date, case_type,
                                        case_category, filed_case_type, dv_case,
                                        laws_applied, timeline, 
                                        case_complexity_score, case_complexity, parties_involved, 
                                        case_status, case_disp_date, disp_status))
        con.commit()
        print(f"Case ID {case_id} inserted successfully.")

    except Exception as e:
        print(e)

    con.close()
    cursor.close()

# Convert the file into binary data and insert

def insert_case_proofs(case_id, petition_complaint_binary, plaintiffs_proof_binary, defendants_response_binary=None, defendants_proof_binary=None):
    try:    
        sql_insert_query = """
        INSERT INTO case_proofs (case_id, petition_complaint, plaintiffs_proof, defendants_response, defendants_proof) 
        VALUES (%s, %s, %s, %s, %s)
        """
        
        cursor.execute(sql_insert_query, (case_id, petition_complaint_binary, plaintiffs_proof_binary, defendants_response_binary, defendants_proof_binary))
        con.commit()
        print(f"Case ID {case_id} documents inserted successfully.")

    except Exception as e:
        print(e)

    cursor.close()
    con.close()


# Update the database
def Update(query):
    try:

        cursor.execute(query) 
        con.commit()

        if cursor.rowcount>0:
            print ("Data Updated Successfully...") 
        else: 
            print ("No DataFound")
    except Exception as e:
        print(e)
        
    con.close()
    cursor.close()



# read the required data
def Read(query):
    try:
        cursor.execute(query) 
        ans=cursor.fetchall()
        cursor.close()
        con.close()
        if ans:
            return ans
        else: 
            return 11
    except Exception as e:
        print(e)




'''
# Step 3: Call the function with sample data
insert_case_info(
    case_id=1,
    case_filing_date='2024-10-01',
    case_type='Criminal',
    case_category='Willful Homicide',
    filed_case_type='Felony',
    dv_case='Yes',  # Example binary data
    laws_applied='Law A, Law B',
    timeline='long',
    case_complexity_score=10,
    case_complexity='High'
)
'''