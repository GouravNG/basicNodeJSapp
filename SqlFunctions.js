const mysql=require('mysql2')

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
    return new Promise((resolve,reject)=>{
    con.query(insertQuery(studentName),(err,result)=>{ 
        if(err){
            console.log("Error in inserting the data",err)
            reject(err)
        }
        resolve("Student added to database successfully")
    })
})
}

 function viewSpecificFunction(con,viewSpecificQuery,id){ //viewSpecific
    return new Promise((resolve,reject)=>{
    con.query(viewSpecificQuery(id),(err,result,fields)=>{
        if(err){
            console.log("Error in viewing the data")
            reject(err)
        }
        resolve(result)
    })
})
}

function viewFunction(con, viewQuery) {
    return new Promise((resolve, reject) => {
        con.query(viewQuery, (err, result, fields) => {
            if (err) {
                console.error('Error in viewing the data:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


 function lastId(con,lastIdQuery){ //for last id
    return new Promise ((resolve,reject)=>{
    con.query(lastIdQuery,(err,result)=>{
        if(err){
            console.log("Error in fetching the last id:",err)
            reject(err)
        }
        resolve(result)
    })
})
}

//database connection
function dbConnection(callback, parameters) {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Gourav',
            database: 'test'
        });

        con.connect( (err) => {
            if (err) {
                console.log("Error in connecting to database", err);
                reject(err);
            } else {
                console.log("Connected to database");
                try {
                    const result = callback(con, ...parameters);
                    resolve(result);
                } catch (error) {
                    console.error(error);
                    reject(error);
                } finally {
                    con.end(); // Closing the connection
                }
            }
        });
    });
}

module.exports={dbConnection,viewFunction,viewSpecificFunction,table,insertFunction,lastId}

// dbConnection(table,[myQuery.tableQuery])
// dbConnection(insertFunction,[myQuery.insertQuery,"Dia"])
// dbConnection(viewFunction,[myQuery.viewQuery])
// dbConnection(viewSpecificFunction,[myQuery.viewSpecificQuery,18])
// dbConnection(lastId,[myQuery.lastIdQuery])
