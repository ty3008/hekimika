import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

let dataBuffer = fs.readFileSync('public/WISE NATION.pdf');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('pdf_content.txt', data.text, 'utf8');
    console.log('Done');
}).catch(err => {
    console.error(err);
});
