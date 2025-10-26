import { Component } from '@angular/core';
import { FaceSnapList } from './face-snap-list/face-snap-list';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  imports: [
    FaceSnapList , Header
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
queueMicrotask