const express = require('express')
const app = express()
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ams'
});



app.get('/signup/:email/:name',
  (req, res) => {
    console.log(req.params);

    var email = req.params.email;
    var name = req.params.name;


    connection.connect();

    connection.query("INSERT INTO `user` (`id`, `mobile`, `email`, `password`, `name`, `type`) VALUES (NULL, '', '" + email + "', '', '" + name + "', '')", function (err, rows, fields) {
      if (err) throw err
    })

    connection.end()

    res.send(req.params);
  }
)


app.get('/ambulance/positions',
(req, res) => {
  console.log("positions");
  connection.connect();

  connection.query("SELECT * FROM ambulance", function (err, rows, fields) {
    if (!err){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(rows));
    }else {
      throw err;
    }
  })

  connection.end()
}
)

app.listen(3000, () => console.log('Example app listening on port 3000!'))