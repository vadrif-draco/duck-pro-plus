export const environment = {
  production: false,
  apiUrl: "https://api.example.com",
  randomDuckApiUrl: "https://random-d.uk/api/v2/random",

  quoteApiUrl: {
    dummyJson: "https://dummyjson.com/quotes",
    jokeApi: "https://official-joke-api.appspot.com/jokes",
  },

  quoteProvider: "jokeApi",
  appName: "Duck Pro+",
  features: {
    enableAnimations: true,
    enableRandomDuckFeature: true,
    enableFirebaseIntegration: false,
  },
};
