export class Hotel {
  constructor({ id, name, description, price, images }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
  }

  validate() {
    if (!this.name || !this.description || !this.price || !this.images?.length) {
      throw new Error('Invalid hotel data');
    }
  }
}