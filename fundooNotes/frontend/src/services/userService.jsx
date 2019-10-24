import axios from "axios";
let url = "http://localhost:4000"

export function registrationService(registrationData) {
    console.log("FRONT END SERVICE DATA===>>", registrationData);
    return axios.post(url + '/registration', registrationData)
}

export function loginService(loginData) {
    console.log("FRONT END LOGIN DATA==>", loginData);
    return axios.post(url + '/login', loginData)
}

export function forgotPasswordService(forgotPasswordData){
    console.log("FrontEnd  FORGOT DATA==>",forgotPasswordData);
    return axios.post(url+'/forgotPassword',forgotPasswordData)
}

export function resetPasswordService(resetPasswordData){    
    console.log("Front end reset data===>",resetPasswordData);
    return axios.post(url+'/resetPassword',resetPasswordData)
}