const mongoose = require("mongoose");
let labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registeredCollection"
    },

    labelName: {
        type: String,
        required: [true, "label is empty"]
    }
},
    {
        timestamps: true
    });

class LabelClass {
    constructor() {
        this.Label = mongoose.model("labelCollection", labelSchema);
    }
    /*************************************************************************************************/
    create(paramObject) {
        return new Promise((resolve, reject) => {

            let newLabel = new this.Label({
                "userId": paramObject.userId,
                "labelName": paramObject.labelName
            });
            newLabel.save()
                .then(savedData => {
                    resolve(savedData);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    /*************************************************************************************************/
    read(searchBy) {
        return new Promise((resolve, reject) => {
            this.Label.find(searchBy)
                .then((data) => {
                    resolve(data);

                })
                .catch((err) => {
                    reject(err);
                });
        });

    }
    /*************************************************************************************************/

    update(findValue, updateValue) {
        return new Promise((resolve, reject) => {
            this.Label.updateOne(findValue, { $set: updateValue })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    /*************************************************************************************************/
    delete(deleteValue) {

        return new Promise((resolve, reject) => {
            this.Label.deleteOne(deleteValue)
                .then(deletedData => {
                    resolve(deletedData);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

}
let labelClassObject = new LabelClass();
module.exports = labelClassObject;