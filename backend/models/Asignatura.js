const mongoose = require('mongoose');

// definir el esquema asignaturas
const asignaturaSchema = new mongoose.Schema({
  nombre:   { type: String, unique: true, required: true },
  curso:   { type: String, required: true },
  ciclo:    { type: String, required: true}
});
// equivalente a una clase modelo de java
const Asignatura = mongoose.model('Asignatura', asignaturaSchema);

module.exports = Asignatura;