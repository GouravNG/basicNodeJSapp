const http=require('http')
const fs=require('fs')
const path=require('path')
const url=require('url')
const db=require("./SqlFunctions")
const myQuery=require("./SqlQueries")

let count=1;
const studentData={}

function addStudentToDataBase(newStudent){
    studentData[count]=newStudent;
    count++
    console.log(studentData)
    return studentData
}

const myServer=http.createServer(async (req,res)=>{
    let newURL=url.parse(req.url,true)

    if(newURL.pathname==="/")   //default call for HTML
        fileToRead="./Index.html"

    else if(req.url==="/addStudent" && req.method==="POST") //check for the post
    {
        let postData=""
        req.on("data",(chunk)=>{ //getting the data
        postData+=chunk;
        })
        req.on("end",()=>{  //on getting the end of data
            const objectPostData=JSON.parse(postData) //for converting the JSON to Objects
            let responceObject=addStudentToDataBase(objectPostData)
            res.writeHead(200,{"Content-Type":"application/json"}) //POST responce msg
            res.end(JSON.stringify({id:(count-1),studentName:responceObject[(count-1)]["studentName"]})) //converting to JSON
        })
    }
    else if(newURL.pathname=="/getStudent" && newURL.search!=null ){ //query parameters
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify({msg:studentData[newURL.query.id]}))
    }
    else if (newURL.pathname === "/getStudent" && newURL.search == null) { //non query GET request
        try {
            let result = await db.dbConnection(db.viewFunction, [myQuery.viewQuery]);
            console.log("here inside the server file", result);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        } catch (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
        }
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