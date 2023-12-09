import {addButton,viewSpecific,viewAll, viewSpecificSpace,viewAllSpace,enterStudentArea} from "./reuse.js"
// import studentData from "./studentData.js";

// var count=1;

async function addStudent(studentName){
    // studentData[count]={studentName:studentName}
    // console.log(`Student:${studentName} added successfully with id:${count}`)
    // count++
    try{
    const addStudentrequest=await fetch("/addStudent",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({studentToaddd:studentName})
    })
    const processStatusMsg=await addStudentrequest.json()
    console.log(processStatusMsg)
    onSuccessfulAddOfStudent(processStatusMsg)  
        }
    catch(erro){
        console.log(erro)
    }
}

async function viewSpecificStudentDetails(id){
    const data=await fetch(`/getStudent?id=${id}`)
    const newData=await data.json()
    console.log(newData.msg.studentToaddd)
    viewSpecificHtmlAppender(newData.msg.studentToaddd)
    // return studentData[id]
}

function viewAllStudentDetails(){
    return studentData
}

function viewSpecificHtmlAppender(name){
    if(document.getElementById("testname")===null){
        const elementTagg=document.createElement("p")
        elementTagg.setAttribute("id","testname")
        // let Sname=name["studentName"]
        elementTagg.textContent=`Name:${name}`
        viewSpecificSpace.append(elementTagg)
    }
    else{
        const elementTagg=document.getElementById("testname")
        // let Sname=name["studentName"]
        elementTagg.textContent=`Name:${name}`
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

function onSuccessfulAddOfStudent(ASD){ 
    if(document.getElementById("testname3")===null)
    {
        const successTag=document.createElement("p")
        successTag.setAttribute("id","testname3")
        let id=ASD.id
        let Sname=ASD.sName
        successTag.textContent=`The student ${Sname} with id ${id} added successfully `
        enterStudentArea.append(successTag)
    }
    else{
        const successTag=document.getElementById("testname3")
        let id=ASD.id
        let Sname=ASD.sName
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
    // console.log(sID)
    // console.log(viewSpecificStudentDetails(sID))
    // viewSpecificHtmlAppender(viewSpecificStudentDetails(sID))
    viewSpecificStudentDetails(sID)

})

viewAll.addEventListener("click",(e)=>{
    console.log(viewAllStudentDetails())
    viewAllHtmlAppender();
})
