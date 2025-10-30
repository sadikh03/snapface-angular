import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SnapFace } from '../../../core/Models/SnapFace';
import { FaceSnap } from '../face-snap/face-snap';
import { SnapFaceService } from '../../../core/Services/SnapFace.Services';
import { interval, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-face-snap-list',
  imports: [
    FaceSnap , AsyncPipe
  ],
  templateUrl: './face-snap-list.html',
  styleUrl: './face-snap-list.scss'
})
export class FaceSnapList implements OnInit , OnDestroy{
  dsetroy$ !: Subject<boolean>
  // snapFaces !: SnapFace[]
  snapFaces$ !: Observable<SnapFace[]>

  constructor(private snapFaceServices : SnapFaceService){}

  ngOnInit(): void {

    this.dsetroy$ = new Subject<boolean>()

    // this.snapFaces = this.snapFaceServices.getSnapFaces()

    this.snapFaces$ = this.snapFaceServices.getSnapFaces()

    interval(1000).pipe(
      takeUntil(this.dsetroy$) ,
      tap(console.log)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.dsetroy$.next(true)
  }
}
