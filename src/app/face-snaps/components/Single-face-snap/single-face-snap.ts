import { Component, Input } from '@angular/core';
import { SnapFace } from '../../../core/Models/SnapFace';
import { AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgIf, NgStyle, TitleCasePipe } from '@angular/common';
import { SnapFaceService } from '../../../core/Services/SnapFace.Services';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle, NgClass, TitleCasePipe, DatePipe, CurrencyPipe,
    RouterLink , NgIf , AsyncPipe
  ],
  templateUrl: './single-face-snap.html',
  styleUrl: './single-face-snap.scss'
})
export class SingleFaceSnap {

  constructor(
    private snapFaceService : SnapFaceService,
    private activeRouter :ActivatedRoute
  ){}

  FaceSnap !: SnapFace
  FaceSnap$ !:Observable <SnapFace>
  message !: string
  hasSnapped !: boolean
  buttonText !: string

  ngOnInit(): void {
    this.initializerAttribut()
    this.getActiveSnapFace()
  }

  OnAddSnap(faceSnapId : number) : void {
    if(this.hasSnapped){
      this.UnSnap(faceSnapId)
    }else{
      this.Snap(faceSnapId)
    }
  }

  Snap(faceSnapId : number):void{
    this.FaceSnap$ = this.snapFaceService.SnapOrUnsnapASnapace(faceSnapId , 'unsnap').pipe(
      tap(() => {
        this.hasSnapped = true
        this.buttonText ="oups ! unsnap"
      })
    )
  }

  UnSnap(faceSnapId : number):void {
    this.FaceSnap$ = this.snapFaceService.SnapOrUnsnapASnapace(faceSnapId , 'unsnap').pipe(
      tap(() => {
        this.hasSnapped = false
        this.buttonText = "snap"
      })
    )
  }

  private initializerAttribut(){
    this.buttonText = "snap"
    this.hasSnapped = false
  }

  getActiveSnapFace(){
    // recuperation de l'id depuis l'URL
    const activeRouterParamId = this.activeRouter.snapshot.params['id']
    // recuperation du SnapFace concerner 
    this.FaceSnap$ = this.snapFaceService.getSnapFaceById(activeRouterParamId)
  }
}
