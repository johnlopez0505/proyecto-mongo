const mongoose = require('mongoose');

// definir el esquema alumnos
const alumnoSchema = new mongoose.Schema({
  nombre:   { type: String, unique: false, required: true},
  apellido: { type: String, unique: false, required: true},
  email:    { type: String, unique: true,  required: true},
  telefono: { type: String, unique: true,  requiere: true}
});
// equivalente a una clase modelo de java
const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;