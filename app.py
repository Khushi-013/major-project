from flask import Flask, request, jsonify
import fitz  # PyMuPDF
from transformers import pipeline

app = Flask(__name__)

from transformers import pipeline

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6", cache_dir="E:/huggingface_models")


# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_file):
    text = ""
    with fitz.open(pdf_file) as pdf_document:
        for page in pdf_document:
            text += page.get_text()
    return text

# Route to handle file upload and summarization
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided.'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected.'}), 400

    # Extract text from the uploaded PDF file
    pdf_text = extract_text_from_pdf(file)

    # Generate summary using the Hugging Face summarizer
    summary = summarizer(pdf_text, max_length=130, min_length=30, do_sample=False)
    
    # Return the summary as JSON
    return jsonify({'summary': summary[0]['summary_text']})

if __name__ == '__main__':
    app.run(debug=True)
