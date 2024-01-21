const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Asignatura = require('../models/Asignatura');



//crud asigantura
// muestra en una tabla la lista de asignaturas
router.get('/', async(req, res) => {
    const listado = await Asignatura.find({});
    res.render('asignaturas/index', {asignaturas: listado});
});

// muestra el formulario alta profesores
router.get('/create', (req, res) =>{
    res.render('asignaturas/create')
});

// guarda el profesor en la BBDD
router.post('/create', async(req, res) =>{
    const {nombre, curso, ciclo} = req.body;
    const asignatura = new Asignatura({
        nombre: nombre,
        curso: curso,
        ciclo: ciclo
    });
    try {
        await asignatura.save();
        res.redirect('/asignaturas');
    } catch (error) {
        res.render('mensaje', {mensaje: error.message});
    }
});

 // Obtener un profesor por su ID
router.get('/edit/:id', async(req, res) => {
    try {
        const asignatura = await Asignatura.findById(req.params.id);
        if(asignatura)
            res.render('asignaturas/edit',{asignatura:asignatura});
        else
            res.render('mensaje',{mensaje:'No encuentro la asignatura en la base de datos'});
        
    } catch (error) {
        res.render('mensaje',{mensaje: error.message});
    }
});

//editar profesor por id
router.post('/edit/:id',async (req, res) => {
    const asignaturaId = req.params.id;
    const { nombre, curso, ciclo } = req.body;
    try {
        const editAsignatura = await Asignatura.findByIdAndUpdate(
            asignaturaId, { nombre, curso, ciclo }, { new: true });
        if(editAsignatura)
            res.redirect('/asignaturas');
        else
            res.render('mensaje',{mensaje:'No se ha podido editar la asignatura'});
    } catch (error) {
        res.render('mensaje', {mensaje: error.message});
    }
   
});

// Obtener y mostrar el alumno a eliminar
router.get('/delete/:id', async(req, res) => {
    try {
        const asignatura = await Asignatura.findById(req.params.id);
        if(asignatura)
            res.render('asignaturas/delete',{asignatura:asignatura});
        else
            res.render('mensaje',{mensaje:'No encuentro la asignatura en la base de datos'});
        
    } catch (error) {
        res.render('mensaje',{mensaje: error.message});
    }
});

//eliminar alumno por id
router.post('/delete/:id',async (req, res) => {
    const asignaturaId = req.params.id;
   
    try {

        const deleteAsignatura = await Asignatura.findByIdAndDelete(asignaturaId);
        if(deleteAsignatura)
            res.redirect('/asignaturas');
        else
            res.render('mensaje',{mensaje: "La asignatura no se ha podido borrar"});
    } catch (error) {
        res.render('mensaje', {mensaje: error.message});
    }
   
});


module.exports=router;