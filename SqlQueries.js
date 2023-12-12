const tableQuery=`
CREATE TABLE IF NOT EXISTS studentData(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
)`

const insertQuery=(studentName)=>{ return `INSERT INTO studentData (Name) VALUES ("${studentName}")`}

const viewQuery="SELECT * FROM studentData" 

const viewSpecificQuery=(id)=> { return `SELECT * FROM studentData where id=${id}`} 

const lastIdQuery="SELECT LAST_INSERT_ID();"

module.exports ={insertQuery,viewQuery,viewSpecificQuery,tableQuery,lastIdQuery}