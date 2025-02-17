const mongoose = require("mongoose")

const selectedFoodSchema = new mongoose.Schema({
    food_name : {
        type : String,
        required : true
    },
    carb_g : {
        type : Number,
        required : true
    },
    fat_g: { type: Number, required: true },
    protein_g: { type: Number, required: true },
    fibre_g: { type: Number, required: true },
    energy_kcal: { type: Number, required: true },
})

module.exports = mongoose.model('selectedFood',selectedFoodSchema)