import mongoose from 'mongoose'

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost/projectsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => { console.log(err) });