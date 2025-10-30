import { snapType } from "./Snap-type.type";

export class SnapFace {

    location ?: string
    id !: number

    constructor(
        id : number ,
        public title : string,
        public description : string ,
        public snaps : number ,
        public imageUrl : string ,
        public createdDate : Date,
        public price ?: number 
    ){
        this.id = id
    }

    addSnap() : void {
        this.snaps++
    }

    removeSnap() : void{
        this.snaps--
    }
    
    setLocation(location : string) : void {
        this.location = location
    }

    withLocation(location : string) : SnapFace {
        this.setLocation(location)
        return this
    }

    actionSnapUnSnap(type : snapType) : void {
        if(type === 'snap'){
            this.addSnap()
        }else if(type === 'unsnap'){
            this.removeSnap()
        }
    }
}