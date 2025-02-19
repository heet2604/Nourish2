const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    food_name : String,
    protein_g : Number,
    carb_g : Number,
    fat_g : Number,
    fibre_g : Number,
    energy_kcal : Number,
},{collection:"foods"},{timestamps : true});

module.exports = mongoose.model("Food",foodSchema)