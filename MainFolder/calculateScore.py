criminal_cases_complexity = {
    "Murder": 10,
    "Assault": 6,
    "Rape & Sexual Assault": 9,
    "Robbery": 7,
    "Kidnapping & False Imprisonment": 8,
    "Theft": 5,
    "Burglary": 6,
    "Arson": 7,
    "Vandalism": 4,
    "Possession": 5,
    "Trafficking": 8,
    "Manufacturing": 7,
    "Fraud": 8,
    "Embezzlement": 7,
    "Money Laundering": 9,
    "Bribery": 7,
    "Corruption": 9,
    "Public Order Crimes": 4,
    "Traffic Violations": 3,
    "Weapons Offenses": 6,
    "Cybercrime": 8
}

civil_cases_complexity = {
    "Breach of Contract": 6,
    "Contract Formation": 5,
    "Contract Performance": 6,
    "Negligence": 7,
    "Intentional Torts": 8,
    "Product Liability": 7,
    "Property Torts": 6,
    "Divorce & Separation": 7,
    "Child Custody & Support": 8,
    "Adoption": 6,
    "Domestic Violence": 8,
    "Car Accidents": 6,
    "Slip and Fall": 5,
    "Medical Malpractice": 9,
    "Wrongful Death": 9,
    "Property Disputes": 7,
    "Landlord-Tenant Disputes": 5,
    "Real Property Transactions": 6,
    "Partnership Disputes": 7,
    "Corporate Law": 8,
    "Intellectual Property": 9,
    "Wills and Estates": 6,
    "Insurance Disputes": 7,
    "Consumer Protection": 5,
    "Employment Law": 8
}

family_law_cases_complexity = {
    "No-Fault Divorce": 4,
    "Fault-Based Divorce": 6,
    "Annulment": 5,
    "Physical Custody": 7,
    "Legal Custody": 8,
    "Child Support": 7,
    "Domestic Adoption": 6,
    "International Adoption": 8,
    "Protective Orders": 6,
    "Criminal Charges": 7,
    "Paternity": 5,
    "Prenuptial Agreements": 5,
    "Guardianship": 7
}

score = 0

def complexity_score(category, sub_category):
    try:
        if category in 'criminal cases':
            score = criminal_cases_complexity[sub_category]

        elif category in 'civil cases':
            score = civil_cases_complexity[sub_category]

        else:
            score = family_law_cases_complexity[sub_category]
    except:
        score = 5
            
    return score
