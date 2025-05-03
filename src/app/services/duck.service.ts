import { Injectable } from "@angular/core";
import { Duck } from "../interfaces/duck-interface";
import { FirebaseService } from "./firebase.service";
import { Globals } from "../../globals";
@Injectable({ providedIn: "root" })
export class DuckService {
  constructor(private firebaseService: FirebaseService, private globals: Globals) {
    setTimeout(() => {
      // if (confirm("ARE YOU SURE ABOUT THAT?!")) if (confirm("ARE YOU REALLY REALLY SURE ABOUT THAT?!!!")) this.firebaseService.resetFirestore();
    }, 5000);
  }

  getDucks() {
    // return this.globals.mockDucks
    return this.firebaseService.observeDucks();
  }
  getDuckById(id: string): Duck | undefined {
    // return this.globals.mockDucks.find((duck) => duck.id === id);
    return this.firebaseService.simpleDucksList.find((duck) => duck.id === id);
  }
  getFeaturedDuck(): Duck | undefined {
    // return this.globals.mockDucks.find((duck) => duck.isFeatured);
    return this.firebaseService.simpleDucksList.find((duck) => duck.isFeatured);
  }
}
