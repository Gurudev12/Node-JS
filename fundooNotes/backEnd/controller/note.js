const noteService = require("../service/note");
class NoteController {

    //Create new note
    async  create(req, res) {
        let response = {};
        try {
            //It will pass the noteData object to service contain information regarding note while creating new note
            let noteData = {
                "userId": req.token._id,
                "title": req.body.noteTitle,
                "description": req.body.noteDescription,
                "reminder": req.body.reminder,
                "color": req.body.color,
                "isTrash": req.body.isTrash,
                "isArchieve": req.body.isArchieve
            };
            
            let noteResult = await noteService.create(noteData);
            if (noteResult) {
                response.success = true;
                response.message = "New note created";
                return res.status(200).send(response);
            } else {
                response.success = false;
                response.message = "Error while creating new note";
                return res.status(500).send(response);
            }

        } catch (e) {
            response.success = false;
            response.message = "Exception error";
            response.error = e;
            return res.status(400).send(response);
        }

    }
    /*************************************************************************************************/
    //update perticular note
    update(req, res) {
        let response = {};
        //here we only add the userId rq.body for identify unique users note
        req.body.userId = req.token._id;

        noteService.update(req.body)
            .then(updateData => {
                if (updateData.success == true) {
                    response.success = true;
                    response.message = "Updated note";
                    response.data = updateData;
                    return res.status(200).send(response);
                } else {
                    response.message = "Note not updated";
                    return res.status(200).send(response);
                }
            })
            .catch(err => {
                response.message = "Error while updating note";
                response.error = err;
                return res.status(200).send(response);

            });

    }
    /*************************************************************************************************/
    //delete perticular note
    delete(req, res) {
        let response = {};
        try {

            req.body.userId = req.token._id,



                noteService.delete(req.body)
                    .then(data => {
                        response.success = true;
                        response.message = "Delete note successfully";
                        response.data = data;
                        return res.status(200).send(response);

                    })
                    .catch(err => {
                        response.success = false;
                        response.message = "Error while getting deleting note";
                        response.error = err;
                        return res.status(500).send(response);

                    });

        } catch (e) {
            response.success = false;
            response.message = "Exception error";
            response.error = e;
            return res.status(400).send(response);
        }
    }
    /*************************************************************************************************/
    //Controller for getting all notes
    read(req, res) {
        console.log("CONTROLLER",req.query);
        
        let response = {};
        try {

            req.query.userId = req.token._id;
           
            
            noteService.read(req.query)
                .then(data => {
                    response.success = true;
                    response.message = "Got all notes";
                    response.data = data;
                    return res.status(200).send(response);
                })
                .catch(err => {
                    response.success = false;
                    response.message = "Error while getting all note";
                    response.error = err;
                    return res.status(500).send(response);
                });

        } catch (e) {
            response.success = false;
            response.message = "Exception error";
            response.error = e;
            return res.status(400).send(response);
        }

    }
    /*************************************************************************************************/
    //add label to the perticular note
    add(req, res) {
        let response = {};
        try {
            req.body.userId = req.token._id;
            
            noteService.add(req.body)
                .then(addLabelResponse => {
                    if (addLabelResponse == true) {
                        response.success = true;
                        response.message = "Label added to note successfully";
                        return res.status(200).send(response);
                    } else {
                        response.success = false;
                        response.message = "Label not added to note";
                        return res.status(400).send(response);
                    }
                })
                .catch(err => {
                    response.success = false;
                    response.message = "Error while adding label to note";
                    response.error = err;
                    return res.status(400).send(response);
                });
        }
        catch (e) {
            response.success = false;
            response.message = "Exception error";
            response.error = e;
            return res.status(400).send(response);
        }
    }
    /*************************************************************************************************/
    //Delete label from the note
    deleteLabel(req, res) {
        let response = {};

        req.body.userId = req.token._id;

        noteService.deleteLabel(req.body)
            .then(deleteLabelResponse => {
                if (deleteLabelResponse == true) {
                    response.success = true;
                    response.message = "Label deleted from note successfully";
                    return res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = "Label not deleted from note ";
                    return res.status(400).send(response);
                }
            })
            .catch(err => {
                response.success = false;
                response.message = "Error while deleting label from note";
                response.error = err;
                return res.status(400).send(response);
            });
    }
    /*************************************************************************************************/
    //Search note on basis of title,description etc
    search(req, res) {
        let response = {};
        req.body.userId = req.token._id;
        noteService.search(req.body)
            .then(searchNoteData => {
                if (searchNoteData) {
                    response.success = true;
                    response.message = "Got all notes",
                        response.data = searchNoteData;
                    return res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = "Search result not found";
                    return res.status(500).send(response);
                }

            })
            .catch(err => {
                response.success = false;
                response.message = "Error while Searching notes";
                response.error = err;
                return res.status(400).send(response);
            });
    }

    reminder(userId){
    return new Promise((resolve,reject)=>{
        noteService.reminder(userId)
        .then(reminderData=>{
            resolve(reminderData)
        })
        .catch(err=>{
            reject(err)
        })
    })
   

}


}
let noteControllerObject = new NoteController();
module.exports = noteControllerObject;