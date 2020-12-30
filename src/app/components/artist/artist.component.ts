import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  artist: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.getArtist(params.id);
      this.getTopTracks(params.id);
    });
  }

  ngOnInit(): void {}

  getArtist(id: string): void {
    this.loading = true;
    this.spotify.getArtist(id).subscribe((artist) => {
      this.artist = artist;
    });
  }

  getTopTracks(id: string): void {
    this.spotify.getTopTracks(id).subscribe((topTracks) => {
      console.log(topTracks);
      this.topTracks = topTracks;
      this.loading = false;
    });
  }
}
