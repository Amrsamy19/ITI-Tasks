class Product {
  constructor(brand, ram, color) {
    this.brand = brand;
    this.ram = ram;
    this.color = color;
    this.date = {};
  }

  clone(updates = {}) {
    return new Product(
      updates.brand || this.brand,
      updates.ram || this.ram,
      updates.color || this.color,
      updates.date || this.date
    );
  }
}

const originalProduct = new Product("Dell", "8GB", "Black");

const gamingProduct = originalProduct.clone({ ram: "16GB", color: "Silver" });

const officeProduct = originalProduct.clone({ ram: "12GB" });

console.log("Original Product:", originalProduct);
console.log("Gaming Product:", gamingProduct);
console.log("Office Product:", officeProduct);
