const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Alumno = require('../models/Alumno');

//crud alumno
// muestra en una tabla la lista de alumnos
router.get('/', async(req, res) => {
    const listado = await Alumno.find({});
    res.render('alumnos/index', {alumnos: listado});
});

// muestra el formulario alta alumno
router.get('/create', (req, res) =>{
    res.render('alumnos/create')
});

// guarda el alumno en la BBDD
router.post('/create', async(req, res) =>{
    const {nombre, apellido, telefono, email} = req.body;
    const alumno = new Alumno({
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        email: email
    });
    try {
        await alumno.save();
        res.redirect('/alumnos');
    } catch (error) {
        res.render('mensaje', {mensaje: 'ERROR: ' + 
            'El correo electrónico o el teléfono proporcionado ya existía en la base de datos.'});
    }
});

 // Obtener un alumno por su ID
router.get('/edit/:id', async(req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if(alumno)
            res.render('alumnos/edit',{alumno:alumno});
        else
            res.render('mensaje',{mensaje:'No encuentro el alumno en la base de datos'});
        
    } catch (error) {
        res.render('mensaje',{mensaje: 'Error a buscar ese alumno'})
    }
});

//editar alumno por id
router.post('/edit/:id',async (req, res) => {
    const alumnoId = req.params.id;
    const { nombre, apellido, email, telefono } = req.body;
   
    try {
        await Alumno.findByIdAndUpdate(alumnoId, { nombre, apellido, email, telefono }, { new: true });
        res.redirect('/alumnos');
    } catch (error) {
        res.render('mensaje', {mensaje: 'ERROR: ' + 
            'El correo electrónico o el teléfono proporcionado ya existía en la base de datos.'});
    }
   
});

// Obtener y mostrar el alumno a eliminar
router.get('/delete/:id', async(req, res) => {
    try {
        const alumno = await Alumno.findById(req.params.id);
        if(alumno)
            res.render('alumnos/delete',{alumno:alumno});
        else
            res.render('mensaje',{mensaje:'No encuentro el alumno en la base de datos'});
        
    } catch (error) {
        res.render('mensaje',{mensaje: 'Error a buscar ese alumno'})
    }
});

//eliminar alumno por id
router.post('/delete/:id',async (req, res) => {
    const alumnoId = req.params.id;
   
    try {
        await Alumno.findByIdAndDelete(alumnoId);
        res.redirect('/alumnos');
    } catch (error) {
        res.render('mensaje', {mensajePagina: 'ERROR: '});
    }
   
});



module.exports=router;
