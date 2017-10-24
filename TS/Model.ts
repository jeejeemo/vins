

export abstract class Model {
    protected id: number;
     
    constructor( id:number ){
         this.id = id;
     }

     getId(): Number {
            return this.id;
     }

     //Important
     
     protected abstract $dom:JQuery;
     abstract display( $parent: JQuery): void;

     
}