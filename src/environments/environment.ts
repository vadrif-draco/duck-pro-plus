export const environment = {
  production: false,
  apiUrl: "https://api.example.com",
  randomDuckApiUrl: "https://random-d.uk/api/v2/quack",

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
    enableFirebaseIntegration: false,
  },

  // CORS Proxy Configuration
  enableCorsProxy: true,
  corsProxyUrl: "https://corsproxy.io/",
};
