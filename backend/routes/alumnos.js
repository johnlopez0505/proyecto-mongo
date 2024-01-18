const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const alumno = require('../models/Alumno');

router.get("/", (req, res) =>{
    res.render('alumnos/index');
});

router.get("/create", (req, res) =>{
    res.render('alumnos/create');
});

router.post("/craete", (req, res) =>{
    //res.render('alumnos/index');
});



module.exports = router;