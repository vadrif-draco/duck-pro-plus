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
};
