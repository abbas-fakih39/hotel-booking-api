import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//lire le fichier json
const readJSON = async (filename) => {
  const filePath = path.join(__dirname, '../data', filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

//recuperer tous les clients
export const getAllClients = async () => {
  const data = await readJSON('clients.json');
  return data.clients;
};

//recuperer un client par son id
export const getClientById = async (id) => {
  const data = await readJSON('clients.json');
  return data.clients.find(c => c.id === parseInt(id));
};

//ajouter un nouveau client
export const addClient = async (clientData) => {
  return {
    success: true,
    message: 'Client ajouté avec succès',
    data: {
      id: Date.now(),
      ...clientData
    }
  };
};

//mettre a jour un client existant
export const updateClient = async (id, clientData) => {
  return {
    success: true,
    message: `Client ${id} modifié avec succès`,
    data: {
      id: parseInt(id),
      ...clientData
    }
  };
};

//reserver une chambre pour un client
export const bookRoomForClient = async (clientId, roomId, bookingData) => {
  // Vérifier si le client existe
  const client = await getClientById(clientId);
  if (!client) {
    throw new Error('Client non trouvé');
  }

//verifier si la chambre existe
  const hotelData = await readJSON('hotel.json');
  const room = hotelData.rooms.find(r => r.id === parseInt(roomId));
  if (!room) {
    throw new Error('Chambre non trouvée');
  }

  return {
    success: true,
    message: `Chambre ${room.name} (${roomId}) réservée pour ${client.name}`,
    data: {
      bookingId: Date.now(),
      clientId: parseInt(clientId),
      clientName: client.name,
      roomId: parseInt(roomId),
      roomName: room.name,
      roomPrice: room.price,
      ...bookingData
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