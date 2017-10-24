var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("Model", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Model;
    return {
        setters: [],
        execute: function () {
            Model = (function () {
                function Model(id) {
                    this.id = id;
                }
                Model.prototype.getId = function () {
                    return this.id;
                };
                return Model;
            }());
            exports_1("Model", Model);
        }
    };
});
System.register("Category", ["Model"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Model_1, Category;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            Category = (function (_super) {
                __extends(Category, _super);
                function Category(id, name) {
                    var _this = _super.call(this, id) || this;
                    _this.name = name;
                    return _this;
                }
                Category.prototype.getName = function () {
                    return this.name;
                };
                Category.prototype.display = function ($parent) {
                    var div = "<div class = 'container " + this.name + "' 'data-category=" + this.id + "'></div>";
                    this.$dom = $(div);
                    $parent.append(this.$dom);
                };
                return Category;
            }(Model_1.Model));
            exports_2("Category", Category);
        }
    };
});
System.register("Product", ["Model"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Model_2, Product;
    return {
        setters: [
            function (Model_2_1) {
                Model_2 = Model_2_1;
            }
        ],
        execute: function () {
            Product = (function (_super) {
                __extends(Product, _super);
                function Product(id, name, category) {
                    var _this = _super.call(this, id) || this;
                    _this.name = name;
                    _this.category = category;
                    return _this;
                }
                Product.prototype.display = function (parent) {
                    var category_name = this.category.getName();
                    var id = category_name + this.getId();
                    var data_id = this.id;
                    var div = "<div id='" + id + "' class='item " + category_name + "'></div>";
                    this.$dom = $(div);
                    parent.append(this.$dom);
                };
                return Product;
            }(Model_2.Model));
            exports_3("Product", Product);
        }
    };
});
System.register("BDD", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var BDD;
    return {
        setters: [],
        execute: function () {
            exports_4("BDD", BDD = {
                categories: [
                    {
                        id: 1,
                        name: "rouge"
                    },
                    {
                        id: 2,
                        name: "rose"
                    },
                    {
                        id: 3,
                        name: "blanc"
                    },
                ],
                products: [
                    {
                        id: 1,
                        name: "bordeaux",
                        categoryId: 1
                    },
                    {
                        id: 2,
                        name: "rivesalte",
                        categoryId: 3
                    },
                    {
                        id: 3,
                        name: "champagne",
                        categoryId: 1
                    }
                ],
                vendors: [
                    {
                        id: 1,
                        name: "Paul",
                        products: [1, 2]
                    },
                    {
                        id: 2,
                        name: "Jeremy",
                        products: [3]
                    },
                    {
                        id: 3,
                        name: "Stephane",
                        products: [2]
                    }
                ]
            });
        }
    };
});
System.register("Vendor", ["Model"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Model_3, Vendor;
    return {
        setters: [
            function (Model_3_1) {
                Model_3 = Model_3_1;
            }
        ],
        execute: function () {
            Vendor = (function (_super) {
                __extends(Vendor, _super);
                function Vendor(id, name, products) {
                    var _this = _super.call(this, id) || this;
                    _this.name = name;
                    _this.products = products;
                    return _this;
                }
                Vendor.prototype.removeProductById = function (id) {
                    for (var key in this.products) {
                        var product = this.products[key];
                        if (product.getId() == id) {
                            var nkey = parseInt(key);
                            this.products.slice(nkey, 1);
                            return;
                        }
                    }
                };
                Vendor.prototype.display = function ($parent) {
                };
                return Vendor;
            }(Model_3.Model));
            exports_5("Vendor", Vendor);
        }
    };
});
System.register("App", ["Product", "BDD", "Category", "Vendor"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var Product_1, BDD_1, Category_1, Vendor_1, App;
    return {
        setters: [
            function (Product_1_1) {
                Product_1 = Product_1_1;
            },
            function (BDD_1_1) {
                BDD_1 = BDD_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Vendor_1_1) {
                Vendor_1 = Vendor_1_1;
            }
        ],
        execute: function () {
            App = (function () {
                function App() {
                    this.$item = $(".item");
                    this.$item.prop("draggable", true);
                    this.$container = $(".container");
                    this.$category_container = $("#shop-list");
                    this.categories = [];
                    this.all_products = [];
                    this.vendors = [];
                    this.getAllCategories();
                    this.getAllProducts();
                    this.getAllvendors();
                    this.displayCategories();
                    this.displayProducts();
                }
                App.prototype.getAllCategories = function () {
                    var categories = BDD_1.BDD.categories;
                    for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                        var category = categories_1[_i];
                        var the_category = new Category_1.Category(category.id, category.name);
                        this.categories.push(the_category);
                    }
                };
                App.prototype.getAllProducts = function () {
                    var products = BDD_1.BDD.products;
                    for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                        var product = products_1[_i];
                        var the_product = new Product_1.Product(product.id, product.name, this.getCategoryById(product.categoryId));
                        this.all_products.push(the_product);
                    }
                };
                App.prototype.getCategoryById = function (id) {
                    for (var _i = 0, _a = this.categories; _i < _a.length; _i++) {
                        var category = _a[_i];
                        if (id == category.getId()) {
                            return category;
                        }
                    }
                    return null;
                };
                App.prototype.getProductById = function (id) {
                    for (var _i = 0, _a = this.all_products; _i < _a.length; _i++) {
                        var product = _a[_i];
                        if (id == product.getId()) {
                            return product;
                        }
                    }
                    return null;
                };
                App.prototype.getAllvendors = function () {
                    var vendors = BDD_1.BDD.vendors;
                    for (var _i = 0, vendors_1 = vendors; _i < vendors_1.length; _i++) {
                        var vendor = vendors_1[_i];
                        var vendors_products = [];
                        for (var _a = 0, _b = vendor.products; _a < _b.length; _a++) {
                            var product_id = _b[_a];
                            var the_product = this.getProductById(product_id);
                            vendors_products.push(the_product);
                            console.log(vendors_products);
                        }
                        var the_vendor = new Vendor_1.Vendor(vendor.id, vendor.name, vendors_products);
                        this.vendors.push(the_vendor);
                    }
                };
                App.prototype.displayCategories = function () {
                    for (var _i = 0, _a = this.categories; _i < _a.length; _i++) {
                        var category = _a[_i];
                        category.display(this.$category_container);
                    }
                };
                App.prototype.displayProducts = function () {
                    for (var _i = 0, _a = this.all_products; _i < _a.length; _i++) {
                        var product = _a[_i];
                        product.display(this.$category_container);
                    }
                };
                return App;
            }());
            exports_6("App", App);
        }
    };
});
System.register("main", ["App"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var App_1, app;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            app.$container.on("dragover", function (event) {
                event.preventDefault();
            });
            app.$item.on("dragstart", function (event) {
                var dragEvent = event.originalEvent;
                dragEvent.dataTransfer.setData("id", $(this).attr("id"));
            });
            app.$container.on("drop", function (event) {
                var dragEvent = event.originalEvent;
                var id = dragEvent.dataTransfer.getData("id");
                var $element = $("#" + id);
                var containerId = $(this).attr("id");
                if ($(this).hasClass("vendor")) {
                    $(this).append($element);
                }
                else if ($element.hasClass(containerId)) {
                    $(this).append($element);
                }
            });
        }
    };
});
//# sourceMappingURL=main.js.map