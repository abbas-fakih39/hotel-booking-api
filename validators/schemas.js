import { z } from 'zod';

// Schéma pour ajouter un client
export const addClientSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Téléphone doit contenir 10 chiffres'),
  address: z.string().optional()
});

// Schéma pour mettre à jour un client
export const updateClientSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().regex(/^[0-9]{10}$/).optional(),
  address: z.string().optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'Au moins un champ doit être fourni'
});

// Schéma pour réserver une chambre
export const bookRoomSchema = z.object({
  checkIn: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Date de check-in invalide'
  }),
  checkOut: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Date de check-out invalide'
  }),
  guests: z.number().int().min(1, 'Au moins 1 invité requis').max(10, 'Maximum 10 invités'),
  specialRequests: z.string().optional()
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  {
    message: 'La date de check-out doit être après le check-in',
    path: ['checkOut']
  }
);

// Schéma pour réservation client (avec infos client)
export const clientBookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/),
  checkIn: z.string().refine((date) => !isNaN(Date.parse(date))),
  checkOut: z.string().refine((date) => !isNaN(Date.parse(date))),
  guests: z.number().int().min(1).max(10),
  specialRequests: z.string().optional()
});

// Schéma pour filtres de chambres
export const roomFiltersSchema = z.object({
  capacity: z.string().regex(/^[0-9]+$/).optional(),
  maxPrice: z.string().regex(/^[0-9]+$/).optional()
});