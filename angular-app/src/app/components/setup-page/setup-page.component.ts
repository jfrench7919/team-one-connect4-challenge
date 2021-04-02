import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss'],
})
export class SetupPageComponent implements OnInit {
  form: FormGroup;


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

  }

}
