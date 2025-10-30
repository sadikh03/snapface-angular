import { Component, Input } from '@angular/core';
import { SnapFace } from '../../../core/Models/SnapFace';
import {TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    TitleCasePipe ,
  ],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.scss'
})
export class FaceSnap {

  constructor(private router : Router){}

  @Input() FaceSnap !: SnapFace

  onViewFaceSnap():void{
    this.router.navigateByUrl(`snapFaces/${this.FaceSnap.id}`)
  }
}
