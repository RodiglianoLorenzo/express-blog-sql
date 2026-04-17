function notFoundHandler(req, res, next) {
    res.status(404).json({
        error: "Risorsa non trovata",
        messaggio: "La risorsa richiesta non è stata trovata"
    });
}

module.exports = notFoundHandler;