 let obj = {
    name: 'Gurudev',
    education: 'IT Engineer',
    age:'22'
} ;

console.log("FULL OBJECT",obj)


let keyObject=Object.keys(obj);

console.log("ONLY KEY PARAMETER",keyObject);

let firstValue=keyObject[0];
console.log("FIRST VALUE",firstValue);


console.log("LENGTH OF THE OBJECT");
let objLength=Object.keys(obj).length
console.log("length=",objLength);

/********************************************* */
"title": (notesDetails.title == null) ? "" : notesDetails.title,
"description": (notesDetails.description == null) ? "" : notesDetails.description,
"isTrash": (notesDetails.isTrash == null) ? false : notesDetails.isTrash,
"isArchive": (notesDetails.isArchive == null) ? false : notesDetails.isArchive,
"reminder": (notesDetails.reminder == null) ? "" : notesDetails.reminder,
"color": (notesDetails.color == null) ? "" : notesDetails.color