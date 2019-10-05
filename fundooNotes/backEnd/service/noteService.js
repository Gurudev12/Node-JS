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
        return new Promise((resolve, reject) => {
            let foundNoteData=[]
            let searchBy = { "_id": updateData._id }



            noteModel.read(searchBy)
                .then(data => {
                    if (data.length > 0) {
                        console.log("UPDATE VALUE",updateData.updateValue);
                        console.log("DATA SRVICE UPADATE",data)


                        //Tommarow staret code from here

                        // for(let i=0;i<data.length;i++)
                        // {
                        //     // console.log("====>",data[i])
                        //     if(updateData.updateValue==data[i].noteTitle){
                        //         console.log("#######33",data[i])
                        //     }
                        // }




                        resolve({ "status": true, "content": data })
                    } else {
                        resolve({ "status": false, "data": "Note was Not present" })
                    }
                })
                .catch(err => {
                    console.log("UPDATE SERVICE ERROR")
                    reject(err)

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