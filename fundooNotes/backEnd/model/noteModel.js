

const mongoose = require('mongoose')
let noteSchema = mongoose.Schema({
    userId:{
        type:String,
        required:[true,"userId is required"]
    },
    noteTitle: {
        type: String,
        required: [true, "Title is empty"]
    },
    noteDescription: {
        type: String,
        required: [true, "noteDescription is empty"]
    },
    reminder:{
        type:Date
    },
    color:{
        type:String
    },
    isTrash:{
        type:Boolean
    }
},
    {
        timestamps: true,
    })
class NoteClass {
    constructor() {
        this.Note = mongoose.model("noteCollection",noteSchema)
    }
/*************************************************************************************************/
    create(paramObject){
        return new Promise((resolve,reject)=>{
            let newNote= new this.Note({
                "userId":paramObject.userId,
                "noteTitle":paramObject.title,
                "noteDescription":paramObject.description,
                
            })
            newNote.save()
            .then(savedNote=>{
                resolve(savedNote)
            })
            .catch(err=>{
                reject(err)
            })
        })

    }
/*************************************************************************************************/
    read(searchBy){
        return new Promise((resolve,reject)=>{
            this.Note.find(searchBy)
            .then(findData=>{

                 resolve(findData)
            })
            .catch(err=>{
                console.log("EROOOR MODEL",err)
                reject(err)

            })
        })
    }
/*************************************************************************************************/
    update(){

    }
/*************************************************************************************************/
    delete(deleteValue){
        return new Promise((resolve,reject)=>{
            this.Note.deleteOne(deleteValue)
            .then(deletedData=>{
                console.log("DELETED DATA",deletedData)
                resolve(deletedData)
            })
            .catch(err=>{
                console.log("DELETED ERROR",err)
                reject(err)

            })
        })
    }
}
let noteClassObject = new NoteClass();
module.exports = noteClassObject;