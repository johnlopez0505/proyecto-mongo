const mongoose = require('mongoose');
const Alumno = require('./Alumno');
const Asignatura = require('./Asignatura');
// definir el esquema matricula
const matriculaSchema = new mongoose.Schema({
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno'
    },
    asignatura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asignatura'
    },
    año: {

    }

});
// equivalente a una clase modelo de java
const Matricula = mongoose.model('Matricula', matriculaSchema);

module.exports = Matricula;