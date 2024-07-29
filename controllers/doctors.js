const express = require('express');
const router = express.Router();

const Doctor = require('../models/doctor.js')
const doctors = require('../seed.js')



router.get("/doctors/seed", (req, res) => {
  Doctor.deleteMany({}).then((data) => {
    Doctor.create(doctors)
      .then((data) => {
        res.json(data)
      })
  })
})

router.post('/', async (req, res) => {
    req.body.patientid = req.session.user._id;
    await Doctor.create(req.body);
    res.redirect('/');
  });
  
  // controllers/doctors.js
  
  router.get('/', async (req, res) => {
    try {
      const populatedDoctors = await Doctors.find({}).populate('patientid');
  
      res.render('doctors/index.ejs',{
        doctors: populatedDoctors, 
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });

  

  module.exports = router;