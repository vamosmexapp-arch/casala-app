/* ============================================================
   Casalá — Firebase config (EXAMPLE / TEMPLATE)
   ------------------------------------------------------------
   When you're ready to connect a real database:
   1. Go to https://console.firebase.google.com → create a project "casala"
   2. Add a Web App, copy the config object it gives you
   3. Copy this file to js/firebase-config.js and paste your values
   4. In data.js, replace getListings() with a Firestore query
   This .example file is safe to commit. Your real
   firebase-config.js should go in .gitignore.
   ============================================================ */

// Loaded via <script type="module"> when you wire it up:
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x/firebase-app.js";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.x/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "casala-XXXX.firebaseapp.com",
  projectId: "casala-XXXX",
  storageBucket: "casala-XXXX.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:abcdef"
};

/* Example of the swap inside data.js once Firebase is live:

async function getListings(){
  const snap = await getDocs(collection(db, "listings"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
*/
