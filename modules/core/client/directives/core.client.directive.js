'use strict';

angular
    .module(ApplicationConfiguration.applicationModuleName)
    .directive('contactForm', function(){
        return {
            restrict: 'E',
            templateUrl:"modules/core/client/views/contact-form.client.tpl.html",
            scope:{
                name:'@'  //@ read the text only once
            }
        }
    })