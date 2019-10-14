
//   type:mongoose.Schema.Types.ObjectId,
//ref:'registeredCollection'
const mongoose = require("mongoose");
let noteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registeredCollection"
    },
    labelId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "labelCollection"
    }],
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
    },
    isArchieve: {
        type: Boolean
    }
},
    {
        timestamps: true
    });
class NoteClass {
    constructor() {
        this.Note = mongoose.model("noteCollection", noteSchema);
    }
    /*************************************************************************************************/
    create(paramObject) {
        return new Promise((resolve, reject) => {

            let newNote = new this.Note({
                "userId": (paramObject.userId == null) ? "" : paramObject.userId,
                "noteTitle": (paramObject.title == null) ? "" : paramObject.title,
                "noteDescription": (paramObject.description == null) ? "" : paramObject.description,
                "reminder": (paramObject.reminder == null) ? "" : paramObject.reminder,            //condition ? consequent : alternative
                "color": (paramObject.color == null) ? "" : paramObject.color,
                "isTrash": (paramObject.isTrash == null) ? false : paramObject.isTrash,
                "isArchieve": (paramObject.isArchieve == null) ? false : paramObject.isArchieve
            });
            newNote.save()
                .then(savedNote => {
                    resolve(savedNote);
                })
                .catch(err => {
                    reject(err);
                });
        });

    }
    /*************************************************************************************************/
    read(searchBy) {
        return new Promise((resolve, reject) => {
            this.Note.find(searchBy).populate("labelId")
                .exec(function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
        });
    }
    /***POPULATE DEMO==>**********************************************************************************************/
    readLabel(searchBy, regexPattern) {
        return new Promise((resolve, reject) => {
            this.Note.find(searchBy).populate({
                path: "labelId",
                match: { labelName: { $regex: regexPattern } }
            })
                .exec(function (err, data) {
                    if (err) { reject(err); }
                    else { resolve(data); }
                });
        });
    }
    /*************************************************************************************************/
    update(findValue, updateValue) {

        return new Promise((resolve, reject) => {
            this.Note.updateOne(findValue, updateValue)
                .then((updatedResponse) => {
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
                    resolve(deletedData);
                })
                .catch(err => {
                    reject(err);

                });
        });
    }
}
let noteClassObject = new NoteClass();
module.exports = noteClassObject;