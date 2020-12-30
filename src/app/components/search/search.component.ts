import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  artists: any[] = [];
  loading = false;
  searchTimer = null;

  constructor(private spotify: SpotifyService) {}

  ngOnInit(): void {}

  search(term: string): void {
    clearTimeout(this.searchTimer);
    if (!term.length) return;

    this.searchTimer = setTimeout(() => {
      this.loading = true;
      this.spotify.getArtists(term).subscribe((data: any) => {
        this.artists = data;
        this.loading = false;
      });
    }, 900);
  }
}
