require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const fruits = require('./fruits.js')
const cors = require('cors');
app.use(cors());
app.use("/fruits", express.json()); 

app.get('/', (req, res) => {
    res.send('Hello fruity');
});

app.get('/fruits', (req, res) => {
    res.send(fruits);
});

const ids = fruits.map((fruit) => fruit.id);
let maxId = Math.max(...ids);

app.post('/fruits', (req, res) => {

    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase());

    if (fruit != undefined) {
        res.status(409).send("The fruit already exists.");
    } else {
        maxId += 1;
        req.body.id = maxId;

        fruits.push(req.body);
        res.status(201).send(req.body);
    }
});


app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() == name);
    if(fruitIndex == -1) {
        res.status(404).send("The fruit does not exist");
    } else {
        fruits.splice(fruitIndex, 1);
        res.sendStatus(204);
    }
});




app.get('/fruits/:name', (req, res) => {
   
     const name = req.params.name.toLowerCase();
   let fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);
     if (fruit === undefined) {
      res.status(404).send("The fruit does not exist")
     } else {
         res.send(fruit);
     }
    });






    app.listen(port, () => console.log(`App running on port ${port}`))




     // our code
//     const name = req.params.name.toLowerCase();
//     let result = fruits.find(fruit => fruit = req.params.name );
// res.send(result);
    //res.send(`Return a fruit with name ${req.params.name}`); //getting the :name which is the params then specifying the objet key. params is what user is typing eg apple
    


//sergi method
// app.get('/fruits/:name', (req, res) => {
//     const name = req.params.name.toLowerCase();
//     let fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);
//     if (fruit === undefined) {
//         res.status(404).send("The fruit does not exist")
//     } else {
//         res.send(fruit);
//     }

    //res.send(`Return a fruit with name ${req.params.name}`); //getting the :name which is the params then specifying the objet key. params is what user is typing eg apple
    
//});

// function whichFruit() {
//     for(let i = 0; i < fruits.length; i++) {
//         if (fruits[i] === req.params.name) {
//             res.send(fruits[i]);
//         }
//     }
// }








// const express = require('express');
// const app = express(); //decaring varibale that app uses
// const port = 3000; //declare variable for port

// app.get('/', (req, res) => {
//     res.send('Hello world!') //instead of end its 
// }) //user will GET the information - recieve. / = the maain page eg app.get('/news/sport) this route will take this http command - JUST to recieve information

// app.get('/penguins', (req, res) => {
//     //res.status(204).send(); //starts with 2 its working, 3 around direction, 4 means user did somethng wrong, 5 we did something wrong //the send is sending to user and browser 
//     res.send('Here are the penguins');
// }) // section down for more specific eg code below - move down a hierarcy start generic 
// // app.get('animals/penguins', (req, res) => {
// //     res.send('Here are the penguins');
// // })

// // app.get('/penguins/:name', (req, res) => {
// //     res.send(req.params); //getting the name of the penguin
// // })

// app.get('/penguins/:name', (req, res) => {
//     res.send(req.params); //if comes with colon its a dynamic paramter, if it comes with a question mark
// }) 

// app.listen(port, () => console.log(`App running on port: ${port}`));











// //NODE
// // const http = require('http'); //allow us to use http commands and create a server - http comes from node - most backend libraries have http
// // const port = 3000;

// // const server = http.createServer((req, res) => {
// //     res.setHeader("Content-Type", "text/html"); // set a header and pass this content to be able to s how this image or nay text 
// //     res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>");
// //     //res.statusCode = 200; //when not found we have made that wrror, when change to 500 is an error on the backend or the server. 200 is for ok
    
// // }); //create a server for us (and storing it as a variable), take a requirement - what it takes from the browser, choose what we senf as a resolution, send hello and end this connection

// // server.listen(port, () => console.log(`App running of port: ${3000}`)); //passing port number - when this runs as well going to see on the server (port is a space in local host)
