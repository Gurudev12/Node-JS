let input=require('readline-sync')
let fs=require('fs')

class ClinicManagement
{ 

    //Add new person in the system
    addDoctor(doctorData)
    {
        console.log("Enter Doctor name")
        let doctorName=input.question()

        console.log("Enter Doctor Id")
        let doctorID=input.questionInt()

        console.log("Enter Specialization")
        let doctorSpecialization=input.question()

        console.log("Enter Doctaor availability")
        let available=input.question()

        //creating object and add it to the addressData 
        doctorData.push (
            {
            
                "DoctorName": doctorName,
                "DoctorID": doctorID,
                "Specialization": doctorSpecialization,
                "Availability": available,
                "PatientSize":0
            })
            fs.writeFileSync('doctor.json',JSON.stringify(doctorData))
        //    this.saveFileToDoctor()
    }
    //Adding patient if he/she is new to clinic
    addPatient(patientData)
    {
        console.log("Enter Patient Id")
        let patientId=input.questionInt()

        console.log("Enter patient name")
        let patientFirstName=input.question()

        console.log("Enter Patient Mobile no")
        let patientMobileNo=input.questionInt()

        console.log("Enter Age")
        let age=input.questionInt()

        

        patientData.push(
            {"PatientID":patientId,
            "FirstName":patientFirstName,
            "PhoneNo":patientMobileNo,
            "Age":age
            })
            fs.writeFileSync('patient.json',JSON.stringify(patientData))
            // this.saveFileToPatient()
            return patientFirstName
    }
    //take appointment
    takeAppointment(patientData,doctorData,appointmentData)
    {  
        console.log("-----------------------------")
            
                    console.log("Searching patient details")
                    let patientFound=this.searchPatient(patientData)
                    if(patientFound!=-1)
                    {
                        console.log("-----------------------")
                        console.log("Patient is present")

                     this.newAppointment(doctorData,patientFound,appointmentData)

                     
                        
                        
                    }
                    else
                    {
                        console.log("Patient not present")
                        console.log("------------------")
                        console.log("Please entry in register")
                        let patientName=this.addPatient(patientData)
                    console.log("New patient added sucessfuly")
                    this.newAppointment(doctorData,patientName,appointmentData)



                    }
      
    }

    newAppointment(doctorData,patientName,appointmentData)
    {
        let flag=0
        console.log("Displaying doctors")
        this.displayDoctor(doctorData)
    
        console.log("Which doctor do want")
        let doctorName=input.question()
        for(let i=0;i<doctorData.length;i++)
        {
            if(doctorData[i].DoctorName.toUpperCase()===doctorName.toUpperCase())
            {
                console.log("What time you want to meet doctor")
                console.log("Note:Enter time AM or PM or BOTH")
                let time=input.question().toUpperCase()
                if(doctorData[i].Availability===time)
                {
                    if(doctorData[i].PatientSize<5)
                    {
                    
                        appointmentData.push(
                            {
                                "patientName":patientName,
                                "doctorName":doctorData[i].DoctorName,
                                "time":time

                            })
                            fs.writeFileSync('appointment.json',JSON.stringify(appointmentData))

                        
                        doctorData[i].PatientSize=doctorData[i].PatientSize+1
                        fs.writeFileSync('doctor.json',JSON.stringify(doctorData))
                        console.log("Apppointment suceesful")
                    }
                    else
                    {
                        console.log("Appointment noyt")
                    }
                    
                }
                else
                {
                    console.log("Doctor not available at "+time)
                }
                flag=1
                break;
            }
        }
        if(flag==0)
        {
            console.log("No such doctor")
        }

    }

    //to search given patient in the register
    searchPatient(patientData)
    {
        let choice,i
            console.log("1.Search by ID"+"\n2.Search by name"+"\n3.Search by Phone number")
            console.log("Enter your choice")
            choice=input.questionInt()
            
            switch(choice)
            {
                case 1:
                    console.log("Enter patient ID")
                    let patientId=input.questionInt()
                    console.log("Searching patient by ID")

                    for(i=0;i<patientData.length;i++)
                    {
                        if(patientData[i].PatientID==patientId)
                        {
                           console.log("Patient Id:"+patientData[i].PatientID)
                           console.log("Name:"+patientData[i].FirstName)
                           console.log("Phone No:"+patientData[i].PhoneNo)
                           console.log("Patient Age:"+patientData[i].Age)

                           return patientData[i].FirstName
                        }
                    }
                    break;
                
                case 2:
                    console.log("Enter patient name")
                    let patientName=input.question()
                    console.log("Searching patient by name")

                    for(i=0;i<patientData.length;i++)
                    {
                        if(patientData[i].FirstName==patientName)
                        {
                           console.log("Patient Id:"+patientData[i].PatientID)
                           console.log("Name:"+patientData[i].FirstName)
                           console.log("Phone No:"+patientData[i].PhoneNo)
                           console.log("Patient Age:"+patientData[i].Age)

                           return patientData[i].FirstName
                        }
                    }
                    break;
                case 3:
                  
                    console.log("Enter patient phone number")
                    let patientPhoneNumber=input.questionInt()
                    console.log("Searching patient by phone number")

                    for(i=0;i<patientData.length;i++)
                    {
                        if(patientData[i].PhoneNo==patientPhoneNumber)
                        {
                           console.log("Patient Id:"+patientData[i].PatientID)
                           console.log("Name:"+patientData[i].FirstName)
                           console.log("Phone No:"+patientData[i].PhoneNo)
                           console.log("Patient Age:"+patientData[i].Age)

                           return patientData[i].FirstName
                        }
                    }
                    break;

                default:
                    console.log("You have entered wrong choice..")  
            }
            return -1
    }

