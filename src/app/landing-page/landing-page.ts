import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [
    FormsModule  
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

  email !: string 

  // injection de dependance
  constructor(private router : Router){}

  onContinue():void{
    this.router.navigateByUrl("snapFaces")
  }

  onSubmit(form : NgForm):void{
    console.log(form.value)
  }
}
