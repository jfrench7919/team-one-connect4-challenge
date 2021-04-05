import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { TurnServiceService } from 'src/app/services/turn-service.service';
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

  constructor(
    public turnService: TurnServiceService
  ) {
    this.playerOneNameFormControl = new FormControl( turnService.Player1Name ? turnService.Player1Name : 'Player 1', Validators.required);
    this.playerTwoNameFormControl = new FormControl( turnService.Player2Name ? turnService.Player2Name : 'Player 2', Validators.required);

    this.form = new FormGroup ({
      playerOneNameFormControl: this.playerOneNameFormControl,
      playerTwoNameFormControl: this.playerTwoNameFormControl
    })
  }

  ngOnInit(): void {

  }

  Start(): void {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {window.alert("Please enter a name for each player"); return}

    this.turnService.Player1Name = this.playerOneNameFormControl.value;
    this.turnService.Player2Name = this.playerTwoNameFormControl.value;
    this.onStart.emit("start game");
  }

}
