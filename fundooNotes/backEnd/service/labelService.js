const labelModel=require("../model/labelModel")
class LabelServiceClass{

  async  createLabelService(labelData){

        console.log("SERVICE LABEL",labelData)
     let labelResult =await labelModel.create(labelData)
     console.log("LABEl RESULt",labelResult)
     if(labelResult){

         return true
     }else{
        return false
     }
    }
}
let labelServiceObject=new LabelServiceClass();
module.exports=labelServiceObject;