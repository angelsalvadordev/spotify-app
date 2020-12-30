import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() items: any[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewArtist(item: any) {
    let artistId;

    item.type === 'artist'
      ? (artistId = item.id)
      : (artistId = item.artists[0].id);

    this.router.navigate(['/artist', artistId]);
    console.log(artistId);
  }
}
