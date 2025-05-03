export const environment = {
  production: true,
  apiUrl: "https://api.production.example.com",
  randomDuckApiUrl: "https://random-d.uk/api/v2/random",

  quoteApiUrl: {
    dummyJson: "https://dummyjson.com/quotes",
    jokeApi: "https://official-joke-api.appspot.com/jokes",
  },

  // quoteProvider: "dummyJson",
  quoteProvider: "jokeApi",
  appName: "Duck Pro+ Encyclopedia",
  features: {
    enableAnimations: true,
    enableRandomDuckFeature: true,
    enableFirebaseIntegration: true,
  },

  // CORS Proxy Configuration
  enableCorsProxy: true,
  corsProxyUrl: "https://corsproxy.io/",

  firebaseConfig: {
    // Restrict on Firebase
    apiKey: "AIzaSyC8WiqyYmUUFKk6MUt1HWvMV5UTMcTHod8",
    authDomain: "duck-pro-plus.firebaseapp.com",
    projectId: "duck-pro-plus",
    storageBucket: "duck-pro-plus.firebasestorage.app",
    messagingSenderId: "988740679478",
    appId: "1:988740679478:web:71d89eaa69004772cf2597"
  },

  firestoreCollection: "prod",
};
