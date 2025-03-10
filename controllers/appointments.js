const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Doctor = require('../models/doctor.js');
const doctors = require('../seed.js');



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
    const doctor = await Doctor.findById(req.body.doctor)
    doctor.patientid.push(req.session.user._id)
    await doctor.save();

        res.redirect(`/users/${currentUser._id}/appointments`);
  } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  }); 


router.get('/:appointmentId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const appointment= currentUser.appointments.id(req.params.appointmentId);
    const doctors = await Doctor.find({patientid: req.session.user._id})
    console.log(doctors)
    res.render('appointments/show.ejs', {
      appointment: appointment, doctors: doctors
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.delete('/:appointmentId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const appointment= currentUser.appointments.id(req.params.appointmentId);
    console.log(appointment)
      await appointment.deleteOne();
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/appointments`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

router.get('/:appointmentId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const appointment = currentUser.appointments.id(req.params.appointmentId);
    const doctors = await Doctor.find({patientid: req.session.user._id})
    res.render('appointments/edit.ejs', {
      appointment: appointment, doctors: doctors
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.put('/:appointmentId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const appointment = currentUser.appointments.id(req.params.appointmentId);
    // const doctors = await Doctor.find({patientid: req.session.user._id})
    appointment.set(req.body);
    // doctors.set(req.body);
    await currentUser.save();
    
    res.redirect(
      `/users/${currentUser._id}/appointments/${req.params.appointmentId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});


module.exports = router;