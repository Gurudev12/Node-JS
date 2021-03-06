const labelService = require("../service/label");
class LabelController {
    /**
     * 
     * @param {*} req user request
     * @param {*} res server response
     */
    async create(req, res) {
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
                //Here we getting userId from its token,and label name asusual user req 
                let labelData = {
                    "userId": req.token._id,
                    "labelName": req.body.labelName
                };
                
                let labelResult = await labelService.create(labelData);
                if (labelResult == true) {
                    response.success = true;
                    response.message = "New label created";
                    return res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = "Error while creating new label";
                    return res.status(500).send(response);
                }

            }
        } catch (e) {
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }

    /*************************************************************************************************/

    /**
     * 
     * @param {*} req user request
     * @param {*} res server response
     */
    async  update(req, res) {



        console.log("\n\n\n\nfbghgfjhjg",req.body);

        let response = {};

        try {
            req.checkBody("updateLabelName", "label name should not be null").notEmpty();

            let error = req.validationErrors();
            if (error) {
                response.success = false;
                return res.status(422).send(response);

            } else {
                console.log("\n\n\n\n=============>",req.body);
                
                //Here we are paasing id of label and new label name
                let updateLabelData = {
                    "_id": req.body._id,
                    "newLabelName": req.body.updateLabelName
                };
                let updateLabelResult = await labelService.update(updateLabelData);
                if (updateLabelResult == true) {
                    response.success = true;
                    response.message = "Label updated successfully";
                    return res.status(200).send(response);
                } else {
                    response.success = false;
                    response.message = "Error while label updating";
                    return res.status(500).send(response);
                }
            }
        } catch (e) {
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }

    /*************************************************************************************************/
    /**
  * 
  * @param {*} req user request
  * @param {*} res server response
  */
    async delete(req, res) {
        
        let response = {};
        try {
            let deleteLabelData = {
                "_id": req.body._id,
                "userId":req.body.userId
            };
            let deletedLabelResult = await labelService.delete(deleteLabelData);
            if (deletedLabelResult == true) {
                response.success = true;
                response.message = "Label deleted successfully";
                return res.status(200).send(response);
            }
            else {
                response.success = false;
                response.message = "Error while label deleting";
                return res.status(500).send(response);
            }
        } catch (e) {
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }
    }
    /*************************************************************************************************/
    /**
 * 
 * @param {*} req user request
 * @param {*} res server response
 */
    async read(req, res) {        
        let response = {};
        try {            
            let labelData = {
                "userId": req.token._id
            };
            // req.query.userId=req.token._id;
            
            // console.log("CONTROLLER label ====>",req.query);
            let getAllLabelResult = await labelService.read(labelData);
            // console.log("CONTRoller",getAllLabelResult);
            
            // let getAllLabelResult = await labelService.read(req.query);
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
        } catch (e) {
            response.error = e;
            response.message = "The server did not understand the request.";
            return res.status(400).send(response);
        }

    }

}
let labelControllerObject = new LabelController();
module.exports = labelControllerObject;