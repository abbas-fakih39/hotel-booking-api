export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      // Pour Zod v4+
      if (error.message) {
        try {
          const zodErrors = JSON.parse(error.message);
          if (Array.isArray(zodErrors)) {
            return res.status(400).json({
              success: false,
              message: 'Erreur de validation',
              errors: zodErrors.map(err => ({
                field: err.path.join('.'),
                message: err.message
              }))
            });
          }
        } catch (e) {
          // Si le parsing JSON échoue
        }
      }
      
      // Fallback
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        details: error.message
      });
    }
  };
};

export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      // Pour Zod v4+
      if (error.message) {
        try {
          const zodErrors = JSON.parse(error.message);
          if (Array.isArray(zodErrors)) {
            return res.status(400).json({
              success: false,
              message: 'Paramètres de requête invalides',
              errors: zodErrors.map(err => ({
                field: err.path.join('.'),
                message: err.message
              }))
            });
          }
        } catch (e) {
          // Si le parsing JSON échoue
        }
      }
      
      // Fallback
      return res.status(400).json({
        success: false,
        message: 'Paramètres invalides',
        details: error.message
      });
    }
  };
};