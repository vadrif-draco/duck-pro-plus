import { Globals } from "../globals";

export const environment = {
  ...Globals.env,
  ...{
    production: true,
    randomDuckApiUrl: "https://random-d.uk/api/v2/random",
    appName: "Duck Pro+ Encyclopedia",
    features: {
      enableAnimations: true,
      enableRandomDuckFeature: true,
      // ...
    },

    firebaseConfig: {
      // Restrict on Firebase
      apiKey: "AIzaSyC8WiqyYmUUFKk6MUt1HWvMV5UTMcTHod8",
      authDomain: "duck-pro-plus.firebaseapp.com",
      projectId: "duck-pro-plus",
      storageBucket: "duck-pro-plus.firebasestorage.app",
      messagingSenderId: "988740679478",
      appId: "1:988740679478:web:71d89eaa69004772cf2597",
    },

    // firestoreCollection: "prod",
    firestoreCollection: "dev",
  },
};
