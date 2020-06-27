const express = require('express');
const app = express();
const User = require('./model/User');
const cors = require('cors');
require('./db/mongo_DB');

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/user', async function (req, res) {
    const data = await User.find();
    res.status(200).send(data)
})
app.delete('/user/delete', async function (req, res) {
    const size = req.body.length
    if(size) {
        try {
            for(let i = 0; i < size; i++) {
            await User.deleteOne({_id:req.body[i]._id});
            }
            res.status(201).send({error: false, message:'users deleted'})
        }catch(err) {
            res.status(400).send({error: true, message:err.message})
        }
    }else {
        res.status(400).send({error: true, message:'provide delete Object'})
    }
   
})
app.put('/user/update', function (req, res) {
    const id = req.body.id
    User.findOneAndUpdate({_id: id}, {...req.body.data}, function(err, result){
        if(err){
            res.status(400).send(err.message)
        }
        else{
            res.status(200).send(result)
        }
    }) 
})
app.post('/user/create', async function (req, res) {
    try{
        const user = new User(req.body);
        await user.save()
        res.send(user)
    }catch(err) {
        res.status(400).send({error: true, message:err.message})
    }

})

app.listen(4000)