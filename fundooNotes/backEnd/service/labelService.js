const labelModel = require("../model/labelModel");
class LabelServiceClass {

    
    async  createLabelService(labelData) {
        try{
            
            let labelResult = await labelModel.create(labelData);

            if (labelResult) 
                {return true;}
            else 
                {return false;}
            
        }catch(e){
            return e;
        }
    
    }
/*************************************************************************************************/

    async updateLabelService(updateLabelData) {
        try{
            let searchBy = { "_id": updateLabelData._id };
            let findLabelResult = await labelModel.read(searchBy);
    
            if (findLabelResult) {
    
                let findValue = { "_id": findLabelResult[0]._id };
                let updateValue = { "labelName": updateLabelData.newLabelName };
                let updateLabelResult = await labelModel.update(findValue, updateValue);
                if (updateLabelResult) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }catch(e){
            return e;
        }
     
    }

/*************************************************************************************************/
    async deleteLabelService(deleteLabelData) {
        try{
            let deleteValue = { "_id": deleteLabelData._id };

            let deleteLabelResult = await labelModel.delete(deleteValue);
            if (deleteLabelResult) {
                return true;
            } else {
                return false;
            }
        }catch(e){
            return e;
        }
    
    }

/*************************************************************************************************/
    async getAllLabelService(labelData) {
        try{
            let searchBy={"userId":labelData.userId};
            let allLabelData=await labelModel.read(searchBy); 
            if(allLabelData){
    
                return allLabelData;
            }else{
    
                return false;
            }
        }catch(e){
            return e;
        }
      
    }
}
let labelServiceObject = new LabelServiceClass();
module.exports = labelServiceObject;