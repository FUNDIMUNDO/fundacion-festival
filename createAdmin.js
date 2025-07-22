// createAdmin.js
// Script para crear o actualizar un usuario administrador en Firebase

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializa Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Configura aquí tu correo y contraseña de administrador:
const email = 'adminfundimundo@gmail.com';          // ← reemplaza por tu email admin
const password = 'C4RN4B0G2O25_';  // ← reemplaza por tu contraseña deseada

async function createOrUpdateAdmin() {
  try {
    let userRecord;

    // Intentar obtener el usuario por email
    try {
      userRecord = await admin.auth().getUserByEmail(email);
      console.log(`Usuario existente encontrado: ${email}`);
      // Si existe, actualizamos la contraseña
      await admin.auth().updateUser(userRecord.uid, { password });
      console.log('Contraseña actualizada.');
    } catch (err) {
      // Si no existe, lo creamos
      userRecord = await admin.auth().createUser({ email, password });
      console.log(`Usuario creado: ${email}`);
    }

    // Asignar rol de administrador
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`Rol 'admin' asignado a: ${email}`);

    process.exit(0);
  } catch (error) {
    console.error('Error en creación/actualización de admin:', error);
    process.exit(1);
  }
}

createOrUpdateAdmin();
