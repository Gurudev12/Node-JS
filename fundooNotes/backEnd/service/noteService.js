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

      let  keyObject=Object.keys(updateData)
        console.log("OBJECT KEY",keyObject)
        return new Promise((resolve, reject) => {

            let searchBy = { "_id": updateData._id }
            noteModel.read(searchBy)
            .then(foundData=>{
                let  keyObjectFound=Object.keys(foundData)
                console.log("FOUNDED DATA",foundData)
                console.log("KEY OBJECT FOUND  DATA",keyObjectFound)

            })
            .catch(err=>{
                console.log("ERROR",err)

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