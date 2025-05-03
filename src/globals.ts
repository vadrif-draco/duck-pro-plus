import { Injectable } from "@angular/core";
import { Duck } from "./app/interfaces/duck-interface";
@Injectable({ providedIn: "root" })
export class Globals {
  static env = {
    quoteApiUrl: {
      dummyJson: "https://dummyjson.com/quotes",
      jokeApi: "https://official-joke-api.appspot.com/jokes",
    },
    // quoteProvider: "dummyJson",
    quoteProvider: "jokeApi",

    enableCorsProxy: true,
    corsProxyUrl: "https://corsproxy.io/",

    ducksDocumentId: "ducks",
  };

  mockDucks: Duck[] = [
    {
      id: "1",
      name: "Mallard",
      scientificName: "Anas platyrhynchos",
      imageUrl: "assets/Mallard.png",
      habitat: "Lakes/Ponds",
      facts: ["Mallards are the most common duck species in the Northern Hemisphere!"],
      isEndangered: false,
    },
    {
      id: "2",
      name: "Mandarin Duck",
      scientificName: "Aix galericulata",
      imageUrl: "assets/Mandarin.jpg",
      habitat: "Forest Rivers",
      facts: ["Mandarin ducks symbolize love in Chinese culture."],
      isEndangered: false,
    },
    {
      id: "3",
      name: "Hawaiian Duck (Koloa)",
      imageUrl: "assets/Koloa.jpg",
      habitat: "Hawaiian Wetlands",
      facts: ["Critically endangered due to habitat loss."],
      isEndangered: true,
    },
    {
      id: "4",
      name: "Laysan Duck",
      imageUrl: "assets/Laysan.jpg",
      habitat: "Laysan Island",
      facts: ["One of the rarest ducks globally, with fewer than 1,000 left."],
      isEndangered: true,
    },
    {
      id: "5",
      name: "White-winged Duck",
      imageUrl: "assets/White-winged.jpg",
      habitat: "Southeast Asian Forests",
      facts: ["Endangered due to deforestation."],
      isEndangered: true,
    },
    {
      id: "6",
      name: "Wood Duck",
      scientificName: "Aix sponsa",
      imageUrl: "assets/Wood.jpg",
      habitat: "Swamps",
      facts: ["Nests in tree cavities!"],
      isEndangered: false,
    },
    {
      id: "7",
      name: "Call Duck",
      imageUrl: "assets/Call.jpg",
      habitat: "Domesticated by humans!",
      facts: ["Ashraf's favorite duck", "They are the cutest of them all\n❤️❤️❤️"],
      isEndangered: false,
      isFeatured: true,
    },
  ];
}
