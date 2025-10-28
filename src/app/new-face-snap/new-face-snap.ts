import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { SnapFace } from '../Models/SnapFace';
import { AsyncPipe, DatePipe, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-new-face-snap',
  imports: [
    ReactiveFormsModule, UpperCasePipe,
    NgIf , AsyncPipe , DatePipe
],
  templateUrl: './new-face-snap.html',
  styleUrl: './new-face-snap.scss'
})
export class NewFaceSnap implements OnInit {
  // Formbuilder une service mise a notre disposition pour la creation des forms reactives
  constructor(private formBuilder : FormBuilder){}

  // formGroup pour les forms reactives
  faceSnapForm !: FormGroup

  createFaceSnap$ !: Observable<SnapFace>

  ngOnInit(): void {
    // initialisation du formulaire avec l'utilisation de la methode group lui passant un object
    this.faceSnapForm = this.formBuilder.group({
      // les clés de l'objet correspondent aux noms des champs
      // les valeurs de l'objet correspondent à la configuration de chaque champ – pour l'instant
      // , vous passez uniquement null  pour dire que la valeur par défaut de ces champs est  null
      title : [null],
      description : [null],
      imageUrl : [null],
      location : [null]
    })

    // valueChanges  , un Observable qui émet la valeur du formulaire à chaque modification :
    this.createFaceSnap$ = this.faceSnapForm.valueChanges.pipe(
      // utilisation pour completer les attributs d'un snapFace pour que l'object a la sortir le soit
      map(formValue =>({
        ...formValue,
        id : 0 ,
        snaps : 0 ,
        createAt : new Date()
      }))
    )
  }

  onSubmit() : void {
    console.log(this.faceSnapForm.value)
  }
}
