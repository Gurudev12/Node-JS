
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
class NoteModel {
    constructor() {
        this.Note = mongoose.model("noteCollection", noteSchema);
    }
    /*************************************************************************************************/
    create(paramObject) {
        return new Promise((resolve, reject) => {

            let newNote = new this.Note({
                "userId": (paramObject.userId == null) ? "" : paramObject.userId, //condition ? consequent : alternative
                "noteTitle": (paramObject.title == null) ? "" : paramObject.title,
                "noteDescription": (paramObject.description == null) ? "" : paramObject.description,
                "reminder": (paramObject.reminder == null) ? "" : paramObject.reminder,
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
                        // console.log("model\n\n\n",data);
                        resolve(data);
                    }
                });
        });
    }
    /*************************************************************************************************/
    readLabel(searchBy, regexPattern) {
        return new Promise((resolve, reject) => {
            this.Note.find(searchBy).populate({
                path: "labelId",
                match: { labelName: { $regex: regexPattern } }
            })
                .exec(function (err, data) {
                    if (err)
                     { 
                         reject(err); 
                        }

                    else { 
                        resolve(data); 
                    }
                });
        });
    }
    /*************************************************************************************************/
    update(findValue, updateValue) {
        
        return new Promise((resolve, reject) => {
            this.Note.updateOne(findValue, updateValue)
                .then((updatedResponse) => {
                    console.log("RESPONCE",updatedResponse);
                    
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
                    console.log("MODEL RESPONXE",deletedData);
                    
                    resolve(deletedData);
                })
                .catch(err => {
                    console.log("ERRR MODEL RESPONXE",deletedData);

                    reject(err);

                });
        });
    }


  /**
     * method used for getAll matched label on note
     * @param {*} findQuery find query for get Note of particular user
     * @param {*} regexPattern user search value for match with label
     */
     findLabelMatch(findQuery,populateObject) {
        return new Promise((resolve, reject) => {
            console.log("\n\n\n\n\nLABELS ON NOTE");

            this.Note.find(findQuery).populate(populateObject).exec(function (err, users) {
                if(err){
                    reject(err)
                }
                /** filter for get only matched label on note data */
                users = users.filter(function (user) {
                    console.log("\n\n\n\n\nLABELS ON NOTE",user.labelId);
                    
                    if (user.labelId.length > 0)
                        return user;
                });
                resolve(users);
            });
        });
    }


}
let noteModelObject = new NoteModel();
module.exports = noteModelObject;