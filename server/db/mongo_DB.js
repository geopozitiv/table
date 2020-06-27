const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test',  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(res => console.log('conected to DB'))
  .catch(err => console.log(`'could not connect to DB ': ${err}`))