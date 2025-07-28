// createAdmin.js
// Script para crear o actualizar un usuario administrador en Firebase y Firestore

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializa Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Configura aquí tu correo y contraseña de administrador:
const email = 'adminfundimundo@gmail.com'; // ← reemplaza por tu email admin
const password = 'C4RN4B0G2O25_';          // ← reemplaza por tu contraseña deseada

async function createOrUpdateAdmin() {
  try {
    let userRecord;

    // Buscar usuario por email
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

    // Asignar custom claim admin
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`Rol 'admin' asignado a: ${email}`);

    // Actualizar también en Firestore
    await db.collection('users').doc(userRecord.uid).set(
      {
        email,
        role: 'admin',
        uid: userRecord.uid,
        updatedAt: new Date(),
      },
      { merge: true }
    );
    console.log(`Documento en Firestore actualizado con role 'admin'`);

    process.exit(0);
  } catch (error) {
    console.error('Error en creación/actualización de admin:', error);
    process.exit(1);
  }
}

createOrUpdateAdmin();
