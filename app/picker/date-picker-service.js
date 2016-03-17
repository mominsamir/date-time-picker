(function(){

'use strict';

var app = angular.module('dateTimePicker');


function DatePickerServiceCtrl($scope, $mdDialog, $mdMedia, $timeout, initialDate){
    var self = this;
    self.view ="DATE";
    self.currentDate = initialDate;
}


app.provider("$smDateTimePicker", function() {
    var LABEL_OK = "OK",
        LABEL_CANCEL = "Cancel",
        DISPLAY_FORMAT = "ddd, MMM DD";
        
    this.setDisplayFormat = function(format) {
        DISPLAY_FORMAT = format;    
    };
        
    this.setOKButtonLabel = function(label) {
        LABEL_OK = label;
    };
    
    this.setCancelButtonLabel = function(label) {
        LABEL_CANCEL = label;
    };
    
    this.$get = ["$mdDialog", function($mdDialog) {

        var datePicker = function(initialDate, options) {


            if (!angular.isUndefined(initialDate)) initialDate = moment();
            if (!angular.isObject(options)) options = {};
            
            options.displayFormat = DISPLAY_FORMAT;
    
            return $mdDialog.show({
                controller:  ['$scope', '$mdDialog', '$mdMedia', '$timeout', 'initialDate', DatePickerServiceCtrl],
                controllerAs: 'vm',
                clickOutsideToClose: true,
                targetEvent: options.targetEvent,
                templateUrl: "picker/date-picker-service.html",
                locals: {
                    initialDate: initialDate,
                    options: options
                },
                skipHide: true
            });
        };
    
        return datePicker;
    }];
});


})();


;







