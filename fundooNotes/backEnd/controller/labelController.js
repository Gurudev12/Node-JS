const labelService=require("../service/labelService")
class LabelController {

    async createLabelController(req, res) {
        let error = req.validationErrors();
        let response = {};
        /******
         * @description-This error will generate validation error and send status code (422)
         * *** */
        if (error) {
            response.success = false;
            response.error = error;
            return res.status(422).send(response);
        }else{
            let labelData={
                "_id":req.token._id,
                "labelName":req.body.labelName
            }
      let labelResult   = await labelService.createLabelService(labelData)
            if(labelResult==true){
                response.success=true;
                response.message="New label created"
                return res.status(200).send(response)
            }else{
                response.success=false;
                response.message="Error while creating new label"
                return res.status(500).send(response)
            }

        }
    }

}
let labelControllerObject = new LabelController();
module.exports = labelControllerObject;