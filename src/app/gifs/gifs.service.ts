import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from './interfaces/gifs.interfaces';
const GIPHY_API_KEY: string = environment.giphy_apiKey;

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  constructor(private http: HttpClient) { }

  get tagHistory() {
    return [...this._tagsHistory]; // crea una copia de _tagsHistory
  }

  private organizehistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizehistory(tag);

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag);

    this.http.get<SearchResponse>(
      `https://api.giphy.com/v1/gifs/search`, { params }
    ).subscribe(resp => {
      this.gifList = resp.data
    })

    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=2TW70K0AwMBZ1o6WwNU3p53v9DR0J9xl&q=mario bros&limit=10')
      .then(res => res.json())
      .then(data => console.log(data)); */
  }
}
