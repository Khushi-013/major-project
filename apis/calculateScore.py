criminal_cases_complexity = {
    "Assault and Battery": 7,
    "Robbery": 8,
    "Willful Homicide (Att.)": 9,
    "Willful Homicide": 10,
    "Kidnapping": 9,
    "Forcible Rape": 9,
    "Burglary": 7,
    "Theft": 6,
    "Motor Vehicle Theft": 7,
    "Vandalism": 5,
    "Arson": 8,
    "Hit-and-Run": 6,
    "Trespassing": 5,
    "Forgery, Checks, Access Cards": 7,
    "Malicious Mischief": 6,
    "Narcotics": 8,
    "Marijuana": 7,
    "Other Sex Law Violations": 8,
    "DUI": 6,
    "Disorderly Conduct": 4,
    "Indecent Exposure": 5,
    "Disturbing Peace": 4,
    "Lewd Conduct": 5,
    "Escape": 6,
    "Liquor Laws": 4,
    "Failure to Appear/Non-Traffic": 5,
    "Annoy/Molest Children": 7,
    "Unlawful Sexual Intercourse": 7,
    "Contributing Delinquency of Minor": 6,
    "Selected Traffic": 4,
    "Gambling": 5,
    "Bookmaking": 6
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

def case_complex(complexity_score):

    if complexity_score <= 5:
        return 'Low'
    elif complexity_score <= 10:
        return 'Medium'
    else:
        return 'High'