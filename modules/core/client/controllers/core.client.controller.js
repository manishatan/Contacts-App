'use strict';

angular
    .module('ContactsApp')
        .controller('ContactsCtrl', function($scope, ContactService, $state){
                $scope.contactTestName = " Test to show";
            var refresh = function() {
                var contactsPromise = ContactService.getContacts();
                var successCallback = function (response) {
                    $scope.contacts = response;
                    $scope.fields = Object.keys($scope.contacts[0]) || [];
                }
                var failureCallback = function (err) {
                    console.log("Error while fetching contacts");
                }
                contactsPromise
                    .success(successCallback)
                    .error(failureCallback);
            };refresh();

            $scope.updateContact = function(contact){
                $state.go('edit',{contactId: contact._id});
            }

            $scope.deleteContact = function (contact) {
                var contactId = contact._id ;
                //console.log(contactId);
                var deletePromise = ContactService.deleteContact(contactId);
                var successCallback = function(response){
                $scope.message = response;
                }
                var failureCallback = function(err){
                    $scope.message = err;
                }
                deletePromise
                    .success(successCallback)
                    .error(failureCallback);
                refresh();
            }
        })
        .controller('saveCtrl', function($scope,ContactService){
            $scope.saveContact = function(contact){
              var savePromise =  ContactService.postContact(contact);
                var successCallback = function(){
                    $scope.message = "Contact saved succesfully !!";
                }
                var failureCallback = function(err){
                    $scope.message = err;
                }
                savePromise
                    .success(successCallback)
                    .error(failureCallback);
            }
        })
    .controller('editCtrl', function($scope, contactId, ContactService) {
        var getContactPromise = ContactService.getContact(contactId);
        var successCallback = function (contact) {
            $scope.contact = contact;
        }
        var failureCallback = function (err) {
            $scope.message = "Error:: occured during get opertaion";
        }
        getContactPromise
            .success(successCallback)
            .error(failureCallback);

        $scope.putContact = function (contact) {
            var contactId = contact._id;
            var putPromise = ContactService.putContact(contactId, contact);
            var successCallback = function () {
                $scope.message = "Contact Updated Succesfully!! ";

            }
            var failureCallback = function (err) {
                $scope.message = err;

            }
            putPromise
                .success(successCallback)
                .error(failureCallback);

        }
    })


