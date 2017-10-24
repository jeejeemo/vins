import { Model } from './Model';
import { Product } from "./Product";

export class Vendor extends Model{
   
    protected $dom:JQuery;
    private name: string;
    private products: Product[];

    constructor(id: number, name: string, products: Product[]){
        super(id);
        this.name = name;
        this.products= products;

    }

    removeProductById(id: number){
        for( let key in this.products ){
            let product: Product = this.products[key];
            if( product.getId()== id ){
                let nkey:number =parseInt( key );
                this.products.slice( nkey, 1);
                return;
            }
        }

    }

    public display($parent: JQuery): void {
        
    }
}