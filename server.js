const http=require('http')
const fs=require('fs')
const path=require('path')
const url=require('url')
const db=require("./SqlFunctions")
const myQuery=require("./SqlQueries")

async function addStudentToDataBase(newStudent){
    let flag=1
    flag= await db.dbConnection(db.insertFunction,[myQuery.insertQuery,newStudent.studentName])
    if(flag){
        id=await db.dbConnection(db.lastId,[myQuery.lastIdQuery])
        let result = await db.dbConnection(db.viewSpecificFunction,[myQuery.viewSpecificQuery,id[0]['MAX(id)']]);
        return result;
    }
    else
        return "some thing went wrong"
}

const myServer=http.createServer(async (req,res)=>{
    let newURL=url.parse(req.url,true)

    if(newURL.pathname==="/")   //default call for HTML
        fileToRead="./Index.html"

    else if (req.url === "/addStudent" && req.method === "POST") {
        let postData = "";

        req.on("data", (chunk) => {
            // Getting the data
            postData += chunk;
        });      
        req.on("end", async () => {
            try {
                const objectPostData = JSON.parse(postData); // For converting the JSON to Objects
                let responseObject = await addStudentToDataBase(objectPostData);
                console.log("just above end",responseObject)
                res.writeHead(200, { "Content-Type": "application/json" }); // POST response msg
                res.write(JSON.stringify({ "MSG": "responseObject" }))
                res.end(); 
            } catch (error) {
                console.error("Error parsing JSON:", error);

                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ "MSG": "FAILURE", "error": "Invalid JSON data" }));
            }
        });
    }
        
    else if(newURL.pathname=="/getStudent" && newURL.search!=null ){ //query parameters
        let result = await db.dbConnection(db.viewSpecificFunction,[myQuery.viewSpecificQuery,(newURL.query.id)]);
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify({msg:result}))
    }

    else if (newURL.pathname === "/getStudent" && newURL.search == null) { //non query GET request
        try {
            let result = await db.dbConnection(db.viewFunction, [myQuery.viewQuery]);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result));
        } catch (err) {
            console.log("Something went wrong",err);
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