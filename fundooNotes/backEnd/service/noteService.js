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

        return new Promise((resolve, reject) => {
            let findValue = {};
            let updateValue = {};
            for (let i = 0; i < keyObject.length; i++) {
                if (keyObject[i] == '_id' || keyObject[i] == 'userId') {

                    findValue[keyObject[i]] = updateData[keyObject[i]]
                    continue;
                }
                updateValue[keyObject[i]] = updateData[keyObject[i]]
            }
            noteModel.update(findValue, updateValue)
                .then(updateResponse => {
                    if (updateResponse.nModified == 1) {
                        resolve({ "success": true, "message": "Note updated successfully" });
                    } else {
                        reject({ "success": false, "message": "Note not updated" })
                    }

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

    searchNoteService(searchNoteData) {

        return new Promise((resolve, reject) => {
            let value = searchNoteData.search;
            let searchBy = {
                $and: [{
                    $or: [
                        { "noteTitle": { $regex: value, $options: "i" } },
                        { "noteDescription": { $regex: value, $options: "i" } },
                        { "reminder": { $regex: value, $options: "i" } },
                        { "color": { $regex: value, $options: "i" } },
                    ]
                },
                { "userId": searchNoteData.userId }]
            }

            noteModel.readLabel(searchBy)
            .then(data=>{

            })
            .catch(err=>{

            })

              




            // noteModel.read(searchBy)
            //     .then(foundResult => {
            //         if (foundResult.length > 0) {
            //             console.log("SERVICE RESULT NOTE", foundResult)
            //             resolve({ status: true, data: foundResult })
            //         }
            //         else {
            //             console.log(foundResult);
            //             resolve({ status: false })
            //         }

            //     })
            //     .catch(err => {
            //         console.log("SERVICE ERROR", err)
            //         reject(err)
            //     })


        })

    }




}
let noteServiceObject = new NoteService();
module.exports = noteServiceObject

// $or: [
//     {
//       _id: {
//         $regex: value,
//         $options: 'ig',
//       },
//     },
//     {
//       name: {
//         $regex: value,
//       $options: 'ig',
//       },
//     },
//   ],