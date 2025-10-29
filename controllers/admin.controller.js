import * as adminService from '../services/admin.service.js';

//gerer les erreurs
const handleError = (res, error, message) => {
  res.status(500).json({
    success: false,
    message,
    error: error.message
  });
};

//lister les clients
export const listClients = async (req, res) => {
  try {
    const clients = await adminService.getAllClients();
    res.json({ 
      success: true, 
      count: clients.length,
      data: clients 
    });
  } catch (error) {
    handleError(res, error, 'Erreur lors de la récupération des clients');
  }
};

//recuperer un client par id
export const getClient = async (req, res) => {
  try {
    const client = await adminService.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ 
        success: false, 
        message: 'Client non trouvé' 
      });
    }
    res.json({ 
      success: true, 
      data: client 
    });
  } catch (error) {
    handleError(res, error, 'Erreur lors de la récupération du client');
  }
};

//ajouter un client
export const addClient = async (req, res) => {
  try {
    const result = await adminService.addClient(req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error, 'Erreur lors de l\'ajout du client');
  }
};

//modifier un client
export const updateClient = async (req, res) => {
  try {
    const result = await adminService.updateClient(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    handleError(res, error, 'Erreur lors de la modification du client');
  }
};


//reserver une chambre pour un client
export const bookRoom = async (req, res) => {
  try {
    const { clientId, roomId } = req.params;
    const result = await adminService.bookRoomForClient(clientId, roomId, req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error, error.message || 'Erreur lors de la réservation');
  }
};

//annuler une reservation
export const cancelBooking = async (req, res) => {
  try {
    const result = await adminService.cancelBooking(req.params.bookingId);
    res.json(result);
  } catch (error) {
    handleError(res, error, 'Erreur lors de l\'annulation');
  }
};