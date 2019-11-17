const labelModel = require("../model/label");
const logger = require('../config/log');
const redisService = require("./redis")

class LabelService {


    async  create(labelData) {

        let labelResult = await labelModel.create(labelData);

        if (labelResult) {
            
            //update logger file
            logger.info("created new note", labelData)

            // let deleteArray = [labelData.userId + "isTrashNotes", labelData.userId + "isArchieveNotes", labelData.userId + "allNotes", labelData.userId + "reminderNotes" + labelData.userId + "labels"]
            let deleteArray = [labelData.userId + "isTrashNotes", labelData.userId + "isArchieveNotes", labelData.userId + "allNotes", labelData.userId + "reminderNotes",  labelData.userId + "labels"]

            let redisResult = await redisService.delete(deleteArray)
            if (redisResult == true) {
                return true
            } else {
                return false
            }
            
        }
        else {
            //update logger file
            logger.error("Error while creating new label")
            return false;
        }
    }
    /*************************************************************************************************/
    async update(updateLabelData) {
        //searchBy object contain the _id of label and it will find it into the labelCollection.
        let searchBy = { "_id": updateLabelData._id };
        let findLabelResult = await labelModel.read(searchBy);

        if (findLabelResult) {
            //if it will get perticular label then apply update query
            let findValue = { "_id": findLabelResult[0]._id };
            let updateValue = { "labelName": updateLabelData.newLabelName };
            let updateLabelResult = await labelModel.update(findValue, updateValue);
            if (updateLabelResult) {

                //update logger file
                logger.info("updated Label", findValue)

                return true;
            } else {
                //update logger file
                logger.error("Error while updating label")

                return false;
            }
        } else {
            //update logger file
            logger.error("Label not present in database")
            return false;
        }
    }
    /*************************************************************************************************/
    async delete(deleteLabelData) {

        //deleteValue object contain which data wants tobe deleted 
        let deleteValue = { "_id": deleteLabelData._id };

        let deleteLabelResult = await labelModel.delete(deleteValue);
        if (deleteLabelResult) {

            //update logger file
            logger.info("Label deleted", deleteValue)
            let deleteArray = [deleteLabelData.userId + "isTrashNotes", deleteLabelData.userId + "isArchieveNotes", deleteLabelData.userId + "allNotes", deleteLabelData.userId + "reminderNotes",  deleteLabelData.userId + "labels"]

            let redisResult = await redisService.delete(deleteArray)
            if (redisResult == true) {
                return true
            } else {
                return false
            }
            
        } else {
            //update logger file
            logger.error(" Label not deleted", deleteValue)
            return false;
        }
    }

    /*************************************************************************************************/
    //Service for getting all label from database
    async read(labelData) {

        //searchBy object contain userId
        let searchBy = { "userId": labelData.userId };
        let redisData=[];
        let allLabelData,redisValue
        //read() method get all the labels of perticular user
        ///
        let redisKey = labelData.userId + "labels";


    // await redisService.redisGetter(redisKey, async (err, reply) => {
        redisValue= await redisService.redisGetterLabel(redisKey)
            redisData = JSON.parse(redisValue);
            // return redisData
            if (redisData) {
                return redisData
            }
            else {
                 allLabelData = await labelModel.read(searchBy);   
                //removed await
                if (allLabelData.length >= 0) {

                    redisService.redisSetter(redisKey, JSON.stringify(allLabelData))

                    //Then resolve notes from redis
                    // redisService.redisGetter(redisKey, (err, reply) => {
                      redisValue  =await redisService.redisGetterLabel(redisKey)
                        redisData = JSON.parse(redisValue);

                        //update logger file
                        logger.info("All labels", redisData)
                        return redisData;

                    // })

                } else {
                    //update logger file

                    logger.error("Labels are not present")
                    return false;    
                }

            }
       
    }
}
let labelServiceObject = new LabelService();
module.exports = labelServiceObject;