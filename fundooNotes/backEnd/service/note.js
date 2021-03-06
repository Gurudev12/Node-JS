const noteModel = require("../model/note");
const redisService = require("./redis")
const logger = require('../config/log')

class NoteService {
    async create(noteData) {

        let noteResult = await noteModel.create(noteData);
        //update logger file
        logger.info("New note", noteResult)
        if (noteResult) {


            let deleteArray = [noteResult.userId + "isTrashNotes", noteResult.userId + "isArchieveNotes", noteResult.userId + "allNotes", noteResult.userId + "reminderNotes"]
            let redisResult = await redisService.delete(deleteArray)
            if (redisResult == true) {
                return true
            } else {
                return false
            }
        } else {
            //update logger file
            logger.error("Error while creating new note")
            return false;
        }

    }
    /*************************************************************************************************/
    update(updateData) {
        /**
         * @description: The Object.keys() method returns an array of a given object's own enumerable property names,
         * in the same order as we get with a normal loop
         */
        let keyObject = Object.keys(updateData);
        let updateQuery = {};
        return new Promise((resolve, reject) => {
            let findValue = {};
            let updateValue = {};


            for (let i = 0; i < keyObject.length; i++) {
                /**
                 * @description here find value contain array of object which are noteId ande userId
                 */
                if (keyObject[i] == "_id" || keyObject[i] == "userId") {
                    findValue[keyObject[i]] = updateData[keyObject[i]];
                    continue;
                }
                /**
                 * @description remaining object will go into the updateValue array
                 */
                updateValue[keyObject[i]] = updateData[keyObject[i]];

                updateQuery = {
                    $set: updateValue
                };
            }

            //To update perticular field of note
            noteModel.update(findValue, updateQuery)
                .then(updateResponse => {
                    if (updateResponse.nModified == 1) {

                        //update logger file
                        logger.info("Updated note", findValue)


                        let deleteArray = [updateData.userId + "isTrashNotes", updateData.userId + "isArchieveNotes", updateData.userId + "allNotes", updateData.userId + "reminderNotes"]
                        redisService.delete(deleteArray)
                            .then(response => {
                                //         //update logger file
                                logger.info("Updated note in redis", findValue)
                                resolve({ "success": true, "message": "Note updated successfully" });
                            })
                            .catch(err => {
                                //update logger file
                                logger.error("Error while Updating note in redis", findValue)
                                reject(err)
                            })


                    } else {
                        //update logger file
                        logger.error("Error while Updating note in database", findValue)
                        reject({ "success": false, "message": "Note not updated" });
                    }
                })
                .catch(err => {

                    logger.error("Updated note Error", findValue)

                    reject(err);
                });

        });
    }
    /*************************************************************************************************/
    /****
     * @description delete note means we are not actually delete the note.We only update the that token i.e
     *              "isTrash":true 
     */
    delete(deleteData) {


        return new Promise((resolve, reject) => {
            //We are finding the notes based on th noteId and userId
            let deleteValue = {
                "userId": deleteData.userId,
                "_id": deleteData._id
            }
            //we only update the isTrash value to true
            // let updateValue = {
            //     $set: { isTrash: true }
            // }
            //It will not actually delete note,it change the the value of isTrash false to true.
            noteModel.delete(deleteValue)
                .then(deletedData => {

                    //update logger file
                    logger.info("deleted note", deleteValue)

                    let deleteArray = [deleteData.userId + "isTrashNotes", deleteData.userId + "isArchieveNotes", deleteData.userId + "allNotes", deleteData.userId + "reminderNotes"]
                    redisService.delete(deleteArray)
                        .then(response => {
                            logger.info("deleted note in redis", deleteValue)
                            resolve(response);
                        })
                        .catch(err => {
                            logger.error("Error in deleting note in redis", deleteValue)
                            reject(err);
                        })


                    // resolve(deletedData); 
                })
                .catch(err => {
                    //update logger file
                    logger.error("Error in deleting note in database", deleteValue)

                    reject(err);
                });
        });

    }

    /*************************************************************************************************/

