const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/WISE NATION.pdf');

const parser = typeof pdf === 'function' ? pdf : pdf.default;

parser(dataBuffer).then(function (data) {
    fs.writeFileSync('pdf_content.txt', data.text, 'utf8');
    console.log('Done');
}).catch(err => {
    console.error(err);
});
