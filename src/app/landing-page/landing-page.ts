import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

  // injection de dependance
  constructor(private router : Router){}

  onContinue():void{
    this.router.navigateByUrl("snapFaces")
  }
}
