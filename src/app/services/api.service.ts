import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of, forkJoin } from "rxjs";
import { map, catchError, switchMap, retry, tap, delay } from "rxjs/operators";
import { environment } from "../../environments/environment";

interface RandomDuckResponse {
  url: string;
  message?: string;
}

export interface QuoteResponse {
  id: number;
  quote: string;
  author: string;
}

interface DummyJSONQuoteResponse {
  id: number;
  quote: string;
  author: string;
}

interface JokeAPIResponse {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export type QuoteProvider = "dummyJson" | "jokeApi";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private readonly fallbackDuckImage = "/assets/Harlequin404.gif";

  constructor(private http: HttpClient) {}

  getRandomDuck(): Observable<string> {
    return this.http.get<RandomDuckResponse>(environment.randomDuckApiUrl).pipe(
      tap((response) => console.log("Duck API response:", response)),
      map((response) => response.url),
      retry(2),
      catchError((error) => {
        console.error("Error fetching random duck:", error);
        return of(this.fallbackDuckImage);
      })
    );
  }

  getDuckById(id: number): Observable<string> {
    const isGif = id >= 600;
    const actualId = isGif ? id - 600 : id;
    const extension = isGif ? "gif" : "jpg";

    const url = `https://random-d.uk/api/${actualId}.${extension}`;

    return of(url).pipe(tap((duckUrl) => console.log(`Fetching specific duck by ID ${id}, URL: ${duckUrl}`)));
  }

  private getQuoteIdFromDuckUrl(duckUrl: string): number {
    const urlParts = duckUrl.split("/");
    const fileNameWithExt = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExt.split(".")[0];
    const fileExt = fileNameWithExt.split(".")[1];

    const baseId = parseInt(fileName, 10) || 1;
    return fileExt === "gif" ? baseId + 600 : baseId;
  }

  getQuoteForDuck(duckUrl: string): Observable<QuoteResponse> {
    const quoteId = this.getQuoteIdFromDuckUrl(duckUrl);
    console.log(duckUrl, quoteId);

    const provider = environment.quoteProvider as QuoteProvider;

    switch (provider) {
      case "jokeApi":
        return this.getJokeQuote(quoteId);
      case "dummyJson":
      default:
        return this.getDummyJsonQuote(quoteId);
    }
  }

  private getDummyJsonQuote(quoteId: number): Observable<QuoteResponse> {
    return this.http.get<DummyJSONQuoteResponse>(`${environment.quoteApiUrl.dummyJson}/${quoteId}`).pipe(
      catchError((error) => {
        console.error("Error fetching DummyJSON quote:", error);
        return of(this.getFallbackQuote());
      })
    );
  }

  private getJokeQuote(quoteId: number): Observable<QuoteResponse> {
    return this.http.get<JokeAPIResponse>(`${environment.quoteApiUrl.jokeApi}/${quoteId % 450}`).pipe(
      map((joke) => ({
        id: joke.id,
        quote: `${joke.setup} ${joke.punchline}`,
        author: joke.type === "programming" ? "Tech Duck" : joke.type === "dad" ? "Dad Duck" : "Comedy Duck",
      })),
      catchError((error) => {
        console.error("Error fetching joke quote:", error);
        return of(this.getFallbackQuote());
      })
    );
  }

  private getFallbackQuote(): QuoteResponse {
    return {
      id: 0,
      quote: "Quack! Something went wrong with the quote.",
      author: "Error Duck",
    };
  }

  getDuckWithQuoteById(id: number): Observable<{ duckUrl: string; quote: QuoteResponse }> {
    return this.getDuckById(id).pipe(
      switchMap((duckUrl) => {
        return this.getQuoteForDuck(duckUrl).pipe(
          map((quote) => ({
            duckUrl,
            quote,
          }))
        );
      })
    );
  }

  getDuckWithQuote(): Observable<{ duckUrl: string; quote: QuoteResponse }> {
    return this.getRandomDuck().pipe(
      switchMap((duckUrl) => {
        return this.getQuoteForDuck(duckUrl).pipe(
          map((quote) => ({
            duckUrl,
            quote,
          }))
        );
      })
    );
  }

  getMultipleRandomDucks(count: number = 3): Observable<string[]> {
    const requests = Array(count)
      .fill(0)
      .map(() => this.getRandomDuck());

    return forkJoin(requests);
  }
}
