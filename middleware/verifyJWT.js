import * as authService from '../services/auth.service.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token manquant. Ajoutez "Authorization: Bearer <token>"'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = authService.verifyToken(token);

    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: 'Token invalide ou expiré'
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du token',
      error: error.message
    });
  }
};