    displayDoctor(doctorData)
    {
      
        for(let i=0;i<doctorData.length;i++)
        {
            console.log(doctorData[i])
        }
    }
    
    displayPatient(patientData)
    {
        for(let i=0;i<patientData.length;i++)
        {
            console.log(patientData[i])
        }
    }

    searchDoctor(doctorData)
    {
        let choice,i
        console.log("1.Search by ID"+"\n2.Search by name"+"\n3.Speciality"+"\n4.Availability")
        console.log("Enter your choice")
        choice=input.questionInt()
        
        switch(choice)
        {
            case 1:
                console.log("Enter doctor ID")
                let doctorId=input.questionInt()
                console.log("Searching doctor by ID")
                

                for(i=0;i<doctorData.length;i++)
                {
                    if(doctorData[i].DoctorID==doctorId)
                    {
                       console.log("Doctor Id:"+doctorData[i].DoctorID)
                       console.log("Doctor Name:"+doctorData[i].DoctorName)
                       console.log("Specialization:"+doctorData[i].Specialization)
                       console.log("Availability:"+doctorData[i].Availability)

                    //    return patientData[i].FirstName
                    }
                }
                break;
            
            case 2:
                console.log("Enter doctor name")
                let doctorName=input.question()
                console.log("Searching patient by name")

                for(i=0;i<doctorData.length;i++)
                {
                    if(doctorData[i].DoctorName==doctorName)
                    {
                       console.log("Doctor Id:"+doctorData[i].DoctorID)
                       console.log("Doctor Name:"+doctorData[i].DoctorName)
                       console.log("Specialization:"+doctorData[i].Specialization)
                       console.log("Availability:"+doctorData[i].Availability)

                    //    return patientData[i].FirstName
                    }
                }
                break;
            case 3:
              
                console.log("Enter Specialization")
                let speciality=input.question()
                console.log("Searching doctor by Speciality")

                for(i=0;i<doctorData.length;i++)
                {
                    if(doctorData[i].Specialization==speciality)
                    {
                       console.log("Doctor Id:"+doctorData[i].DoctorID)
                       console.log("Doctor Name:"+doctorData[i].DoctorName)
                       console.log("Specialization:"+doctorData[i].Specialization)
                       console.log("Availability:"+doctorData[i].Availability)

                    //    return patientData[i].FirstName
                    }
                }
                break;
            
                case 4:
              
                        console.log("Enter availabilty")
                        let available=input.question()
                        console.log("Searching doctor by Speciality")
        
                        for(i=0;i<doctorData.length;i++)
                        {
                            if(doctorData[i].Availability==available)
                            {
                               console.log("Doctor Id:"+doctorData[i].DoctorID)
                               console.log("Doctor Name:"+doctorData[i].DoctorName)
                               console.log("Specialization:"+doctorData[i].Specialization)
                               console.log("Availability"+doctorData[i].Availability)
        
                            //    return patientData[i].FirstName
                            }
                        }
                        break;

            default:
                console.log("You have entered wrong choice..")  
        }
        
    }
    //Deleting doctor
    deleteDoctor(doctorData)
    {
       
        console.log("Enetr doctor name to deleta")
        let doctorName=input.question()

        for(let i=0;i<doctorData.length;i++)
        {
            if(doctorData[i].DoctorName==doctorName)
            {
                doctorData.splice(i,1);
                break;
            }
        }
        fs.writeFileSync('doctor.json',JSON.stringify(doctorData))
    }
    //Deleting patient
    deletePatient(patientData)
    {
        console.log("Enetr patient name to delete")
        let patientName=input.question()

        for(let i=0;i<patientData.length;i++)
        {
            if(patientData[i].FirstName==patientName)
            {
               patientData.splice(i,1);
                break;
            }
        }
        fs.writeFileSync('patient.json',JSON.stringify(patientData))

    }
    
}
module.exports={ClinicManagement}





