let fs=require('fs')
let input=require('readline-sync')
//reading doctor.json file and storing it.
let doctorInfo=fs.readFileSync('doctor.json')
let doctorData=JSON.parse(doctorInfo)

//reading patient.json file and storing it.
let patientInfo=fs.readFileSync('patient.json')
let patientData=JSON.parse(patientInfo)

//reading appointment.json file and storing it.
let appointmentInfo=fs.readFileSync('appointment.json')
let appointmentData=JSON.parse(appointmentInfo)



//creating object of ClinicManagemnet Class..
let util=require('../clinicmanagement/clinicmethod')
let obClinicManagement=new util.ClinicManagement()

function ClinicDashboard()
{
    let choice
    do
    {
        console.log("Clinic Management")
        console.log("1.Add Doctor"+"\n2.Take appointment"+"\n3.Search doctor"+"\n4.Search Patient"+"\n5.Delete Doctor"+"\n6.Delete Patient"+"\n7.Display Doctor"+"\n8.Display Patient"+"\n9.Save file")
        console.log("Enter your choice..")
        choice=input.questionInt()

        switch(choice)
        {
            case 1:
                console.log("--------------------")         //done
                console.log("Add Doctor")
               obClinicManagement.addDoctor(doctorData)
                break;
            case 2:
                console.log("--------------------------")   //done
                console.log("Take appointment")
               obClinicManagement.takeAppointment(patientData,doctorData,appointmentData)
                break;
            case 3:
                console.log("--------------------------")
               console.log("Search doctor")                 //done
               obClinicManagement.searchDoctor(doctorData)
               break;

            case 4:
                console.log("--------------------------")
                console.log("Search Patient")               //done
                obClinicManagement.searchPatient(patientData)
                break;

            case 5:
                console.log("--------------------------")   //done
                console.log(".Delete Doctor")
                obClinicManagement.deleteDoctor(doctorData)
                break;

            case 6:
                console.log("--------------------------")   //done
                console.log(".Delete Patient")
                obClinicManagement.deletePatient(patientData)
                break;

            case 7:
                console.log("--------------------------")
                console.log("Display Doctor")                   //done
                obClinicManagement.displayDoctor(doctorData)
                

            case 8:
                console.log("--------------------------")
                console.log("Display Patient")                  //done
                obClinicManagement.displayPatient(patientData)
              
            default:
                console.log("You have entered wrong choice")
                                                                                                                                                                                    


        }
    }while(choice==1)

}
module.exports=ClinicDashboard()

