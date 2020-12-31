import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  clientId = '341ff4c9f59d4eab8a3f6b59077db3d0';
  clientSecret = 'cd5a74ffbe77421fa57d5cd47b4ede85';
  token: string;

  constructor(private http: HttpClient) {
    console.log(`Spotify Service Ready`);
    // this.generateToken();

    setInterval(() => {
      this.generateToken();
    }, 3600000);
  }

  generateToken(): Observable<any> {
    return this.http.get(
      `http://localhost:3000/spotify/${this.clientId}/${this.clientSecret}`
    );
  }

  getQuery(query: string): Observable<any> {
    const url = `https://api.spotify.com/v1/${query}`;
    let headers = new HttpHeaders();

    // Obtener un token si no existe
    if (!this.token) {
      return this.generateToken().pipe(
        map((data) => (this.token = `${data.token_type} ${data.access_token}`)),
        switchMap(() => {
          console.log('[TOKEN GENERADO] ', this.token);
          headers = headers.set('Authorization', this.token);
          return this.http.get(url, { headers });
        })
      );
    }

    headers = headers.set('Authorization', this.token);
    return this.http.get(url, { headers });
  }

  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => data['albums'].items)
    );
  }

  getArtists(term: string): Observable<any> {
    return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(
      map((data) => data['artists'].items)
    );
  }

  getArtist(id: string): Observable<any> {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string): Observable<any> {
    return this.getQuery(`artists/${id}/top-tracks?market=us`).pipe(
      map((data) => data.tracks)
    );
  }
}
