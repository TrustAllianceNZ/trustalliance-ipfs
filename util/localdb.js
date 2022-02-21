const { mongoose } = require('mongoose');

// *****************************
//get your local URL here
mongoose.connect('mongodb://localhost/dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connecttion;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function(){
    console.log("Connected");
});

var DIDSchema = new Schema({
    cid : String,
    didDocument: Object,
    didURI: String,
});

var DIDModel = mongoose.model("did", DIDSchema, "didCollection");
var rec =  new DIDModel(
    {
        cid: "a",
        didDocument: {"a": "b"}, 
        didURI:"c"
    }
);

rec.save(function(err, doc) {
    if(err) {
        return console.error(err);
    }
    console.log("Document inserted successfully");
});



// *****************************  
