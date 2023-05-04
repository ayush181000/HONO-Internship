//const ResumeParser = require('./node_modules/resume-parser/src');
const { parseFromBuffer } = require("@itfin/resume-parser");
const ResumeParser = require('easy-resume-parser');  // working


// From file
// const resume = new ResumeParser("./resume.doc");


// From URL
// const resume = new ResumeParser("https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf");



//Convert to JSON Object
// resume.parseToJSON()
//     .then(data => {
//         console.log('Yay! ', data);
//     })
//     .catch(error => {
//         console.error(error);
//     });



// parseFromBuffer("./resume.pdf").then((data) => { console.log(data) }).catch((err) => { console.log(err) });

// working with html and txt
// actions can be extended by src/dictionary.js
const resume = new ResumeParser("./files/resume.html");
resume.parseToFile('converted') //output subdirectory
    .then(file => {
        console.log('Yay! ', file);
    })
    .catch(error => {
        console.error(error);
    });

