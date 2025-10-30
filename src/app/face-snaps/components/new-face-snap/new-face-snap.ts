import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { SnapFace } from '../../../core/Models/SnapFace';
import { AsyncPipe, DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { SnapFaceService } from '../../../core/Services/SnapFace.Services';
import { Router } from '@angular/router';

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
  constructor(private formBuilder : FormBuilder,
    private snapFaceService : SnapFaceService ,
    private router : Router
  ){}

  // formGroup pour les forms reactives
  faceSnapForm !: FormGroup
  // expression reguliere
  urlRegex!: RegExp

  createFaceSnap$ !: Observable<SnapFace>

  ngOnInit(): void {
    // format URL attendue
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    // initialisation du formulaire avec l'utilisation de la methode group lui passant un object
    this.faceSnapForm = this.formBuilder.group({
      // les clés de l'objet correspondent aux noms des champs
      // les valeurs de l'objet correspondent à la configuration de chaque champ – pour l'instant
      // , vous passez uniquement null  pour dire que la valeur par défaut de ces champs est  null
      title : [null , [Validators.required]],
      // [Validators.required] indique que les champs sont requise pour la validation du formulaire
      description : [null , [Validators.required]],
      // Validators.pattern(this.urlRegex) verifie que l'url passer respecte le format URLregExp
      imageUrl : [null , [Validators.required , Validators.pattern(this.urlRegex)]],
      location : [null]
    }, 
    {
      // cet object change le rythme d'emission on emet quand on chage de input
      updateOn: 'blur'
    })

    // valueChanges  , un Observable qui émet la valeur du formulaire à chaque modification :
    this.createFaceSnap$ = this.faceSnapForm.valueChanges.pipe(
      // utilisation pour completer les attributs d'un snapFace pour que l'object a la sortir le soit
      map(formValue =>({
        ...formValue,
        id : 0 ,
        snaps : 0 ,
        createdDate : new Date()
      }))
    )
  }

  onSubmit() : void {
    // Attention à l'asynchrone ! Si une action doit être effectuée après une requête,
    //  utilisez des opérateurs comme  tap()  dans le  pipe  de la requête ;
    this.snapFaceService.addFaceSnap(this.faceSnapForm.value).pipe(
      tap(() => this.router.navigateByUrl('/snapFaces'))
    ).subscribe()
  }
}
