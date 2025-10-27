import { Routes } from '@angular/router';
import { FaceSnapList } from './face-snap-list/face-snap-list';
import { LandingPage } from './landing-page/landing-page';
import { SingleFaceSnap } from './Single-face-snap/single-face-snap';

export const routes: Routes = [
    // Les routes et leur components a appeler 
    {path : "snapFaces" , component : FaceSnapList} ,
    {path : "" , component : LandingPage} , 
    {path : "snapFaces/:id" , component : SingleFaceSnap}
];
