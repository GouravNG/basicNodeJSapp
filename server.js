const http=require('http')
const fs=require('fs')
const path=require('path')

let count=1;
const studentData={}

function addStudentToDataBase(newStudent){
    studentData[count]=newStudent;
    count++
    console.log(studentData)
    return studentData
}

const myServer=http.createServer((req,res)=>{
    if(req.url==="/")
        fileToRead="./Index.html"
    else if(req.url==="/addStudent" && req.method==="POST")
    {
        let postData=""
        req.on("data",(chunk)=>{
        postData+=chunk;
        })
        req.on("end",()=>{
            console.log(postData)
            const postDatainObject=JSON.parse(postData)
            let responceObject=addStudentToDataBase(postDatainObject)
            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(JSON.stringify({id:(count-1),sName:responceObject[(count-1)]["studentToaddd"]}))
        })
    }
    else
        fileToRead=path.join(__dirname+req.url)

    
    fs.readFile(fileToRead,(err,data)=>{
        if(path.extname(fileToRead)===".html")
            headContent='text/html'
        else
            headContent='application/javascript'
        res.writeHead(200,{"Content-Type":headContent})
        res.end(data)
    })



})
const PORT=8080
myServer.listen(PORT,()=>{
    console.log(`Started the server in localhost:${PORT}`)
})