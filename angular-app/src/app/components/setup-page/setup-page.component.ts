import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Player } from '../playerClass';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss'],
})
export class SetupPageComponent implements OnInit {
  form: FormGroup;
  @Output() onStart = new EventEmitter<string>();


  playerOneNameFormControl: FormControl;
  playerTwoNameFormControl: FormControl;

  constructor() {
    this.playerOneNameFormControl = new FormControl();
    this.playerTwoNameFormControl = new FormControl();

    this.form = new FormGroup ({
      playerOneNameFormControl: this.playerOneNameFormControl,
      playerTwoNameFormControl: this.playerTwoNameFormControl
    })
   }

  ngOnInit(): void {

  }

  Start(): void {
    this.onStart.emit("start game");
  }

  getPlayerInfo(id: number): string {

    if(id == 1)
    {
      return this.playerOneNameFormControl.value;
    }

    return this.playerTwoNameFormControl.value;
  }

}
