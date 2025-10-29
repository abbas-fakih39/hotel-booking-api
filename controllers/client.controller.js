import * as clientService from '../services/client.service.js';

//gerer les erreurs
const handleError = (res, error, message) => {
  res.status(500).json({
    success: false,
    message,
    error: error.message
  });
};

// ==================== INFORMATIONS HÔTEL ====================

//recuperer les informations de l'hotel
export const getHotelInfo = async (req, res) => {
  try {
    const hotelInfo = await clientService.getHotelInfo();
    res.json({ 
      success: true, 
      data: hotelInfo 
    });
  } catch (error) {
    handleError(res, error, 'Erreur lors de la récupération des informations');
  }
};

//lister les chambres
export const listRooms = async (req, res) => {
  try {
    let rooms;
    
    // Filtrer par capacite
    if (req.query.capacity) {
      rooms = await clientService.getRoomsByCapacity(req.query.capacity);
    }
    // Filtrer par prix maximum 
    else if (req.query.maxPrice) {
      rooms = await clientService.getRoomsByMaxPrice(req.query.maxPrice);
    }
    //retourner toutes les chambres
    else {
      rooms = await clientService.getAllRooms();
    }
    
    res.json({ 
      success: true, 
      count: rooms.length,
      data: rooms 
    });
  } catch (error) {
    handleError(res, error, 'Erreur lors de la récupération des chambres');
  }
};

//recuperer une chambre par id
export const getRoom = async (req, res) => {
  try {
    const room = await clientService.getRoomById(req.params.id);
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Chambre non trouvée' 
      });
    }
    res.json({ 
      success: true, 
      data: room 
    });
  } catch (error) {
    handleError(res, error, 'Erreur lors de la récupération de la chambre');
  }
};


//reserver une chambre
//POST /api/rooms/:roomId/book
export const bookRoom = async (req, res) => {
  try {
    const result = await clientService.bookRoom(req.params.roomId, req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error, error.message || 'Erreur lors de la réservation');
  }
};


 //annuler une reservation
 //DELETE /api/bookings/:bookingId
export const cancelBooking = async (req, res) => {
  try {
    const result = await clientService.cancelBooking(req.params.bookingId);
    res.json(result);
  } catch (error) {
    handleError(res, error, 'Erreur lors de l\'annulation');
  }
};