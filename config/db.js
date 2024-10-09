// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error al conectar a MongoDB Atlas:', err);
    process.exit(1); // Salir con error si no se conecta
  }
};

module.exports = connectDB;
