const express = require('express');

/** Importanto os Controller */
const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/** Declarando as rotas que estão dentro dos controllers */
routes.get('/ongs', OngController.index);    
routes.post('/ongs', OngController.create); 

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create); 

module.exports = routes;