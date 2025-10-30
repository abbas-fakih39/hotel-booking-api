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

//recuperer toutes les chambres avec filtres optionnels
export const getAllRooms = async (filters = {}) => {
  const hotel = await readHotel();
  let rooms = hotel.rooms;

  // Filtrer par capacité si fourni
  if (filters.capacity) {
    const capacity = parseInt(filters.capacity);
    rooms = rooms.filter(room => room.capacity === capacity);
  }

  // Filtrer par prix maximum si fourni
  if (filters.maxPrice) {
    const maxPrice = parseInt(filters.maxPrice);
    rooms = rooms.filter(room => room.price <= maxPrice);
  }

  return rooms;
};

//recuperer une chambre par id
export const getRoomById = async (id) => {
  const hotel = await readHotel();
  return hotel.rooms.find(r => r.id === parseInt(id));
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