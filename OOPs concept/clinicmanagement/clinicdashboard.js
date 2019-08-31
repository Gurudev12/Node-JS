/******************************************************************************
 *  
 *  @Purpose: function Clinic Dashboard calling all the methods
 *
 *  @author  Gurudev Murkar
 *  @version 1.0
 *  @since   30-08-2019
 *
 ******************************************************************************/
let fs=require('fs')
let input=require('readline-sync')
//reading doctor.json file and storing it.
let doctorInfo=fs.readFileSync('/home/administrator/Desktop/Bridgelab/OOPs concept/clinicmanagement/doctor.json')
let doctorData=JSON.parse(doctorInfo)

//reading patient.json file and storing it.
let patientInfo=fs.readFileSync('/home/administrator/Desktop/Bridgelab/OOPs concept/clinicmanagement/patient.json')
let patientData=JSON.parse(patientInfo)

//reading appointment.json file and storing it.
let appointmentInfo=fs.readFileSync('/home/administrator/Desktop/Bridgelab/OOPs concept/clinicmanagement/appointment.json')
let appointmentData=JSON.parse(appointmentInfo)



//creating object of ClinicManagemnet Class..
let util=require('../clinicmanagement/clinicmethod')
let obClinicManagement=new util.ClinicManagement()

function ClinicDashboard()
{
    let choice=0,doctordetail,doctorName,doctorSpecialization,available
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
               doctordetail=obClinicManagement.addDoctor(doctorData)
               //split doctordetail array
               doctorName= doctordetail[0]
               doctorSpecialization= doctordetail[1]
               available= doctordetail[2]
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
    }while(choice>1)

    return[doctordetail,doctorName,doctorSpecialization,available]
}
module.exports=ClinicDashboard()

