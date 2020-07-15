const mongoose = require('mongoose');

const MONGOOSEDB_URL = 'mongodb+srv://liveshopping:Kl6Wwi61JHKhGGyJ@liveshoppingcluster.eimp1.mongodb.net/live-shopping?retryWrites=true&w=majority';
mongoose.set("debug", true);

mongoose.connect(MONGOOSEDB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then((res) => {
    console.log("Connected Successfully to MongoDb Atlas");
}).catch((err) => {
    console.log("Connection failed->" + err);
});


