const express = require("express")
const app = express()
const port = 3000;
const fs = require('fs');
app.get('/getBMI', (req, res) => {
    try{
        const personData = JSON.parse(fs.readFileSync("./data/data.json"))
        const seedData = JSON.parse(fs.readFileSync("./data/seedData.json"))
        const category = req.query?.category?.trim() || 'Over weight';
        let count = 0;
        personData.map((person) => {
            const bmi = person.WeightKg / ((person.HeightCm / 100) * (person.HeightCm / 100));
            person.bmi = parseFloat(bmi.toFixed(1));
            const range = seedData.find((sd) => bmi >= sd.bmi_range[0] && (sd.bmi_range[1]?bmi <= sd.bmi_range[1]:true));
            if(range.bmi_category === category)  count++ ;
            person.bmi_category = range.bmi_category;
            person.health_risk = range.health_risk;
        });
        return res.json({ status : 200,personData,[category]:count});
    }catch(err){
        return res.json({status : 500, message : "Internal server error"})
    }
    
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
module.exports = app
