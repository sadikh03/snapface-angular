import { Component, Input, OnInit } from '@angular/core';
import { SnapFace } from '../Models/SnapFace';
import { FaceSnap } from '../face-snap/face-snap';
import { SnapFaceService } from '../Services/SnapFace.Services';
@Component({
  selector: 'app-face-snap-list',
  imports: [
    FaceSnap
  ],
  templateUrl: './face-snap-list.html',
  styleUrl: './face-snap-list.scss'
})
export class FaceSnapList implements OnInit {
  snapFaces !: SnapFace[]

  constructor(private snapFaceServices : SnapFaceService){}

  ngOnInit(): void {
    this.snapFaces = this.snapFaceServices.getSnapFaces()
  }
}
