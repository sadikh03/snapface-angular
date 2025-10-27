import { Injectable } from '@angular/core';
import { SnapFace } from '../Models/SnapFace';
import { snapType } from '../Models/Snap-type.type';

@Injectable({
  providedIn: 'root'
})
export class SnapFaceService{
    private snaofaces : SnapFace[] = [
        new SnapFace(
            "mbeurou Baye",
            "Premiere snap",
            0,
            "https://th.bing.com/th/id/OIP.SYxIT2qO3H0mXIfbXJ8vkAHaE8?w=254&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3",
            new Date(),
            10000.10
        ) ,
        new SnapFace(
            "Sadikh",
            "Premiere snap",
            0,
            "https://th.bing.com/th/id/OIP.SYxIT2qO3H0mXIfbXJ8vkAHaE8?w=254&h=180&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3",
            new Date(),
            140000.100
        ).withLocation("a google")
    ]

    getSnapFaces() : SnapFace[]{
        return [...this.snaofaces]
    }

    getSnapFaceById(id : string) : SnapFace {
        const snapface = this.snaofaces.find(SnapFace => SnapFace.id === id)
        if(!snapface)
            throw new Error("Snap face undefied")

        return snapface
    }

    SnapOrUnsnapASnapace(id : string , typeSnap : snapType) : void {
        const snapface = this.getSnapFaceById(id)
        snapface.actionSnapUnSnap(typeSnap)
    }
}