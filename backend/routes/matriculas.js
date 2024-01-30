const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Matricula = require('../models/Matricula');
const Alumno = require('../models/Alumno');
const Asignatura = require('../models/Asignatura');

   
// detalle maestro matriculas
router.get('/', async (req, res) => {
    // Obtener lista de alumnos y asignaturas
    const alumno = await Alumno.find({});
    const asignatura = await Asignatura.find();
    //const alumno = await Matricula.find().populate('alumno').exec();
    //const asignatura = await Matricula.find().populate('asignatura').exec();
    const matricula = await Matricula.find();
    res.render('matriculas/index', {alumnos: alumno,asignaturas:asignatura,matriculados:matricula});
    console.log('Estas son las matriculas' + matricula);
});



router.post('/matriculas', async (req, res) => {
    const { alumno, asignatura } = req.body;

    
});

router.get('/asignaturas-alumno/:alumnoId', (req, res) => {
    

});

module.exports=router;