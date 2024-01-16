const mongoose = require('mongoose');

// definir el esquema 
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email:    { type: String, required: false}
});
// equivalente a una clase modelo de java
const User = mongoose.model('User', userSchema);

module.exports = User;