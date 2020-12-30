import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newSongs: any[] = [];
  loading = true;
  showError = false;
  errorMessage = '';

  constructor(private spotify: SpotifyService) {
    this.spotify.getNewReleases().subscribe(
      (data: any) => {
        this.newSongs = data;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.showError = true;
        this.errorMessage = err.error.error.message;
      }
    );
  }

  ngOnInit(): void {}
}
