import {addButton,viewSpecific,viewAll, viewSpecificSpace,viewAllSpace,enterStudentArea} from "./reuse.js"

async function addStudent(studentName){
    try{
        const addStudentRequest=await fetch("/addStudent",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({studentName:studentName}) //post request body
        })
        const addStudentRensponceMsg=await addStudentRequest.json() //to get the required part
        onSuccessfulAddOfStudent(addStudentRensponceMsg)  //call for DOM modification
        }
    catch(err){
        console.log(err)
    }
}

async function viewSpecificStudentDetails(id){
    const data=await fetch(`/getStudent?id=${id}`)
    const newData=await data.json()
    viewSpecificHtmlAppender(newData.msg.studentName)
}

async function viewAllStudentDetails(){
    let data=await fetch("/getStudent")
    let newData=await data.json()
    console.log(newData)
    // viewAllHtmlAppender(newData)
}

function viewSpecificHtmlAppender(name){
    if(document.getElementById("testname")===null){
        const elementTagg=document.createElement("p")
        elementTagg.setAttribute("id","testname")
        elementTagg.textContent=`Name:${name}`
        viewSpecificSpace.append(elementTagg)
    }
    else{
        const elementTagg=document.getElementById("testname")
        elementTagg.textContent=`Name:${name}`
    }
}

function viewAllHtmlAppender(studentData){
    let noOfStudent=Object.keys(studentData).length
    if(document.getElementById("testname2")===null){
        const viewallElementdiv=document.createElement("div")
        viewallElementdiv.setAttribute("id","testname2")
        for(let i=1;i<=noOfStudent;i++){
            const viewallElementPtag=document.createElement("p")
            let Sname=studentData[i]["studentName"]
            viewallElementPtag.textContent=`name:${Sname}`
            viewallElementdiv.append(viewallElementPtag)
        }
        viewAllSpace.append(viewallElementdiv)
    }
    else{
        const viewallElementdiv=document.getElementById("testname2")
        viewallElementdiv.innerHTML=""
        for(let i=1;i<=noOfStudent;i++){
            const viewallElementPtag=document.createElement("p")
            let Sname=studentData[i]["studentName"]
            viewallElementPtag.textContent=`name:${Sname}`
            viewallElementdiv.append(viewallElementPtag)
        }
        viewAllSpace.append(viewallElementdiv)
    }
}

function onSuccessfulAddOfStudent(ASD){ 
    if(document.getElementById("testname3")===null)
    {
        const successTag=document.createElement("p")
        successTag.setAttribute("id","testname3")
        let id=ASD.id
        let Sname=ASD.studentName
        successTag.textContent=`The student ${Sname} with id ${id} added successfully `
        enterStudentArea.append(successTag)
    }
    else{
        const successTag=document.getElementById("testname3")
        let id=ASD.id
        let Sname=ASD.studentName
        successTag.textContent=`The student ${Sname} with id ${id} added successfully `
        enterStudentArea.append(successTag)
    }
}
addButton.addEventListener("click",(e)=>{
    const sName=document.getElementById("studentName").value
    addStudent(sName)
})

viewSpecific.addEventListener("click",(e)=>{
    const sID=document.getElementById("studentId").value
    viewSpecificStudentDetails(sID)
})

viewAll.addEventListener("click",(e)=>{
    viewAllStudentDetails()
})
