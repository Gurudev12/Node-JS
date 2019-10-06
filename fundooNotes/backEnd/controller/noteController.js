const noteService = require("../service/noteService")
class NoteController {

    async  createNoteController(req, res) {
        let response = {}
        try{
           
            let noteData = {
                "userId": req.token._id,
                "title": req.body.noteTitle,
                "description": req.body.noteDescription,
                "reminder": req.body.reminder
            }
    
            let noteResult = await noteService.createNoteService(noteData)
            if (noteResult) {
                response.success = true;
                response.message = "New note created"
                return res.status(200).send(response)
            } else {
                response.success = false;
                response.message = "Error while creating new note"
                return res.status(500).send(response)
            }

        }catch(e){
            response.success=false;
            response.message="Exception error";
            response.error=e
            return res.status(400).send(response)
        }
       
    }
/*************************************************************************************************/

    updateNoteController(req,res){
    let response={}
        req.body.userId=req.token._id
        
        console.log("CONTROLLER req.body",req.body)
        noteService.updateNoteService(req.body)
        .then(updateData=>{
            if(updateData.status==true){
                response.success = true;
                response.message = "Updated note"
                response.data=updateData
                return res.status(200).send(response)
            }else{
                response.message = "Note not present"
                return res.status(200).send(response)
            }

        })
        .catch(err=>{

        })

    }
/*************************************************************************************************/
    deleteNoteController(req, res) {
        let response = {}
        try{
            let deleteData = {
                "userId": req.token._id,
                "_id": req.body._id
            };
    
            noteService.deleteNoteService(deleteData)
                .then(data => {
                    response.success = true;
                    response.message = "Delete note successfully"
                    response.data = data
                    return res.status(200).send(response)
    
                })
                .catch(err => {
                    response.success = false;
                    response.message = "Error while getting deleting note"
                    response.error = err
                    return res.status(500).send(response)
    
                })

        }catch(e){
            response.success=false;
            response.message="Exception error";
            response.error=e
            return res.status(400).send(response)
        }
    }
/*************************************************************************************************/
    getAllNoteController(req, res) {
        let response = {}
        try{
            let userId = {
                "userId": req.token._id
            }
            noteService.getAllNoteService(userId)
                .then(data => {
                    response.success = true;
                    response.message = "Got all notes"
                    response.data = data
                    return res.status(200).send(response)
                })
                .catch(err => {
                    response.success = false;
                    response.message = "Error while getting all note"
                    response.error = err
                    return res.status(500).send(response)
                })

        }catch(e){
            response.success=false;
            response.message="Exception error";
            response.error=e
            return res.status(400).send(response)
        }
  
    }

    // updateNoteController(req,res){

    // }
}
let noteControllerObject = new NoteController();
module.exports = noteControllerObject;