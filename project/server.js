require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/user')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const port = 5000
app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use(express.urlencoded({extended:true}))

//const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connected to Database")).catch(err=>console.log(err))

app.post('/signup',async (req,res)=>{
    try{
        let {username,email,password} = req.body;
        let existinguser = await userModel.findOne({email})
        if(existinguser) {
            return res.status(400).send("User already exists")
        }
        const hashed = await bcrypt.hash(password,10)
        const user = await userModel.create({username,email,password : hashed})
        res.status(201).send(user)
    }
    catch(err){
        console.log(err)
    }

})

app.post('/login',async (req,res)=>{
    let {username , password} = req.body;
    try{
        const user = await userModel.findOne({username})
        if(!user){
            return res.status(404).send({error : "User not found"})
        }
        const valid = await bcrypt.compare(password , user.password)
        if(!valid){
            return res.status(401).send({error : "Invalid Password"})
        }
        const token = jwt.sign({userId : user._id},JWT_SECRET)
        res.send({message : 'Login Successfull'})
    }
    catch(err){
        console.log(err)
        res.status(500).send({error : "Server error"})
    }
    
})

let selectedFoods = []

app.post("/api/add-food", (req, res) => {
    const { food_name, protein_g, carb_g, fat_g, fibre_g, energy_kcal } = req.body;

    if (!food_name) {
        return res.status(400).json({ message: "No food selected!" });
    }

    const food = { food_name, protein_g, carb_g, fat_g, fibre_g, energy_kcal };
    selectedFoods.push(food);

    console.log("Added food:", food); // Debugging

    res.json({
        message: "Food added successfully",
        selectedFoods,
    });
});


app.get("/api/selected-food",(req,res)=>{
    res.json(selectedFoods)
})

app.listen(port,()=>{
    console.log(`Live at port ${port}`)
})