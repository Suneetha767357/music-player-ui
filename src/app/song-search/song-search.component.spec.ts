import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSearchComponent } from './song-search.component';
import { SongService } from '../song.service';
import { of } from 'rxjs';
import { Song } from '../song';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { expressionType } from '@angular/compiler/src/output/output_ast';

describe('SongSearchComponent', () => {
  let component: SongSearchComponent;
  let fixture: ComponentFixture<SongSearchComponent>;

  const fakeSongs = [
    new Song("1","Africa","Toto",274),
    new Song("2","Africa","Weezer",243)
  ];


  const songServiceSpy = jasmine.createSpyObj('songService', ['findSongsByTitle']);
  const findSongsByTitleStub = songServiceSpy.findSongsByTitle.and.returnValue(of(fakeSongs));

  beforeEach(async(() => {

    // let component: SongSearchComponent;
     TestBed.configureTestingModule({
       imports:[AppModule],
       providers:[
        {
          provide: SongService , useValue:songServiceSpy
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a search box and submit button for searching title',()=>{
    fixture.detectChanges();
    const searchBox = fixture.debugElement.nativeElement.querySelector('input');
    const searchButton = fixture.debugElement.nativeElement.querySelector('button');
    expect(searchBox).toBeTruthy();
    expect(searchButton).toBeTruthy();

  })


  it('should call findSongsByTitle when serach button is clicked, passing it the typed title',()=>{
    fixture.detectChanges();
    const searchBox = fixture.debugElement.nativeElement.querySelector('input');
    const searchButton = fixture.debugElement.nativeElement.querySelector('button');

    searchButton.click();
    expect(songServiceSpy.findSongsByTitle).toHaveBeenCalledTimes(1);
    expect(songServiceSpy.findSongsByTitle).toHaveBeenCalledWith(component.searchText);

  });

  it('should display songs from the search result', ()=> {
    component.songResult = fakeSongs;
    fixture.detectChanges();
    const songResults = fixture.debugElement.nativeElement.querySelectorAll('li');
    expect(songResults[0].textContent).toEqual("Africa - Toto");
    expect(songResults[1].textContent).toEqual("Africa - Weezer");


  });
});

