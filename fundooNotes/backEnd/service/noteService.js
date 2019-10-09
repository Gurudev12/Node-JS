const noteModel = require("../model/noteModel")
class NoteService {
    async createNoteService(noteData) {
        try {
            let noteResult = await noteModel.create(noteData)
            if (noteResult) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return e
        }
    }
    /*************************************************************************************************/
    updateNoteService(updateData) {

        let keyObject = Object.keys(updateData)
        console.log("OBJECT KEY", keyObject)

        return new Promise((resolve, reject) => {
            let findValue = {};
            let updateValue = {};
            for (let i = 0; i < keyObject.length; i++) {
                if (keyObject[i] == '_id' || keyObject[i] == 'userId') {

                    findValue[keyObject[i]] = updateData[keyObject[i]]
                    console.log("FOINDDDDDDDDDDDDDD", findValue)
                    continue;
                }
                updateValue[keyObject[i]] = updateData[keyObject[i]]
                console.log("\nUPDATE VALUES===>", updateValue)
            }
            noteModel.update(findValue, updateValue)
                .then(data => {
                    console.log("SERVICE DATA&&&&&&&&&&&&&&&&&&&&&",data);
                    resolve(data);
                })
                .catch(err => {
                    console.log("ERRR UPDATING NOTE");
                    reject(err);
                    
                })

        })
    }
    /*************************************************************************************************/
    deleteNoteService(deleteData) {
        try {
            return new Promise((resolve, reject) => {

                let searchBy = { "_id": deleteData._id }
                noteModel.delete(searchBy)
                    .then(deletedData => {
                        resolve(deletedData)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        } catch (e) {
            return e
        }
    }
    /*************************************************************************************************/




    /*************************************************************************************************/
    getAllNoteService(loginData) {
        try {
            return new Promise((resolve, reject) => {
                let searchBy = { "userId": loginData.userId }
                noteModel.read(searchBy)
                    .then(readData => {
                        resolve(readData)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })

        } catch (e) {
            return e
        }

    }
}
let noteServiceObject = new NoteService();
module.exports = noteServiceObject