import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

export interface DuckData {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  facts: string[];
  habitat: string[];
  isEndangered: boolean;
}

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  private ducks: DuckData[] = [
    {
      id: "mallard1",
      name: "Mallard",
      scientificName: "Anas platyrhynchos",
      description:
        "The mallard is a dabbling duck that breeds throughout the temperate and subtropical Americas, Eurosiberia, and North Africa and has been introduced to New Zealand, Australia, Peru, Brazil, Uruguay, Argentina, Chile, Colombia, the Falkland Islands, and South Africa.",
      imageUrl: "https://random-d.uk/api/60.jpg",
      facts: [
        "Mallards can live for 5-10 years in the wild",
        "They are omnivorous and eat a variety of food sources",
        "The mallard is the ancestor of most domestic duck breeds",
      ],
      habitat: ["Wetlands", "Parks", "Ponds"],
      isEndangered: false,
    },
    {
      id: "wood2",
      name: "Wood Duck",
      scientificName: "Aix sponsa",
      description:
        "The wood duck is a perching duck species found in North America. They are known for their colorful plumage and ability to perch in trees, which is unusual for ducks.",
      imageUrl: "https://random-d.uk/api/32.jpg",
      facts: [
        "Wood ducks nest in tree cavities",
        "Ducklings jump from nesting trees shortly after hatching",
        "They can fly through woods with agility",
      ],
      habitat: ["Wooded swamps", "Marshes", "Streams"],
      isEndangered: false,
    },
  ];

  constructor(private http: HttpClient) {
    console.log("Firebase service initialized");
  }

  login(email: string, password: string): Observable<any> {
    console.log(`Attempting login with ${email}`);

    if (email === "admin@ducks.com" && password === "Duck@123") {
      const user = {
        uid: "admin123",
        email: email,
        displayName: "Admin User",
      };
      localStorage.setItem("user", JSON.stringify(user));
      return of(user);
    }

    return throwError(() => new Error("Invalid login credentials"));
  }

  logout(): Observable<void> {
    localStorage.removeItem("user");
    return of(undefined);
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getDucks(): Observable<DuckData[]> {
    console.log("Fetching ducks from Firebase");
    return of(this.ducks).pipe(
      tap((ducks) => console.log(`Retrieved ${ducks.length} ducks`)),
      catchError(this.handleError<DuckData[]>("getDucks", []))
    );
  }

  getDuck(id: string): Observable<DuckData> {
    const duck = this.ducks.find((d) => d.id === id);
    if (!duck) {
      return throwError(() => new Error(`Duck with id ${id} not found`));
    }
    return of(duck);
  }

  addDuck(duck: DuckData): Observable<DuckData> {
    this.ducks.push(duck);
    return of(duck);
  }

  updateDuck(duck: DuckData): Observable<DuckData> {
    const index = this.ducks.findIndex((d) => d.id === duck.id);
    if (index !== -1) {
      this.ducks[index] = duck;
      return of(duck);
    }
    return throwError(() => new Error(`Duck with id ${duck.id} not found`));
  }

  deleteDuck(id: string): Observable<void> {
    const index = this.ducks.findIndex((d) => d.id === id);
    if (index !== -1) {
      this.ducks.splice(index, 1);
      return of(undefined);
    }
    return throwError(() => new Error(`Duck with id ${id} not found`));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
