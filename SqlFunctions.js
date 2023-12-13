const mysql=require('mysql2')
const myQuery=require("./SqlQueries")

 function table(con,tableQuery){   //Creation of the table
    con.query(tableQuery,(err,result)=>{ //Table creation query
        if(err){
        console.log("Error in creation of table",err)
        return con.end()
        }
        console.log ("Table Created/Already Exist")
    })
}

 function insertFunction(con,insertQuery,studentName){ //Student insertion
    con.query(insertQuery(studentName),(err,result)=>{ 
        if(err){
            console.log("Error in inserting the data",err)
            return con.end()
        }
        console.log("Student added to database successfully")
    })
}

 function viewSpecificFunction(con,viewSpecificQuery,id){ //viewSpecific
    con.query(viewSpecificQuery(id),(err,result,fields)=>{
        if(err){
            console.log("Error in viewing the data")
            return con.end()
        }
        console.log("Students",result)
    })
}

 function viewFunction(con,viewQuery){ //viewAll
    con.query(viewQuery,(err,result,fields)=>{
        if(err){
            console.log("Error in viewing the data")
            return con.end()
        }
        console.log("Students",result)
    })
}

 function lastId(con,lastIdQuery){ //for last id
    con.query(lastIdQuery,(err,result)=>{
        if(err){
            console.log("Error in fetching the last id:",err)
            return con.end()
        }
        console.log(result)
    })
}

//database connection
 function dbConnection(callback,parameters){
    const con=mysql.createConnection({ //database connectivity setup
        host:'localhost',
        user:"root",
        password:"Gourav",
        database:'test'
    })
    con.connect((err)=>{    
        if(err){
        console.log("Error in connecting to database",err)
        return
        }
        console.log("Connected to database")
        callback(con,...parameters)
        con.end() //closing of the connection
    })

}


// dbConnection(table,[myQuery.tableQuery])
// dbConnection(insertFunction,[myQuery.insertQuery,"Dia"])
// dbConnection(viewFunction,[myQuery.viewQuery])
// dbConnection(viewSpecificFunction,[myQuery.viewSpecificQuery,18])
// dbConnection(lastId,[myQuery.lastIdQuery])



//...............................................

// table(myQuery.tableQuery)
// insertFunction(myQuery.insertQuery,"Dia")
// viewFunction(myQuery.viewQuery)
// viewSpecificFunction(myQuery.viewSpecificQuery,18)
// lastId(myQuery.lastIdQuery)