'use strict';
var contactService = require('../services/contact.server.service');

module.exports.getContacts = function(req,res){
    contactService.getContacts(function(contacts){
        res.status(200);
        res.json(contacts);
    });
}

module.exports.createContact = function(req,res){
    var contact = req.body;
    contactService.saveContact(contact,function(err,contact){
        if(err){
            res.status(400)
                .send("Error: Internal error while saving data. Please try again later")
        }else{
            res.status(200)
                .json(contact)
        }
    });
}
module.exports.getContact = function(req,res){
    var contactID = req.metadata.contactId;
    contactService.getContactById(contactID, function(contact){
        if(contact){
            res.status(200)
                .json(contact)
        }
        else{
            res.status(400)
                .send("Error: Internal error while getting data. Please try again later")
        }
    });
}

module.exports.updateContact = function (req, res) {
    var updatedContact = req.body,
        contactID = req.metadata.contactId;

    contactService.updateContact(contactID, updatedContact, function (isUpdated) {
        if (!isUpdated) {
            res.status(400)
                .send( "Error:: Unable to update contact. Please try again!!");
        } else {
            res.status(200)
                .json(isUpdated);
        }
    });
}

module.exports.deleteContact = function (req, res) {
    var contactID = req.metadata.contactId;

    contactService.deleteContact(contactID,function (isDeleted) {
        if (isDeleted) {
            res.status(200)
                .send( "Succesfully deleted contact.");
        } else {
            res.status(400)
                .send("Error:: Unable to delete contact. Please try again!!");
        }
    });
}


module.exports.validateContactIdAndForward = function (req, res, next, id) {
    var metadata = req.metadata = {};
    metadata.contactId = id;
    contactService.findContactById(id,function (foundContact) {
        if (foundContact) {
            metadata.model = foundContact;
        }
        if (!metadata.model) {
            res
                .status(400)
                .send('Error: Unable to find Contact with id ' + id);
        }
    });
    next();
}