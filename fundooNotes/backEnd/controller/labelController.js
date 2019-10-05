const labelService = require("../service/labelService")
class LabelController {

    async createLabelController(req, res) {
        let response = {};
        try {
            req.checkBody("labelName", "labek name should not be null").notEmpty();

            let error = req.validationErrors();
            
            /******
             * @description-This error will generate validation error and send status code (422)
             * *** */
            if (error) {
                response.success = false;
                response.error = error;
                return res.status(422).send(response);
            } else {
                let labelData = {
                    "_id": req.token._id,
                    "labelName": req.body.labelName
                }
                let labelResult = await labelService.createLabelService(labelData)
                if (labelResult == true) {
                    response.success = true;
                    response.message = "New label created"
                    return res.status(200).send(response)
                } else {
                    response.success = false;
                    response.message = "Error while creating new label"
                    return res.status(500).send(response)
                }

            }
        } catch (e) {
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }

/*************************************************************************************************/
    async  updateLabelController(req, res) {
        let response = {};

        try {
            req.checkBody("updateLabelName", "labek name should not be null").notEmpty();
         
            let error = req.validationErrors();
            if (error) {
                response.success = false;
                return res.status(422).send(response);

            } else {
                let updateLabelData = {
                    "_id": req.body._id,
                    "newLabelName": req.body.updateLabelName
                }
                let updateLabelResult = await labelService.updateLabelService(updateLabelData)
                console.log("UPDATED RESULT",updateLabelResult)
                if (updateLabelResult == true) {
                    response.success = true;
                    response.message = "Label updated successfully";
                    return res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = "Error while label updating";
                    return res.status(400).send(response);
                }
            }
        } catch (e) {
            response.error = e;
            response.message = "The server did not understand the request.";
            console.log(e)
            return res.status(400).send(response);
        }

    }

/*************************************************************************************************/
    async deleteLabelController(req, res) {
        let response = {}
        try{
            let deleteLabelData = {
                "_id": req.body._id
            };
            let deletedLabelResult = await labelService.deleteLabelService(deleteLabelData)
            if (deletedLabelResult == true) {
                response.success = true;
                response.message = "Label deleted successfully";
                return res.status(200).send(response);
            }
            else {
                response.success = false;
                response.message = "Error while label deleting";
                return res.status(400).send(response);
            }
        }catch(e){
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }
/*************************************************************************************************/
    async getAllLabelController(req, res) {
        let response = {}
        try{
            console.log("GET ALL RESULT", req.token._id);
            let labelData = {
                "userId": req.token._id
            };
            let getAllLabelResult = await labelService.getAllLabelService(labelData)
            if (getAllLabelResult) {
                response.success = true;
                response.message = "Get all label successfully";
                response.data = getAllLabelResult;
                return res.status(200).send(response);
    
            } else {
                response.success = false;
                response.message = "Error while getting labels";
                return res.status(400).send(response);
            }
        }catch(e){
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
      
    }



}
let labelControllerObject = new LabelController();
module.exports = labelControllerObject;