const express = require('express')
const app =express();
const port =3000;
const jokes= [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are only 10 kinds of people in the world: those who understand binary and those who don't.",
  "I told my computer I needed a break, and it said \"No problem, I'll go to sleep.",
  "Why do Java developers wear glasses? Because they don't see sharp.",
];
app.get('/',(req,res)=>{
    res.send('Welcome to the Random Joke Server! Visit /joke to get a random joke.')
})
app.get('/joke',(req,res)=>{
    // let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    const randomJoke= ()=>{
        let random = Math.random();
        if(random < 0.25) return jokes[0];
        if(random >= 0.25 && random < 0.5) return jokes[1];
        if(random >= 0.5 && random < 0.75) return jokes[2];
        if(random >= 0.75 && random < 1) return jokes[3];
    }
    res.status(200).send(randomJoke);
})

app.get('/about',(req,res)=>{
    res.status(200).send('This Random Joke Server was built with Express.js')
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})