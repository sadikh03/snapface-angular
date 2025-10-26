import { Component, Input } from '@angular/core';
import { SnapFace } from '../Models/SnapFace';
import { CurrencyPipe, DatePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { SnapFaceService } from '../Services/SnapFace.Services';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [
    NgStyle , NgClass , TitleCasePipe , DatePipe , CurrencyPipe
  ],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.scss'
})
export class FaceSnap {

  constructor(private snapFaceService : SnapFaceService){}

  @Input() FaceSnap !: SnapFace
  message !: string
  hasSnapped !: boolean

  ngOnInit(): void {
    this.message = ""
    this.hasSnapped = false
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
    this.snapFaceService.getSnapFacebyId(this.FaceSnap.id , 'snap')
    this.hasSnapped = true
  }

  UnSnap():void {
    this.snapFaceService.getSnapFacebyId(this.FaceSnap.id , 'unsnap')
    this.message = ""
    this.hasSnapped = false
  }
}
