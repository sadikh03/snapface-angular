import { Component, Input } from '@angular/core';
import { SnapFace } from '../Models/SnapFace';
import { CurrencyPipe, DatePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { SnapFaceService } from '../Services/SnapFace.Services';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [
    NgStyle, NgClass, TitleCasePipe, DatePipe, CurrencyPipe,
    RouterLink
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
  message !: string
  hasSnapped !: boolean

  ngOnInit(): void {
    this.initializerAttribut()
    this.getActiveSnapFace()
  }

  OnAddSnap() : void {
    if(this.hasSnapped){
      this.UnSnap()
    }else{
      this.Snap()
    }
  }

  Snap():void{
    this.message ="oups !"
    this.snapFaceService.SnapOrUnsnapASnapace(this.FaceSnap.id , 'snap')
    this.hasSnapped = true
  }

  UnSnap():void {
    this.snapFaceService.SnapOrUnsnapASnapace(this.FaceSnap.id , 'unsnap')
    this.message = ""
    this.hasSnapped = false
  }

  private initializerAttribut(){
    this.message = ""
    this.hasSnapped = false
  }

  getActiveSnapFace(){
     // recuperation de l'id depuis l'URL
    const activeRouterParamId = this.activeRouter.snapshot.params['id']
    // recuperation du SnapFace concerner 
    this.FaceSnap = this.snapFaceService.getSnapFaceById(activeRouterParamId)
  }
}
