const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Doctor = require('../models/doctor.js')
// const doctors = require('../seed.js')


// Index
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
// create -> Get
router.get('/new', async (req, res) => {
  const doctors = await Doctor.find()
  console.log(doctors)
  res.render('appointments/new.ejs', { doctors });
});
 
// Creat -> POST
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

// router.get("/doctors/seed", (req, res) => {
//   Doctor.deleteMany({}).then((data) => {
//     Doctor.create(doctors)
//       .then((data) => {
//         res.json(data)
//       })
//   })
// })
// controllers/applications.js

router.get('/:appointmentId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const appointment= currentUser.appointments.id(req.params.appointmentId);
    res.render('appointments/show.ejs', {
      appointments: appointment,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.post('/', async (req, res) => {
  req.body.patientid = req.session.user._id;
  await Listing.create(req.body);
  res.redirect('/');
});

// controllers/listings.js

router.get('/', async (req, res) => {
  try {
    const populatedDoctors = await Doctors.find({}).populate('pantientid');

    res.render('doctors/index.ejs',{
      doctors: populatedDoctors, 
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router;