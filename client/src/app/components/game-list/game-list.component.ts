import { Component, OnInit, HostBinding } from '@angular/core';

import { GamesService } from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes='row';

  games : any =[];

  constructor(private gamesService : GamesService) { }

  ngOnInit(){
    this.getGame();
  }

  getGame(){
    this.gamesService.getGames().subscribe(
      res =>{
        this.games = res;
      },
      err => console.log(err)
    )
  }
  
  deleteGame(id:string){
    this.gamesService.deleteGame(id).subscribe(
      res =>{
        console.log(res);
        this.getGame();
      },
      err => console.log(err)
    )

  }

}
