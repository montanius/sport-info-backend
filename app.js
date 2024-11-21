require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoURI = `mongodb+srv://1lukagrdinic:${process.env.MONGODB_PASSWORD}@a11y-audit-api-cluster.zevnhuj.mongodb.net/sport-info?retryWrites=true&w=majority&appName=a11y-audit-api-cluster`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
/*.then(() => {console.log('Connected to MongoDB')
  testirajUpisivanjeKorisnikaUBazu()})
.catch((error) => console.error('Error connecting to MongoDB:', error));

async function testirajUpisivanjeKorisnikaUBazu(){
  try{
    const ime = "Goran";
    const email = "gmacanovic@gmail.com";
     const lozinka = "12345";
   const noviKorisnik = new User({ime, email, lozinka});
    await noviKorisnik.save();
    console.log("Korisnik upisan.");
  }
  catch(error){
console.log("Došlo je do greške", error);
  }
}*/

app.use(cors());
app.use(express.json());
app.use('/api', usersRoutes);


/*app.post('/Korisnik', async (req, res) => {
  try{
    const {ime, email, lozinka} = req.body;
    const noviKorisnik = new User({ime, email, lozinka});
    await noviKorisnik.save();
    res.status(201).json(noviKorisnik);
  }
  catch(error){
    res.status(400).json({error : error.message});
  }
}
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/test", (req, res) => {
  res.send("Pozdrav od Gorana.");
});*/

app.listen(port, () => {
  console.log(`sport-info-backend app listening on port ${port}`)
})