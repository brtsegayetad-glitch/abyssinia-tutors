import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId || '(default)');
export const auth = getAuth(app);

async function testConnection() {
  try {
    // Attempt to read a non-existent doc just to check connectivity
    await getDocFromServer(doc(db, 'system', 'connection-test'));
    console.log("Firebase connection established.");
  } catch (error: any) {
    if (error.code === 'permission-denied') {
        console.log("Firebase connected (Restricted probe doc).");
    } else if (error.message && error.message.includes('permission-denied')) {
        console.log("Firebase connected (Permission message caught).");
    } else {
        // If it's a real connection error (network, quota, etc)
        console.warn("Firebase probe issue (non-fatal):", error.message || error);
    }
  }
}

testConnection();
