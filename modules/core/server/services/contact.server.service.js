'use strict';

  var mongoose = require('mongoose'),
      Contact = mongoose.model('manisha');


module.exports.getContacts = function (callback) {
    Contact.find({},function (err, contacts) {
        if(err) throw err;
        console.log(contacts);
        callback(contacts);
    });
}

module.exports.saveContact = function(savableContact, callback){

    var contact = new Contact(savableContact);   // function constructor
    contact.save(function(err){
        if(err)
        {
            callback(err);
        }
        callback(null,contact);
    });
    console.log('mongoose readyState is ' + mongoose.connection.readyState);// should be 1

}
//To-do
module.exports.getContactById = function(contactID, callback){
    Contact.findById(contactID, function (err,contact){
        if (err) throw err;
        callback(contact);
    });

};

module.exports.updateContact = function (contactID, updatedContact, callback) {

    Contact.findByIdAndUpdate(contactID, { firstName: updatedContact.firstName, lastName: updatedContact.lastName, email: updatedContact.email }, function(err, contact) {
        if (err) throw err;
        updatedContact._id = contact._id;
        console.log("====updated contact=====");
        console.log(updatedContact);
        callback(updatedContact);
    });

}

module.exports.deleteContact = function (id,callback) {
    var isDeleted;
    Contact.findByIdAndRemove(id, function(err) {
        if (err){
            console.log("Error: Unable to Delete");
            isDeleted = false;
        }else{
            console.log("Contact Deleted successfully");
            isDeleted = true;
        }
        callback(isDeleted);
    });
}

module.exports.findContactById = function(id,callback){
    Contact.findById(id, function(err, contact) {
        if (err) throw err;
        callback(contact);
    });
}