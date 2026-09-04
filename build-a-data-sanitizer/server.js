const express = require('express');

const { inputCleaner, inputValidator } = require('./middleware');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.redirect('/form')
})

app.use(express.static('./public'))

app.get('/form', (req,res)=>{
    return res.status(200).send();

})
app.post('/submit',inputCleaner,inputValidator,(req,res)=>{
    res.json({
    username: req.body.username,
    comment: req.body.comment
  })
})
app.listen(3000,()=>{
    console.log('Server running on port 3000...');
});