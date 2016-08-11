'use strict';

var controller = require('../controllers/core.server.controller.js'),
    mainController = require('../controllers/main.server.controller.js');


module.exports = function(app){
    app
        .route('/')
            .get(mainController.index);

    // Contact collection and creation
    app
        .route('/api/contact')
            .get(controller.getContacts)
            .post(controller.createContact);

    // Update and delete operations
    app
        .route('/api/contact/:contactId')
        .get(controller.getContact)
        .put(controller.updateContact)
        .delete(controller.deleteContact);

    app.param ('contactId', controller.validateContactIdAndForward)
}