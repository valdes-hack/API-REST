module.exports = (authorizedRoles) => {
    return (req, res, next) => {
         // Vérifie si req.user existe AVANT de lire le rôle
        if (!req.user) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }
        // Check if user's role is in the list of authorized roles
        if ( !authorizedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé : Rôle non autorisé" });
        }
        next();
    };
};