import PyPDF2

with open('public/WISE NATION.pdf', 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ''
    for page in reader.pages:
        text += page.extract_text() + '\n'

with open('pdf_content.txt', 'w', encoding='utf-8') as outfile:
    outfile.write(text)
print('Done!')
