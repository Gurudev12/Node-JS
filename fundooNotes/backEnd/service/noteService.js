const noteModel = require("../model/noteModel");
class NoteService {
    async createNoteService(noteData) {
        try {
            let noteResult = await noteModel.create(noteData);
            if (noteResult) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return e;
        }
    }
    /*************************************************************************************************/
    updateNoteService(updateData) {

        let keyObject = Object.keys(updateData);
        let updateQuery = {};
        return new Promise((resolve, reject) => {
            let findValue = {};
            let updateValue = {};
            for (let i = 0; i < keyObject.length; i++) {
                if (keyObject[i] == "_id" || keyObject[i] == "userId") {

                    findValue[keyObject[i]] = updateData[keyObject[i]];
                    continue;
                }
                updateValue[keyObject[i]] = updateData[keyObject[i]];

                //new change
                updateQuery = {
                    $set: updateValue
                };
            }
            noteModel.update(findValue, updateQuery)
                .then(updateResponse => {
                    if (updateResponse.nModified == 1) {
                        resolve({ "success": true, "message": "Note updated successfully" });
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
    deleteNoteService(deleteData) {
        try {
            return new Promise((resolve, reject) => {

                let searchBy = { "_id": deleteData._id };
                noteModel.delete(searchBy)
                    .then(deletedData => {
                        resolve(deletedData);
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
    getAllNoteService(loginData) {
        try {
            return new Promise((resolve, reject) => {
                let searchBy = { "userId": loginData.userId };
                noteModel.read(searchBy)
                    .then(readData => {
                        resolve(readData);
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
            let findValue = {
                "_id": addLabelData._id,
                "userId": addLabelData.userId
            };
            let updatevalue = {
                $push: {
                    "labelId": addLabelData.labelId
                }
            };

            noteModel.update(findValue, updatevalue)
                .then(updateData => {
                    if (updateData.nModified ==1) {
                        resolve({"status":true});
                    } else {
                        resolve({"status":false});

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

            let findValue = {
                "_id": deleteLabelData._id,
                "userId": deleteLabelData.userId
            };
            let updateValue = {
                $pull: { "labelId": deleteLabelData.labelId }
            };

            noteModel.update(findValue, updateValue)
                .then(updatedResponse => {
                    if (updatedResponse.nModified == 1) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
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
                .then(noteResult=> {

                    noteModel.readLabel(findQuery, value)
                        .then(labelResult => {
                            
                            if (labelResult.length > 0) {
                                let filterLabelResult = labelResult.filter((elem) => {
                                    
                                    return elem.labelId.length > 0;
                                });

                                let mergeResult = noteResult.concat(filterLabelResult);

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
}
let noteServiceObject = new NoteService();
module.exports = noteServiceObject;

