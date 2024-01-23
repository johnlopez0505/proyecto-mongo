const mongoose = require('mongoose');

// definir el esquema matricula
const matriculaSchema = new mongoose.Schema({
    alumno: {
        nombre:   { type: String, unique: false, required: true},
        apellido: { type: String, unique: false, required: true},
        email:    { type: String, unique: true,  required: true},
        telefono: { type: String, unique: true,  requiere: true}
    },
    asignatura: {
        nombre:   { type: String, unique: true, required: true },
        curso:    { type: String, required: true },
        ciclo:    { type: String, required: true}
    }
});
// equivalente a una clase modelo de java
const Matricula = mongoose.model('Matricula', matriculaSchema);

module.exports = Matricula;