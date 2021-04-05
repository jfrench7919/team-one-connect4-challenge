import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Indicates that game is in setup mode.
  settingUp = true;

  startGame(){
    this.settingUp = false;
  }

  onReset(){
    this.settingUp = true;
  }

}
