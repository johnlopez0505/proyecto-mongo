const mongoose = require('mongoose');

// definir el esquema profesor
const profesorSchema = new mongoose.Schema({
  nombre:   { type: String, unique: false, required: true },
  apellido: { type: String, unique: false, required: true },
  email:    { type: String, unique: true, required: true},
});
// equivalente a una clase modelo de java
const Profesor = mongoose.model('Profesor', profesorSchema);

module.exports = Profesor;