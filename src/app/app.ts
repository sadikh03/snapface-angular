import { Component, OnInit } from '@angular/core';
import {Header} from './core/component/header/header';
import { RouterOutlet } from '@angular/router';
import {  delay,  of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    Header , RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  redTrainsCalled = 0
  yellowTrainsCalled = 0
  // le type de l'observable doit etre le type de l'emission final
  // interval$ !: Observable<string>
  // nombre !: any
  ngOnInit(): void {
    // // les variables d'observable se termine par $ par convention
    // // pipe pour manipuler les observables
    // this.interval$ = interval(1000).pipe(
    //   // L'operateur filter qui prend une condition passe si c vrai 
    //   filter(value => value % 3 === 0)  ,
    //   // l'operateur map pour transformer les emissions (operateur de bas niveau)
    //   map(value => value % 2 === 0 ? 
    //     `Je suis ${value} et je suis pair` :
    //     `Je suis ${value} et je suis impair`
    //   ) , 
    //   // L'effet secndaire tap(un effet secondaire est une fonction qui utilise les emissions sans les modifier)
    //   tap(text => this.logger(text))
    //)

    // interval$.subscribe(value => console.log(value))

    // interval(500).pipe(
    //   take(10),
    //   map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
    //   tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
    //   concatMap(color => this.getTrainObservable$(color)),
    //   tap(train => console.log(`Train %c${train.color} ${train.trainIndex} arrivé !`, `font-weight: bold; color: ${this.translateColor(train.color)}`))
    // ).subscribe()
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain = color === 'rouge'
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++
    const trainIndex = isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled
    console.log(`Train %c${color} ${trainIndex} appelé !`, `text-decoration: underline; color: ${this.translateColor(color)}`)
    return of({ color, trainIndex }).pipe(
      delay(isRedTrain ? 5000 : 6000)
    )
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow'
  }

}
queueMicrotask