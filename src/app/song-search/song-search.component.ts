import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  songResult: Song[];
  searchText: string;

  constructor(private songService: SongService) { }

  searchByTitle(title: string){
    this.songService.findSongsByTitle(title)
    .subscribe((response)=> this.songResult = response);
  }

  ngOnInit() {
  }

}
