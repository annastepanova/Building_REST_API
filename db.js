const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_info',
  multipleStatements: true
})

// Connect
connection.connect((err) => {
  if (err) {
    throw err
  }
  console.log('MySql Connected...')
})

module.exports = connection
