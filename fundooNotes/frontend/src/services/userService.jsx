import axios from "axios";
let url = "http://localhost:4000"

export function registrationUser(registrationData) {
    console.log("FRONT END SERVICE DATA===>>", registrationData);
    return axios.post(url + '/registration', registrationData)
}

export function loginUser(loginData) {
    console.log("FRONT END LOGIN DATA==>", loginData);
    return axios.post(url + '/login', loginData)
}

export function forgotPassword(forgotPasswordData){
    console.log("FrontEnd  FORGOT DATA==>",forgotPasswordData);
    return axios.post(url+'/forgotPassword',forgotPasswordData)
}

export function resetPassword(resetPasswordData,tokenData){    
    console.log("Front end reset data===>",resetPasswordData);
    return axios.post(url+'/resetPassword',resetPasswordData,{
        headers:{token:tokenData}
    })
}

export function verifyRegistration(tokenData){    
    console.log("Front end registration verify data===>",tokenData);
    return axios.post(url+'/verifyRegistration',{},{
        headers:{token:tokenData}
    })
}

export function getAllNote(param,loginToken){    
    console.log("get note in service===>",param,loginToken);
    return axios.get(url+'/getAllNote?'+param,{
        headers:{token:loginToken}
    })
}

export function getAllLabel(loginToken){    
    console.log("get note in service===>",loginToken);
    return axios.get(url+'/getAllLabel',{
        headers:{token:loginToken}
    })
}

export function createNote(paramObject,loginToken){    
    console.log("create note in service===>",paramObject,loginToken);
    return axios.post(url+'/createNote',paramObject,{
        headers:{token:loginToken}
    })
}


//
export function deleteNote(paramObject,loginToken){    
    console.log("delete note in service===>",paramObject,loginToken);
    return axios.post(url+'/updateNote',paramObject,{
        headers:{token:loginToken}
    })
}

export function archieveNote(paramObject,loginToken){    
    // console.log("archiev note in service===>",paramObject,loginToken);
    return axios.post(url+'/updateNote',paramObject,{
        headers:{token:loginToken}
    })
}

export function updateNote(paramObject,loginToken){    
    console.log("Updated  note in service===>",paramObject,loginToken);
    return axios.post(url+'/updateNote',paramObject,{
        headers:{token:loginToken}
    })
}

export function addLabel(paramObject,loginToken){    
    console.log("add label to note in service===>",paramObject);
    console.log("add label to note in service===>",loginToken);

    return axios.post(url+'/addLabel',paramObject,{
        headers:{token:loginToken}
    })
}

export function deleteNoteForever(paramObject,loginToken){    
    console.log("Delete notte permenantly===>",paramObject,loginToken);
    return axios.post(url+'/deleteNote',paramObject,{
        headers:{token:loginToken}
    })
}


export function deleteLabelFromNote(paramObject,loginToken){    
    console.log("Delete notte permenantly===>",paramObject,loginToken);
    return axios.post(url+'/deleteLabelFromNote',paramObject,{
        headers:{token:loginToken}
    })
}