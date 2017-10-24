
import { Product } from './Product';
import { BDD } from "./BDD";
import { Category } from './Category';
import { Vendor } from './Vendor';

export class App {

    public $item: JQuery;
    public $container: JQuery;
    public $category_container: JQuery;
    
    private categories: Category[];
    private all_products: Product[];
    private vendors: Vendor[];

    constructor(){
        this.$item = $(".item");
        this.$item.prop("draggable", true);
        this.$container = $(".container");
        this.$category_container =  $("#shop-list");

        this.categories =[];
        this.all_products=[];
        this.vendors=[];
        

        this.getAllCategories(); //category.display(this.shoplist)
        this.getAllProducts();
        this.getAllvendors();
        this.displayCategories();
        this.displayProducts();
        

        // this.displayVendors();
        
        // console.log( this.vendors );
    }

    getAllCategories(): void {
        //je cherche les categories
        let categories: {
            id: number;
            name: string
        }[] = BDD.categories;

        for (let category of categories){
            let the_category: Category = new Category(
                category.id,
                category.name
        );
            this.categories.push(the_category);
        }
    }

    getAllProducts(): void {
        
        let products: {
            id: number,
            name: string,
            categoryId: number
        }[] = BDD.products;

        for ( let product of products ){
            let the_product: Product = new Product(
                product.id,
                product.name,
                this.getCategoryById( product.categoryId )
            );
            this.all_products.push( the_product );
        }

    }

    getCategoryById( id:number ): Category{
       for( let category of this.categories ) {
            if(id == category.getId() ){
            return category;
        }
    }
    return null;
    }

    getProductById( id:number): Product{
        for (let product of this.all_products){
            if (id ==product.getId() ) {
                return product;
            }
        }
        return null;
    }
    getAllvendors(): void {
        // on recupere le vendeur de la bdd (fausse base de donnée BDD)
        let vendors:{
            id:number;
            name: string;
            products: number[]
        } []= BDD.vendors;

        //On boucle sur cette liste de vendeurs

        for (let vendor of vendors) {
            
            //On va avoir besoin d'un tableau de produits 
            let vendors_products: Product[] = [];
            //Je boucle sur le tableau d'id de vendeur.products
            for( let product_id of vendor.products){
                let the_product:Product = this.getProductById( product_id);

                //je pousse mon tableau d'objet
                vendors_products.push( the_product );
                console.log(vendors_products);
            }
             //Ici, on créer le vendeur avec sa classe et le tableau de produit créé !
             let the_vendor:Vendor = new Vendor(
                vendor.id,
                vendor.name,
                vendors_products
            )

            //j'ajoute mon vendeur a ma liste de vendeur de mon app
            this.vendors.push( the_vendor );

        }

    }

    displayCategories(){
        for ( let category of this.categories){
            category.display( this.$category_container);
        }
    }
    displayProducts(){
        for ( let product of this.all_products){
            product.display(this.$category_container);
        }
    }

}