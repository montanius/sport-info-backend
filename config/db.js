const mongoose = require('mongoose');

const connectDB = async () => {
        try{
await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});
console.log("Konekcija na bazu je uspješna.");
    }
    catch(error){
console.log("Došlo je do greške pri konekciji na bazu:", error.message);
process.exit(1);
    }
};

connectDB();
module.exports = connectDB;