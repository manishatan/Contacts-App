'use strict';

angular
    .module('ContactsApp')
        .factory('ContactService', function($http){

            var _getContacts = function(){
                var promise = $http.get('/api/contact');
                return promise;
            }

            var _getContact = function(contactId){
               var getContactPromise= $http.get('/api/contact/'+contactId);
                return getContactPromise;
            }
            var _postContact = function(contact){
                var postContact = $http.post('/api/contact',contact);
                return postContact;
            }
            var _putContact = function(contactId,contact){
                var editPromise = $http.put('api/contact/'+contactId,contact);
                return editPromise;
            }
            var _deleteContact =function(contactId){
                var deletePromise = $http.delete('/api/contact/'+contactId);
                return deletePromise;
            }
            return {
                getContacts: _getContacts,
                getContact: _getContact,
                postContact: _postContact,
                putContact:_putContact,
                deleteContact: _deleteContact
            };


        });