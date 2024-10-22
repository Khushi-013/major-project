from PDF_Text import get_text_from_pdf
from Response import get_response
from calculateScore import complexity_score
import re

pdf_path = 'Abstract_Pandemic_Resilient_ATM.pdf'

extracted_text = """Sarah Jones and Robert Jones are siblings engaged in a legal dispute over their late parents' estate. 
Their parents, James and Linda Jones, passed away in 2022, leaving behind a sizeable estate that includes the family home, a vacation property, 
and several financial assets. The dispute centers around the division of the estate, particularly regarding the family home, 
which both Sarah and Robert want to retain for sentimental reasons.
"""

system_info = "you are the expert advocate as well as the master in all court-level tasks."

inforamation = """
this is some information for your reference in the form of Python dictionary, 
where the key is the category of court cases and values are the sub-categories in particular category. 
python_dictionary = {
    "Criminal Cases": {
        "Murder", "Assault", "Rape & Sexual Assault", "Robbery", "Kidnapping & False Imprisonment", 
        "Theft", "Burglary", "Arson", "Vandalism", "Possession", "Trafficking", "Manufacturing", 
        "Fraud", "Embezzlement", "Money Laundering", "Bribery", "Corruption", "Public Order Crimes", 
        "Traffic Violations", "Weapons Offenses", "Cybercrime"
    },

    "Civil Cases": {"Contract Formation", "Negligence", "Intentional Torts", "Product Liability", 
        "Property Torts", "Divorce & Separation", "Child Custody & Support", "Adoption", 
        "Domestic Violence", "Car Accidents", "Slip and Fall", "Medical Malpractice", 
        "Wrongful Death",  "Property Disputes", "Landlord-Tenant Disputes", "Real Property Transactions", 
        "Partnership Disputes", "Corporate Law", "Intellectual Property", "Wills and Estates", 
        "Insurance Disputes", "Consumer Protection", "Employment Law"
    },

    "Family Law Cases": {
        "No-Fault Divorce", "Fault-Based Divorce", "Annulment", "Physical Custody", 
        "Legal Custody", "Child Support", "Domestic Adoption", "International Adoption", 
        "Protective Orders", "Criminal Charges", "Paternity", "Prenuptial Agreements", "Guardianship"
    }
}
"""

actual_prompt = inforamation + """
Identify the court case category and its sub-category with the help above data for the text given below and
Only return the response in the format as "{ "category" : "xxxx", "sub-category" : "yyyy"} without any extra texts.
""" + "\ntext= \"" + extracted_text + "\""

res = get_response(system_info, actual_prompt)
print(res)

# Regex to extract category and sub-category
category = re.search(r'"category"\s*:\s*"([^"]+)"', res).group(1)
subcategory = re.search(r'"sub-category"\s*:\s*"([^"]+)"', res).group(1)

print("Category:", category)
print("Sub-Category:", subcategory)

# calculate complexity score for the case
case_complexity_score = complexity_score(category.lower(), subcategory)
print(case_complexity_score)