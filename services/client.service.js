import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//lire le fichier json
const readHotel = async () => {
  const filePath = path.join(__dirname, '../data/hotel.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

//recuperer les informations de l'hotel
export const getHotelInfo = async () => {
  const hotel = await readHotel();
  return {
    name: hotel.name,
    location: hotel.location,
    contact: hotel.contact,
    facilities: hotel.facilities
  };
};

//recuperer toutes les chambres
export const getAllRooms = async () => {
  const hotel = await readHotel();
  return hotel.rooms;
};

//recuperer une chambre par id
export const getRoomById = async (id) => {
  const hotel = await readHotel();
  return hotel.rooms.find(r => r.id === parseInt(id));
};

//filtre les chambres par capacite
export const getRoomsByCapacity = async (capacity) => {
  const hotel = await readHotel();
  return hotel.rooms.filter(r => r.capacity >= parseInt(capacity));
};

//filtre les chambres par prix maximum
export const getRoomsByMaxPrice = async (maxPrice) => {
  const hotel = await readHotel();
  return hotel.rooms.filter(r => r.price <= parseInt(maxPrice));
};

//reserver une chambre
export const bookRoom = async (roomId, clientData) => {
  // Vérifier si la chambre existe
  const room = await getRoomById(roomId);
  if (!room) {
    throw new Error('Chambre non trouvée');
  }

  return {
    success: true,
    message: `Chambre ${room.name} réservée avec succès`,
    data: {
      bookingId: Date.now(),
      roomId: parseInt(roomId),
      roomName: room.name,
      roomPrice: room.price,
      client: clientData,
      bookingDate: new Date().toISOString()
    }
  };
};

//annuler une reservation
export const cancelBooking = async (bookingId) => {
  return {
    success: true,
    message: `Réservation ${bookingId} annulée avec succès`
  };
};