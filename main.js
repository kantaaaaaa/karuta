const http = require('http');
var fs = require('fs');
const express = require('express');
const router  = express.Router();
const app = express();
app.use('/', router);
app.use(express.static(__dirname));
const port = 8080;

app.listen(port, () => {
  console.log('server is up on port '+ port)
})


//const port = 8080;
//server.listen(port);

/*
const server = http.createServer((req, res) => {
    // ここに処理を記述
    fs.readFile('quiz_index.html','UTF-8',(error,data)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
    })
});
*/

router.get('', (req,res) => {
    fs.readFile('quiz_index.html','UTF-8',(error,data)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
  })
})

router.get('/question', (req,res) => {
    fs.readFile('quiz_question.html','UTF-8',(error,data)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
  })
})

router.get('/answerwrong', (req,res) => {
    fs.readFile('quiz_answer2.html','UTF-8',(error,data)=>{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        res.end();
  })
})

router.get('/answer', (req,res) => {
  fs.readFile('quiz_answer.html','UTF-8',(error,data)=>{
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(data);
      res.end();
})
})

router.get('/answersecond', (req,res) => {
  fs.readFile('quiz_answersecond.html','UTF-8',(error,data)=>{
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(data);
      res.end();
})
})

router.get('/q-table', (req,res) => {
  res.contentType('text/csv');
  res.sendFile(__dirname + '/qtable.csv');
})

router.get('/c-table', (req,res) => { 
  res.contentType('text/csv');
  res.sendFile(__dirname + '/culta.csv');
})