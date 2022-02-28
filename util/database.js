const  mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost/dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


var database = mongoose.connection;

database.on('connected', function() {
    console.log('database is connected successfully');
});

database.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
database.on('error', console.error.bind(console, 'connection error:'));

module.exports = database;