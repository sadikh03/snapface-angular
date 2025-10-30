import { Injectable } from '@angular/core';
import { SnapFace } from '../Models/SnapFace';
import { snapType } from '../Models/Snap-type.type';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnapFaceService{

    constructor(private http : HttpClient){}

    getSnapFaces() : Observable<SnapFace[]>{
        // return [...this.snaofaces]
        //get return un observable qui emet si reponse est complete ou y'a une erreur
        return this.http.get<SnapFace[]>('http://localhost:3000/facesnaps')
    }

    getSnapFaceById(id : number) : Observable<SnapFace> {
        return this.http.get<SnapFace>(`http://localhost:3000/facesnaps/${id}`)
    }

    SnapOrUnsnapASnapace(id : number , typeSnap : snapType) : Observable<SnapFace> {
        return this.http.get<SnapFace>(`http://localhost:3000/facesnaps/${id}`).pipe(
            map(faceSnap => ({
                ...faceSnap ,
                snaps : faceSnap.snaps + (typeSnap === 'snap' ? 1 : -1)
            })),
            switchMap(updateFacesnap => this.http.put<SnapFace>(
                // url comme 1ere parametre
                `http://localhost:3000/facesnaps/${id}` ,
                // le corps comme 2eme param
                updateFacesnap)
            )
        )
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<SnapFace> {
    return this.getSnapFaces().pipe(
        // trier par les ID acsc
         map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
        //  recuperer le dernier element 
         map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
        //  generer le snapface
         map(previousFacesnap => ({
            ...formValue,
            snaps: 0,
            createdDate: new Date(),
            id: previousFacesnap.id + 1
        })),
        // envoie de la requete post
        switchMap(newFacesnap => this.http.post<SnapFace>(
            'http://localhost:3000/facesnaps',
            newFacesnap)
        )
    );
  }
}