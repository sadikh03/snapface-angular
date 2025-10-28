import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SnapFace } from '../Models/SnapFace';
import { FaceSnap } from '../face-snap/face-snap';
import { SnapFaceService } from '../Services/SnapFace.Services';
import { interval, Subject, takeUntil, tap } from 'rxjs';
@Component({
  selector: 'app-face-snap-list',
  imports: [
    FaceSnap
  ],
  templateUrl: './face-snap-list.html',
  styleUrl: './face-snap-list.scss'
})
export class FaceSnapList implements OnInit , OnDestroy{
  dsetroy$ !: Subject<boolean>
  snapFaces !: SnapFace[]

  constructor(private snapFaceServices : SnapFaceService){}

  ngOnInit(): void {

    this.dsetroy$ = new Subject<boolean>()

    this.snapFaces = this.snapFaceServices.getSnapFaces()

    interval(1000).pipe(
      takeUntil(this.dsetroy$) ,
      tap(console.log)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.dsetroy$.next(true)
  }
}
