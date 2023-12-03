const http=require('http')
const fs=require('fs')
const path=require('path')

const myServer=http.createServer((req,res)=>{
    if(req.url==="/")
        fileToRead="./Index.html"
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