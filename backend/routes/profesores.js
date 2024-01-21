const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Profesor = require('../models/Profesor');

//crud profesor
// muestra en una tabla la lista de profesores
router.get('/', async(req, res) => {
    const listado = await Profesor.find({});
    res.render('profesores/index', {profesores: listado});
});

// muestra el formulario alta profesores
router.get('/create', (req, res) =>{
    res.render('profesores/create')
});

// guarda el profesor en la BBDD
router.post('/create', async(req, res) =>{
    const {nombre, apellido, email} = req.body;
    const profesor = new Profesor({
        nombre: nombre,
        apellido: apellido,
        email: email
    });
    try {
        await profesor.save();
        res.redirect('/profesores');
    } catch (error) {
        res.render('mensaje', {mensaje: 'ERROR: ' + 
            'El correo electrónico o el teléfono proporcionado ya existía en la base de datos.'});
    }
});

 // Obtener un profesor por su ID
router.get('/edit/:id', async(req, res) => {
    try {
        const profesor = await Profesor.findById(req.params.id);
        if(profesor)
            res.render('profesores/edit',{profesor:profesor});
        else
            res.render('mensaje',{mensaje:'No encuentro el profesor en la base de datos'});
        
    } catch (error) {
        res.render('mensaje',{mensaje: error.message})
    }
});

//editar profesor por id
router.post('/edit/:id',async (req, res) => {
    const profesorId = req.params.id;
    const { nombre, apellido, email } = req.body;
   
    try {
        const editProfesor = await Profesor.findByIdAndUpdate(profesorId, 
            { nombre, apellido, email }, { new: true });
        if(editProfesor)
            res.redirect('/profesores');
        else
            res.render('mensaje',{mensaje:'No se ha podido editar el profesor'})
    } catch (error) {
        res.render('mensaje', {mensaje: error.message});
    }
   
});

// Obtener y mostrar el alumno a eliminar
router.get('/delete/:id', async(req, res) => {
    try {
        const profesor = await Profesor.findById(req.params.id);
        if(profesor)
            res.render('profesores/delete',{profesor:profesor});
        else
            res.render('mensaje',{mensaje:'No encuentro el profesor en la base de datos'});
        
    } catch (error) {
        res.render('mensaje',{mensaje: error.message});
    }
});

//eliminar alumno por id
router.post('/delete/:id',async (req, res) => {
    const profesorId = req.params.id;
   
    try {
        const deleteProfesor = await Profesor.findByIdAndDelete(profesorId);
        if(deleteProfesor)
            res.redirect('/profesores');
        else
            res.render('mensaje',{mensaje:'No se ha podido eliminar el profesor'});
    } catch (error) {
        res.render('mensaje', {mensaje: error.message});
    }
   
});


module.exports=router;