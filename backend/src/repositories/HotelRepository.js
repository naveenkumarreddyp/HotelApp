import { HotelModel } from "../database/models/HotelModel.js";
import { Hotel } from "../entities/Hotel.js";

export class HotelRepository {
  async findAll() {
    const hotels = await HotelModel.find();
    return hotels.map(
      (hotel) =>
        new Hotel({
          id: hotel._id.toString(),
          name: hotel.name,
          description: hotel.description,
          price: hotel.price,
          images: hotel.images,
        })
    );
  }

  async findById(id) {
    const hotel = await HotelModel.findById(id);
    return hotel
      ? new Hotel({
          id: hotel._id.toString(),
          name: hotel.name,
          description: hotel.description,
          price: hotel.price,
          images: hotel.images,
        })
      : null;
  }

  async seedHotels() {
    const count = await HotelModel.countDocuments();
    if (count === 0) {
      const hotels = [
        {
          name: "Luxury Inn",
          description: "A 5-star luxury hotel with amazing amenities.",
          price: 200,
          images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://media.istockphoto.com/id/172679523/photo/resort.webp?a=1&s=612x612&w=0&k=20&c=FrbOyi6tjKG6-g9_kEGaqopYgclyfLAwgl1sZ7WR8GQ=",
            "https://media.istockphoto.com/id/186636823/photo/hotel-pool-in-night.webp?a=1&s=612x612&w=0&k=20&c=h5kgdM631Ul0yWy1meqpwPIM1mgX9u4v6oAJnP__Ugs=",
          ],
        },
        {
          name: "Budget Inn",
          description: "Affordable accommodation for budget travelers.",
          price: 50,
          images: [
            "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
            "https://images.unsplash.com/photo-1534612899740-55c821a90129?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D",
            "https://unsplash.com/photos/a-woman-swimming-in-a-pool-with-palm-trees-in-the-background-EenlxNA7yTs",
          ],
        },
        {
          name: "Ibis",
          description: "A 5-star luxury hotel with amazing amenities.",
          price: 150,
          images: [
            "https://images.unsplash.com/photo-1568229988520-4bc288da81f7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1568084616148-07e09fcf9b5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
            "https://images.unsplash.com/photo-1712026258065-fa5d5f58584e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
          ],
        },
        {
          name: "Grand Inn",
          description: "A 5-star luxury hotel with amazing amenities.",
          price: 200,
          images: [
            "https://images.unsplash.com/photo-1549875648-357fef68fec7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://media.istockphoto.com/id/1488604450/photo/miami-and-fort-lauderdale-aerial-coastline.webp?a=1&s=612x612&w=0&k=20&c=nsIcuzv-RTDdECG5aVB7lmn_7E9vFaaNarrYcO3ZjoI=",
            "https://images.unsplash.com/photo-1616214983310-5f88a49bfeae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
          ],
        },
        {
          name: "Royal Inn",
          description: "A 4-star luxury hotel with amazing amenities.",
          price: 100,
          images: [
            "https://images.unsplash.com/photo-1580438886205-b9bb1bb06e3f?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1716467575126-8adf9d642940?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
            "https://images.unsplash.com/photo-1655438444019-21a41d67301c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMyfHx8ZW58MHx8fHx8",
          ],
        },
      ];

      await HotelModel.insertMany(hotels);
    }
  }
}
