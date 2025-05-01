import { Injectable } from "@angular/core";
import { Duck } from "../interfaces/duck-interface";
@Injectable({ providedIn: "root" })
export class DuckService {
  private mockDucks: Duck[] = [
    {
      id: 1,
      name: "Mallard",
      imageUrl: "assets/Mallard.png",
      habitat: "Lakes/Ponds",
      fact: "Mallards are the most common duck species in the Northern Hemisphere!",
      isEndangered: false,
    },
    {
      id: 2,
      name: "Mandarin Duck",
      imageUrl: "assets/Mandarin.jpg",
      habitat: "Forest Rivers",
      fact: "Mandarin ducks symbolize love in Chinese culture.",
      isEndangered: false,
    },
    {
      id: 3,
      name: "Hawaiian Duck (Koloa)",
      imageUrl: "assets/Koloa.jpg",
      habitat: "Hawaiian Wetlands",
      fact: "Critically endangered due to habitat loss.",
      isEndangered: true,
    },
    {
      id: 4,
      name: "Laysan Duck",
      imageUrl: "assets/Laysan.jpg",
      habitat: "Laysan Island",
      fact: "One of the rarest ducks globally, with fewer than 1,000 left.",
      isEndangered: true,
    },
    {
      id: 5,
      name: "White-winged Duck",
      imageUrl: "assets/White-winged.jpg",
      habitat: "Southeast Asian Forests",
      fact: "Endangered due to deforestation.",
      isEndangered: true,
    },
    {
      id: 6,
      name: "Wood Duck",
      imageUrl: "assets/Wood.jpg",
      habitat: "Swamps",
      fact: "Nests in tree cavities!",
      isEndangered: false,
    },
    {
      id: 7,
      name: "Call Duck",
      imageUrl: "assets/Call.jpg",
      habitat: "Domesticated by humans!",
      fact: "They are the cutest of them all\n❤️❤️❤️",
      isEndangered: false,
      isFeatured: true,
    },
  ];
  getDucks(): Duck[] {
    return this.mockDucks;
  }
  getDuckById(id: number): Duck | undefined {
    return this.mockDucks.find((duck) => duck.id === id);
  }
  getFeaturedDuck(): Duck | undefined {
    return this.mockDucks.find((duck) => duck.isFeatured);
  }
}
