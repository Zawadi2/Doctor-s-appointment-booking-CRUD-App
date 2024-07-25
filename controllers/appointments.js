const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const doctors = require('../seed.js')



router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id); 
      // console.log(currentUser)
    res.render('appointments/index.ejs', {
      appointments: currentUser.appointments
    });
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
});

router.get('/new', async (req, res) => {
    res.render('appointments/new.ejs');
  });
  
  router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.appointments.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/appointments`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  }); 
router.get("/doctors/seed", (req, res) => {
  doctors.deleteMany({}).then((data) => {
    doctors.create(starDoctorss)
      .then((data) => {
        res.json(data)
      })
  })
})

router.get('/new', async (req, res) => {
  res.render('doctors/new.ejs', { doctors });
});

module.exports = router;
