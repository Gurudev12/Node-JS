const mongoose=require("mongoose")
let labelSchema=mongoose.Schema({
    userId:{
        type:String,
        required: [true, "user_id is empty"]

    },
    labelName:{
        type: String,
        required: [true, "label is empty"]
    },
},
{
timestamp:true
})

class LabelClass{
    constructor(){
        this.Label=mongoose.model("labelCollection",labelSchema)
    }

    create(paramObject){
        return new Promise((resolve,reject)=>{

            let newLabel=new this.Label({
                "userId":paramObject._id,
                "labelName":paramObject.labelName
            })
            newLabel.save()
            .then(savedData=>{
                resolve(savedData)
            })
            .catch(err=>{
                reject(err)
            })
        })

      

    }

    read(){

    }
    update(){

    }

    delete(){
        
    }

}
let labelClassObject=new LabelClass();
module.exports=labelClassObject;