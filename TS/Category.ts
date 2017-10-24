import { Model } from './Model';

export class Category extends Model{
    
    $dom: JQuery;
  
        private name: string;
    
        constructor(id:number, name:string){
            super(id);
            this.name = name;
        }
    
        getName(): string {
            return this.name;
        }
        display($parent: JQuery): void {
           let div: string = "<div class = 'container "+ this.name +"' 'data-category="+this.id+"'></div>";
           this.$dom = $ ( div );
           $parent.append( this.$dom );
        }
    
    
    }    
