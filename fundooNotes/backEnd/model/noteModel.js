
//   type:mongoose.Schema.Types.ObjectId,
//ref:'registeredCollection'
const mongoose = require('mongoose')
let noteSchema = mongoose.Schema({
    userId: {
        type: String
    },
    noteTitle: {
        type: String,
        required: [true, "Title is empty"]
    },
    noteDescription: {
        type: String,
        required: [true, "noteDescription is empty"]
    },
    reminder: {
        type: String
    },
    color: {
        type: String
    },
    isTrash: {
        type: Boolean
    }
},
    {
        timestamps: true,
    })
class NoteClass {
    constructor() {
        this.Note = mongoose.model("noteCollection", noteSchema)
    }
    /*************************************************************************************************/
    create(paramObject) {
        return new Promise((resolve, reject) => {
            let newNote = new this.Note({
                "userId": paramObject.userId,
                "noteTitle": paramObject.title,
                "noteDescription": paramObject.description,
                "reminder": (paramObject.reminder == null) ? "" : paramObject.reminder,            //condition ? consequent : alternative
                "color": (paramObject.color == null) ? "" : paramObject.color,
                "isTrash": (paramObject.isTrash == null) ? false : paramObject.isTrash
            })
            newNote.save()
                .then(savedNote => {
                    resolve(savedNote)
                })
                .catch(err => {
                    reject(err)
                })
        })

    }
    /*************************************************************************************************/
    read(searchBy) {
        return new Promise((resolve, reject) => {
            this.Note.find(searchBy)
                .then(findData => {

                    resolve(findData)
                })
                .catch(err => {
                    reject(err)

                })
        })
    }
    /*************************************************************************************************/
    update(findValue, updateValue) {

        console.log("MODEEEEEEEEEEEEELLLLLLLLLLLLLL FIND VALUE", findValue);
        console.log("MODEEEEEEEEEEEEELLLLLLLLLLLLLL UPDATE VALUE", updateValue);


        return new Promise((resolve, reject) => {
            this.Note.updateOne(findValue, { $set: updateValue })
                .then((updatedResponse) => {
                    console.log(updatedResponse)
                    resolve(updatedResponse);
                })
                .catch(err => {
                    reject("DOCUMENT UPDATED FAILED");
                });
        });
    }
    /*************************************************************************************************/
    delete(deleteValue) {
        return new Promise((resolve, reject) => {
            this.Note.deleteOne(deleteValue)
                .then(deletedData => {
                    console.log("DELETED DATA", deletedData)
                    resolve(deletedData)
                })
                .catch(err => {
                    console.log("DELETED ERROR", err)
                    reject(err)

                })
        })
    }
}
let noteClassObject = new NoteClass();
module.exports = noteClassObject;