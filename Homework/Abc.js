let fs=require('fs')
let ob={"name": "guru",
    "age": 23,
    "gender": "male",
    "department": "Physics",
    "car": "Bmw"}

fs.readFile('Abc.json', function(err,data)
{
    let file=JSON.parse(data)
    
    file.push(ob)
    console.log(file)

let val=JSON.stringify(file)
fs.writeFileSync('Abc.json',val)

let len=file.length
console.log(len)

})