import {addButton,viewSpecific,viewAll, viewSpecificSpace,viewAllSpace,enterStudentArea} from "./reuse.js"
import studentData from "./studentData.js";

var count=1;

function addStudent(studentName){
    studentData[count]={studentName:studentName}
    console.log(`Student:${studentName} added successfully with id:${count}`)
    count++
    onSuccessfulAddOfStudent()  
}

function viewSpecificStudentDetails(id){
    return studentData[id]
}

function viewAllStudentDetails(){
    return studentData
}

function viewSpecificHtmlAppender(name){
    if(document.getElementById("testname")===null){
        const elementTagg=document.createElement("p")
        elementTagg.setAttribute("id","testname")
        let Sname=name["studentName"]
        elementTagg.textContent=`Name:${Sname}`
        viewSpecificSpace.append(elementTagg)
    }
    else{
        const elementTagg=document.getElementById("testname")
        let Sname=name["studentName"]
        elementTagg.textContent=`Name:${Sname}`
    }
}

function viewAllHtmlAppender(){
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

function onSuccessfulAddOfStudent(){ 
    if(document.getElementById("testname3")===null)
    {
        const successTag=document.createElement("p")
        successTag.setAttribute("id","testname3")
        let id=count-1
        let Sname=studentData[id]["studentName"]
        successTag.textContent=`The student ${Sname} with id ${id} added successfully `
        enterStudentArea.append(successTag)
    }
    else{
        const successTag=document.getElementById("testname3")
        let id=count-1
        let Sname=studentData[id]["studentName"]
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
    console.log(sID)
    console.log(viewSpecificStudentDetails(sID))
    viewSpecificHtmlAppender(viewSpecificStudentDetails(sID))
})

viewAll.addEventListener("click",(e)=>{
    console.log(viewAllStudentDetails())
    viewAllHtmlAppender();
})