    add(addLabelData) {

        return new Promise((resolve, reject) => {
            //First we will find the perticular note with perticular userId
            let findValue = {
                "_id": addLabelData._id,
                "userId": addLabelData.userId
            };
            //here we adding the label_id to the labelId[]array in noteCollectipon
            //$push  is used for adding data to array
            let updatevalue = {
                $push: {
                    "labelId": addLabelData.labelId
                }
            };

            noteModel.update(findValue, updatevalue)
                .then(updateData => {
                    //we get updateData object,if data updated successfully then it will return the "nModified:1"
                    if (updateData.nModified == 1) {

                        //update logger file
                        logger.info("label addded to note", findValue)

                        //creating a loginKey,because we don't want to remove the loginKey from redis.
                        let loginKey = addLabelData.userId + "loginToken"

                        //this will remove the all key from redis and again set key to redis using loginKey
                        redisService.redisManager(loginKey)
                            .then(response => {

                                //update logger file
                                logger.info("label addded to note using redis", findValue)

                                resolve(true)
                            })
                            .catch(err => {

                                //update logger file
                                logger.error("Error while label addded to note using redis", findValue)

                                reject(err);
                            })
                    } else {
                        //update logger file
                        logger.error("Label not added to notes", findValue)
                        resolve(false)

                    }
                })
                .catch(err => {

                    //update logger file
                    logger.error("Error occured while adding label to note", findValue)

                    reject(err);
                });
        });
    }
    /*************************************************************************************************/
    deleteLabel(deleteLabelData) {

        return new Promise((resolve, reject) => {
            //First we will find the perticular note with perticular userId
            let findValue = {
                "_id": deleteLabelData._id,
                "userId": deleteLabelData.userId
            };
            //here we removing the label_id from the labelId[] array in noteCollectipon
            //$pull  is used for removing data from array
            let updateValue = {
                $pull: { "labelId": deleteLabelData.labelId }
            };

            noteModel.update(findValue, updateValue)
                .then(updatedResponse => {
                    //we get updateData object,if data updated successfully then it will return the "nModified:1"
                    if (updatedResponse.nModified == 1) {

                        //update logger file
                        logger.info("label deleted from note", findValue)



                        let deleteArray = [deleteLabelData.userId + "isTrashNotes", deleteLabelData.userId + "isArchieveNotes", deleteLabelData.userId + "allNotes", deleteLabelData.userId + "reminderNotes"]
                        redisService.delete(deleteArray)
                            .then(response => {
                                //         //update logger file
                                logger.info("Updated note in redis", findValue, updateValue)
                                // resolve({ "success": true, "message": "Note updated successfully" });
                                resolve(true)
                            })
                            .catch(err => {
                                //update logger file
                                logger.error("Error while Updating note in redis", findValue)
                                reject(err)
                            })

                    } else {
                        resolve(false);
                    }
                })
                //When error occured in database
                .catch(err => {
                    //update logger file
                    logger.error("Error while label deleted from note in database", findValue)

                    reject(err);
                });
        });
    }
    /*************************************************************************************************/
    //It will search notes 
    search(searchNoteData) {

        let value = searchNoteData.search;

        return new Promise((resolve, reject) => {

            let searchBy = {
                $and: [{
                    $or: [
                        { "noteTitle": { $regex: value, $options: "i" } },
                        { "noteDescription": { $regex: value, $options: "i" } },
                        { "reminder": { $regex: value, $options: "i" } },
                        { "color": { $regex: value, $options: "i" } },
                    ]
                },
                { "userId": searchNoteData.userId }]
            };

            //This find query for label.
            let findQuery = {
                "userId": searchNoteData.userId
            };

            //This method is for searching the notes based on title,desription,reminder,color.
            noteModel.read(searchBy)
                .then(noteResult => {

                    noteModel.readLabel(findQuery, value)
                        /****
                         * @description here also we get the all note that match label with search data or not matched
                         * ,so we have to filter that unmatched note with label
    
                         */
                        .then(labelResult => {

                            if (labelResult.length > 0) {
                                //here filtring done
                                let filterLabelResult = labelResult.filter((elem) => {

                                    return elem.labelId.length > 0;
                                });
                                //here merging the note result and label result
                                let mergeResult = noteResult.concat(filterLabelResult);
                                /***
                                 * @description mergingResult contain both notes i.e one which search based 
                                 *              on title,description,reminder,color 
                                 *              and other one is based on label matching
                                 */
                                if (mergeResult.length > 0) {
                                    for (let i = 0; i < mergeResult.length - 1; i++) {
                                        for (let j = i + 1; j < mergeResult.length; j++) {
                                            if (mergeResult[i]._id.equals(mergeResult[j]._id)) {
                                                mergeResult.splice(j, 1);
                                            }
                                        }
                                    }
                                    resolve(mergeResult);
                                } else {
                                    reject("No match found");
                                }
                            }
                        })
                        .catch(err => {
                            reject(err);
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


    reminder(userId) {
        return new Promise((resolve, reject) => {
            let currentDate = new Date();
            //searchBy only searches the notes those who has reminder
            let searchBy = {
                reminder: { $nin: [null, ""] }
            }

            noteModel.read(searchBy)
                .then(reminderData => {

                    if (reminderData.length > 0) {
                        let i = 0
                        while (i < reminderData.length) {
                            //It will note compare the system date with reminder date so thats why we parse() both dates
                            if (Date.parse(currentDate) == Date.parse(reminderData[i].reminder)) {
                                resolve(reminderData[i])
                            }
                            i++
                        }
                    }
                    //There is no reminder for any of notes
                    else {
                        reject("Reminder is not set")
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    /*************************************************************************************************/
    //It will give all the notes
    read(loginData) {

        let findValue = {}
        let redisData;
        let redisKey, i;
        let populateObject
        let keyObject = Object.keys(loginData)
        //this find data is for
        let findData;

        return new Promise((resolve, reject) => {

            for (i = 0; i < keyObject.length; i++) {
                //If we want the notes those  has reminder set
                if (keyObject[i] == "reminder") {
                    findValue = {
                        userId: loginData.userId,
                        reminder: { $nin: [null, ""] }
                    }
                } else if (keyObject[i] == "labelId") {
                    console.log("loging data===>", loginData);
                    // setting "findData =true" because there are two methods  to search in model
                    findData = true

                    findValue = {
                        "userId": loginData.userId
                    }

                    populateObject = {
                        path: "labelId",
                        match: { _id: loginData.labelId }
                    }
                    // redisKey = noteRequestData.labelId + "labelId"
                    /** getting all notes that have same labelId on notes */
                    // responseArray = await noteModel.findLabelMatch(findQuery, populateObject);

                }
                else {
                    //Otherwise find those note based on user wants to search like isArchieve,isTrash notes
                    findValue[keyObject[i]] = loginData[keyObject[i]]
                }
            }


            for (let i = 0; i < keyObject.length; i++) {

                //Creating key for isTrash notes
                if (keyObject[i] == "isTrash" && loginData[keyObject[i]] == "true") {

                    redisKey = loginData.userId + "isTrashNotes"


                } //Creating key for isArchieve note
                else if ((keyObject[i] == "isArchieve" && loginData[keyObject[i]] == "true") || (keyObject[i] == "isTrash" && loginData[keyObject[i]] == "false")) {
                    redisKey = loginData.userId + "isArchieveNotes";
                }
                //Creating key for all notes except isArchieve and istrash is true
                else if ((keyObject[i] == "isArchieve" && loginData[keyObject[i]] == "false") || (keyObject[i] == "isTrash" && loginData[keyObject[i]] == "false")) {
                    redisKey = loginData.userId + "allNotes";
                }
                //Creating key for notes which has reminder set
                else if (keyObject[i] == "reminder") {
                    redisKey = loginData.userId + "reminderNotes"
                }
                else if (keyObject[i] == "labelId") {

                    redisKey = loginData.labelId + "labelId"
                    console.log("REDIS KEY===>", redisKey);

                }

            }
            //First it will chech data in redis
            redisService.redisGetter(redisKey, (err, reply) => {
                redisData = JSON.parse(reply);
                console.log("\n\n\n\n\n\nREDIS REPLY===>", redisData);

                //If it will get the notes from redis then resolve from redis.
                if (redisData) {
                    console.log("\n\n\n\nREDIS RETURN DATATA====>", redisData);

                    resolve(redisData)

                }
                else {
                    //"findData" is set request for the note which have same label
                    if (findData == true) {
                        console.log("I M INSIDE NEW LABEL METH");
                        //If redisGetter()method not get notes from redis then fetch notes from database
                        noteModel.findLabelMatch(findValue, populateObject)
                            .then(noteData => {
                                if (noteData.length >= 0 ) {
                                    console.log("I M INSIDE NEW LAB DATA====>", noteData);

                                    // log("\n\n\tnotedata--->",noteData)
                                    //Then store the notes in redis whatever we get from database
                                    redisService.redisSetter(redisKey, JSON.stringify(noteData))

                                    //Then resolve notes from redis
                                    redisService.redisGetter(redisKey, (err, reply) => {
                                        redisData = JSON.parse(reply);

                                        resolve(redisData)

                                    })
                                }
                                //if there is no notes in database
                                else {
                                    resolve("NO NOTES IN DATABASE")
                                }
                            })
                            .catch(err => {
                                reject(err);
                            });
                    }
                    else {
                        console.log("I M INSIDE OLD LABEL METH");
                        //This is for reading notes from database like "isArchieve,isTrash,allNote,reminder note"
                        noteModel.read(findValue)
                            .then(noteData => {
                                if (noteData.length >= 0) {
                                    console.log("OLD I M INSIDE old LAB DATA====>", noteData);

                                    // log("\n\n\tnotedata--->",noteData)
                                    //Then store the notes in redis whatever we get from database
                                    redisService.redisSetter(redisKey, JSON.stringify(noteData))

                                    //Then resolve notes from redis
                                    redisService.redisGetter(redisKey, (err, reply) => {
                                        redisData = JSON.parse(reply);

                                        resolve(redisData)

                                    })
                                }
                                //if there is no notes in database
                                else {
                                    resolve("NO NOTES IN DATABASE")
                                }
                            })
                            .catch(err => {
                                reject(err);
                            });
                    }

                }
            })
        });
    }
}
let noteServiceObject = new NoteService();
module.exports = noteServiceObject;

/*************************************************************************************************/







// 
// // 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 






























// delete label from note
                        //creating a loginKey,because we don't want to remove the loginKey from redis.
                        // let loginKey = deleteLabelData.userId + "loginToken";

                        //this will remove the all key from redis and again set key to redis using loginKey
                        // redisService.redisManager(loginKey)
                        //     .then(response => {

                                //update logger file
                                // logger.info("label deleted from note using redis", findValue)

                            //     resolve(true)
                            // })
                            // .catch(err => {

                                //update logger file
                            //     logger.error("Error while label deleted from note using redis", findValue)

                            //     reject(err);
                            // })

