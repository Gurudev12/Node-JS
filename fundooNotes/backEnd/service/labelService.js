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
            //searchBy object contain the _id of label and it will find it into the labelCollection.
            let searchBy = { "_id": updateLabelData._id };
            let findLabelResult = await labelModel.read(searchBy);
    
            if (findLabelResult) {
                //if it will get perticular label then apply update query
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
            //deleteValue object contain which data wants tobe deleted 
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
            //searchBy object contain userId
            let searchBy={"userId":labelData.userId};
            //read() method get all the labels of perticular user
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