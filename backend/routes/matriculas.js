const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Matricula = require('../models/Matricula');

   
// detalle maestro matriculas
router.get('/', async (req, res) => {
    // Obtener lista de alumnos y asignaturas
    const alumno = await Matricula.find().populate('alumno').lean().exec();
    const asignatura = await Matricula.find().populate('asignatura').lean().exec();
    const matricula = await Matricula.find().populate('alumno').populate('asignatura').lean().exec();;
    res.render('matriculas/index', {alumnos: alumno,asignaturas:asignatura,matriculados:matricula});
    console.log(alumno);
    console.log(asignatura)
    console.log(matricula);
});



router.post('/matriculas', async (req, res) => {
    const { alumno, asignatura } = req.body;

    // Verificar si la matricula ya existe
    const queryExistencia = `
    SELECT * FROM asignatura_alumno 
    WHERE alumno = ? AND asignatura = ?`;

    try {
        const resultExistencia = await queryAsync(queryExistencia, [alumno, asignatura]);
        if (resultExistencia.length === 0) {
            // Matricular al alumno en la asignatura
            const queryMatricular = `
            INSERT INTO asignatura_alumno 
            (alumno, asignatura) VALUES (?, ?)`;
            
            try {
                await queryAsync(queryMatricular, [alumno, asignatura]);
                // Éxito en la matricula
                res.redirect('/matricular');
            } catch (errMatricular) {
                // Ignorar el error específico que esperamos
                if (!(errMatricular.sqlState === '45000' && errMatricular.errno === 1644)) {
                    // Otro tipo de error, lanzar para que se maneje en el bloque catch superior
                    throw errMatricular;
                }
                // Error específico: No se pueden matricular más de 32 alumnos a la asignatura
                console.error('Error: No se pueden matricular más de 32 Alumnos a la Asignatura.');
                res.render('error', { mensaje: 'No se pueden matricular más de 32 Alumnos a la Asignatura.' });
            }
        } else {
            // Asignación ya existe
            res.render('error', { mensaje: 'La Asignación ya existe' });
        }
    } catch (errExistencia) {
        // Error al verificar la existencia
        res.render('error', { mensaje: 'Error al verificar la existencia.' });
    }
});

router.get('/asignaturas-alumno/:alumnoId', (req, res) => {
    const alumnoId = req.params.alumnoId;
    // Obtener asignaturas matriculadas para el alumno seleccionado
    const queryAsignaturasMatriculadas = `
    SELECT asignatura.nombre as asignatura, alumno.*
    FROM asignatura, alumno, asignatura_alumno
    WHERE asignatura_alumno.alumno = ?
    AND asignatura.id = asignatura_alumno.asignatura
    AND alumno.id = asignatura_alumno.alumno;`;
    
    db.query(queryAsignaturasMatriculadas, [alumnoId], (err, result) => {
        if (err) res.render('error', {mensaje: err});
        else {
            const asignaturas = result;
            db.query('select * from alumno where alumno.id=?', [alumnoId], (err, result) => {
                if (err) res.render('error', {mensaje: err});
                else
                    res.render('asignaturas-alumno', {alumno: result[0],
                    asignaturasMatriculadas: asignaturas,
                    user: req.session.user, 
                    rol: req.session.rol
                });
            });
        }
    });
});

module.exports=router;