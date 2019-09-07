const express = require('express');

const app = express();
const PORT = '8888';

//Database
const dogs = {
    "1" : { name: "good boy", age: "400"},
    "2" : { name: "jack", age: "3"},
    "3" : { name: "jake", age: "34"},
};

app.get('/dogs', (request, response) => {
    response.send(dogs);

})
//pedir solo uno
app.get('/dogs/:id', (request, response) => {
    console.log(request.params.id);
    let dog = dogs[request.params.id];
    if (dog){
        response.send(dog);
    } else {
        response.status(404).send('Response not found');
    }
    
})

app.post('/dogs', (request, response) => {
    let newDog = request.query;
    response.send({ ...dogs, "4": newDog });
});

app.put('/dogs/:id', (request, response) => {
    let dog = dogs[request.params.id];
    if (dog){
        dog = request.query;
        response.send(dog);
    } else {
        response.status(404).send('Response not found');
    }
});

app.delete('/dogs/:id', (request, response) => {
    let dog = dogs[request.params.id];
    if (dog){
        delete dogs[request.params.id];
        response.status(204).send('Se fue el perrito');
    } else {
        response.status(404).send('Response not found');
    }
});

app.get('*', (request,response) => {
    //response.status(404).send('Route not found');
    response.sendStatus(404);
})

app.listen('8888', () => {
    console.log(`Serving running in ${PORT}`)
});