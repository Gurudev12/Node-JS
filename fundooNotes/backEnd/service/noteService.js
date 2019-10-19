const noteModel = require("../model/noteModel");
const dateFormat = require('dateformat');
const redis = require("redis");
const client = redis.createClient();
const redisService = require("../service/redisService")
const underscore = require("underscore")
const utility = require("../utility/utility");
class NoteService {
    async createNoteService(noteData) {
        try {
            let noteResult = await noteModel.create(noteData);

            if (noteResult) {
                let loginKey = noteResult.userId + "loginToken"
                await redisService.redisManager(loginKey)
                return true
            } else {
                return false;

            }
        } catch (e) {
            return e;
        }
    }
    /*************************************************************************************************/

    /***************************************************** */
    updateNoteService(updateData) {
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

                        let loginKey = updateData.userId + "loginToken"
                        redisService.redisManager(loginKey)
                            .then(response => {
                                resolve({ "success": true, "message": "Note updated successfully" });
                            })
                            .catch(err => {
                                reject(err)
                            })
                    } else {
                        reject({ "success": false, "message": "Note not updated" });
                    }
                })
                .catch(err => {
                    reject(err);
                });

        });
    }
    /*************************************************************************************************/
    /****
     * @description delete note means we are not actually delete the note.We only update the that token i.e
     *              "isTrash":true 
     */
    deleteNoteService(deleteData) {
        try {

            return new Promise((resolve, reject) => {
                //We are finding the notes based on th noteId and userId
                let findValue = {
                    "userId": deleteData.userId,
                    "_id": deleteData._id
                }
                //we only update the isTrash value to true
                let updateValue = {
                    $set: { isTrash: true }
                }
                //It will not actually delete note,it change the the value of isTrash false to true.
                noteModel.update(findValue, updateValue)
                    .then(deletedData => {
                        //creating a loginKey,because we don't want to remove the loginKey from redis.
                        let loginKey = deleteData.userId + "loginToken"

                        //this will remove the all key from redis and again set key to redis using loginKey
                        redisService.redisManager(loginKey)
                            .then(response => {
                                resolve(deletedData);
                            })
                            .catch(err => {
                                reject(err);
                            })

                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        } catch (e) {
            return e;
        }
    }

    /*************************************************************************************************/
    addLabelToNoteService(addLabelData) {

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

                        //creating a loginKey,because we don't want to remove the loginKey from redis.
                        let loginKey = addLabelData.userId + "loginToken"

                        //this will remove the all key from redis and again set key to redis using loginKey
                        redisService.redisManager(loginKey)
                            .then(response => {
                                resolve(true)
                            })
                            .catch(err => {
                                reject(err);
                            })
                    } else {
                        resolve(false)

                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    /*************************************************************************************************/
    deleteLabelFromNoteService(deleteLabelData) {

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

                        //creating a loginKey,because we don't want to remove the loginKey from redis.
                        let loginKey = deleteLabelData.userId + "loginToken"

                        //this will remove the all key from redis and again set key to redis using loginKey
                        redisService.redisManager(loginKey)
                            .then(response => {
                                resolve(true)
                            })
                            .catch(err => {
                                reject(err);
                            })
                    } else {
                        resolve(false);
                    }
                })
                //When error occured in database
                .catch(err => {
                    reject(err);
                });
        });
    }
    /*************************************************************************************************/
    searchNoteService(searchNoteData) {

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


    reminderService(userId) {
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
    getAllNoteService(loginData) {

        let findValue = {}
        let redisData;
        let redisKey;
        let keyObject = Object.keys(loginData)
        let pageNo = loginData.pageNo;
        return new Promise((resolve, reject) => {

            for (let i = 0; i < keyObject.length; i++) {
                //If we want the notes those  has reminder set
                if (keyObject[i] == "reminder") {
                    findValue = {
                        userId: loginData.userId,
                        reminder: { $nin: [null, ""] }
                    }
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

                    //Creating key for isArchieve note
                } else if (keyObject[i] == "isArchieve" && loginData[keyObject[i]] == "true") {
                    redisKey = loginData.userId + "isArchieveNotes"

                    //Creating key for all notes except isArchieve and istrash is true
                } else if (keyObject[i] == "isArchieve" && loginData[keyObject[i]] == "false" || keyObject[i] == "isTrash" && loginData[keyObject[i]] == "false") {
                    redisKey = loginData.userId + "allNotes"

                    //Creating key for notes which has reminder set
                } else if (keyObject[i] == "reminder") {
                    redisKey = loginData.userId + "reminderNotes"
                }
            }
            //First it will chech data in redis
            redisService.redisGetter(redisKey, (err, reply) => {
                redisData = JSON.parse(reply);

                //If it will get the notes from redis then resolve from redis.
                if (redisData) {
                    //I dont want to show all the the redis data,thats why I do pagination.
                    utility.notePagination(redisData, pageNo)
                        .then(response => {
                            //response will not send all redis data only send the selected page data.
                            resolve(response)
                        })
                        .catch(err => {
                            reject(err)
                        })
                }
                else {
                    //If redisGetter()method not get notes from redis then fetch notes from database
                    noteModel.read(findValue)
                        .then(noteData => {
                            if (noteData.length > 0) {
                                //Then store the notes in redis whatever we get from database
                                redisService.redisSetter(redisKey, JSON.stringify(noteData))

                                //Then resolve notes from redis
                                redisService.redisGetter(redisKey, (err, reply) => {
                                    redisData = JSON.parse(reply);

                                    utility.notePagination(redisData, pageNo)
                                        .then(response => {
                                            //response will not send all redis data only send the selected page data.
                                            resolve(response)
                                        })
                                        .catch(err => {
                                            reject(err)
                                        })
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
            })
        });
    }
}
let noteServiceObject = new NoteService();
module.exports = noteServiceObject;

/*************************************************************************************************/
     // let  pages = underscore.chunk(redisData, 2);
                                    // console.log("=====ALL PAGES==============>",pages)
                                    // console.log("******************************************");
                                    // console.log("======PAGE NUMBER==============>",pages[pageNo])