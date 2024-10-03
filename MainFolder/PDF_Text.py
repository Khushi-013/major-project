from pypdf import PdfReader

def get_text_from_pdf(pdf_path='Abstract_Pandemic_Resilient_ATM.pdf'):

    # creating a pdf reader object
    reader = PdfReader(pdf_path)

    # printing number of pages in pdf file
    # print(len(reader.pages))

    # getting a specific page from the pdf file
    page = reader.pages[0]

    # extracting text from page
    text = page.extract_text()
    
    return text

