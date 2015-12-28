(function(){

'use strict';

function RangePickerInput($document){
    return {
      restrict : 'EA',
      replace: false,
      scope :{
        value: '=',
        format : '@',
        fname : "@",
        lable : "@",
        required : '@',
        disable : '=',
        form : '='
      },
      template: ' <md-input-container flex="{{flexSize}}" flex-gt-sm="100" flex-sm="100" flex-gt-xs="100" flex-xs="100" class="gj-input-container" >'
                +'    <label  ng-class="{\'required\': required==\'true\'}" ng-if="!lable==\'\'"   for="{{fname}}">{{fname  }}</label>'
                +'      <input name="{{fname}}" ng-model="value" '
                +'             type="text" placeholde="{{fname}}"'
                +'             aria-label="{{fname}}" ng-required="required"'
                +'             ng-focus="show()" server-error >'
                +'          <div ng-messages="form[fname].$error" ng-if="form[fname].$touched">'
                +'              <div ng-messages-include="modules/core/views/validation-massages.html"></div>'
                +'          </div>            '
                +'  </md-input-container>'
                +'  <gj-range-picker show-display-header="false" selected-range="receiveRange(startDate,endDate,divider)" class="gj-calender-pane"  format="{{format}}" ></gj-range-picker>',
      link :  function(scope,$element,attr){
        var inputPane = $element[0].querySelector('.gj-input-container');
        var calenderPane = $element[0].querySelector('.gj-calender-pane');
        var cElement = angular.element(calenderPane);
        
        scope.format = angular.isUndefined(scope.format) ? 'MM-DD-YYYY': scope.format;
        
        cElement.addClass('hide');

        scope.startDate  = angular.isUndefined(scope.value)? scope.startDate : scope.value;

        $document.on('click', function (e) {
            if ((calenderPane !== e.target && inputPane !==e.target) && (!calenderPane.contains(e.target) && !inputPane.contains(e.target))) {
              cElement.removeClass('show').addClass('hide');
            }
        });

        angular.element(inputPane).on('keydown', function (e) {
            if(e.which===9){
              cElement.removeClass('show').addClass('hide');
              angular.element(inputPane).focus();
            }
        });

        scope.show= function(){
          var elementRect = inputPane.querySelector('input').getBoundingClientRect();
          var bodyRect = document.body.getBoundingClientRect();
          calenderPane.style.left = (elementRect.left) + 'px';
          calenderPane.style.top = (elementRect.top) + 'px';
          document.body.appendChild(calenderPane);
          cElement.removeClass('hide').addClass('show');
        }

        scope.receiveRange = function(startDate,endDate,divider){
          scope.value = startDate +' ' + divider + ' '+endDate;
          cElement.removeClass('show').addClass('hide');      
        }

        scope.$on('$destroy',function(){
          calenderPane.parentNode.removeChild(calenderPane);
        });

        function destroyCalender(){
          calenderPane.parentNode.removeChild(calenderPane);
      }
    }
  }
} 




function DateTimePicker($mdUtil,$mdMedia,$document){
    return {
      restrict : 'E',
      replace:true,
      scope :{
        status : '=',
        value: '=',
        startDate : '@',
        weekStartDay : '@',
        mode : '@',
        format : '@',
        minDate : '@',
        maxDate : '@',
        fname : "@",
        lable : "@",
        isRequired : '@',
        disable : '=',
        form : '=',
        flexSize : '@'
      },
      template: '<div flex="{{flexSize}}" flex-gt-sm="100" flex-sm="100" flex-gt-xs="100" flex-xs="100">'
                +'  <md-input-container  flex="100" style="width:100%;" class="gj-input-container" >'
                +'    <label  ng-class="{\'required\': required==\'true\'}" ng-if="!lable==\'\'"   for="{{fname}}">{{fname }}</label>'
                +'      <input name="{{fname}}" ng-model="value" '
                +'             type="text" placeholde="{{fname}}"'
                +'             aria-label="{{fname}}" data-ng-required="isRequired"'
                +'             ng-focus="show()" server-error >'
                +'          <div ng-messages="form[fname].$error" ng-if="form[fname].$touched">'
                +'              <div ng-messages-include="modules/core/views/validation-massages.html"></div>'
                +'          </div>            '
                +'  </md-input-container>'
                +'  <div id="picker" class="gj-calender-pane">'
                +'      <gj-calender mode="{{mode}}" show-display-header="true" selected-date="receiveSelectedDate(date)" data-min-date="minDate" data-max-date="maxDate"  format="{{format}}"  start-day="{{weekStartDay}}" value="value"></gj-calender>'
                +'  </div>'
                +'</div>',
      link :  function(scope,$element,attr){
        var inputPane = $element[0].querySelector('.gj-input-container');
        var calenderPane = $element[0].querySelector('.gj-calender-pane');
        var cElement = angular.element(calenderPane);
        
        // check if Pre defined format is supplied
        scope.format = angular.isUndefined(scope.format) ? 'MM-DD-YYYY': scope.format;
        
        // Hide calender pane on initialization
        cElement.addClass('hide');

        // set start date
        scope.startDate  = angular.isUndefined(scope.value)? scope.startDate : scope.value;

        // Hide Calender on click out side
        $document.on('click', function (e) {
            if ((calenderPane !== e.target && inputPane !==e.target) && (!calenderPane.contains(e.target) && !inputPane.contains(e.target))) {
              cElement.removeClass('show').addClass('hide');
              $mdUtil.enableScrolling();      
            }
        });

        // if tab out hide key board
        angular.element(inputPane).on('keydown', function (e) {
            if(e.which===9){
              cElement.removeClass('show').addClass('hide');
              angular.element(inputPane).focus();
              $mdUtil.enableScrolling();      
            }
        });

        // show calender 
        scope.show= function(){
          var elementRect = inputPane.querySelector('input').getBoundingClientRect();
          var bodyRect = document.body.getBoundingClientRect();
          cElement.removeClass('hide');
          if($mdMedia('sm') ||  $mdMedia('xs')){
            calenderPane.style.left = (bodyRect.width-282)/2+'px';
            calenderPane.style.top =  (bodyRect.height-450)/2+ 'px';
          }else{
            calenderPane.style.left = (elementRect.left) + 'px';
            calenderPane.style.top = (elementRect.top) + 'px';
          }
          document.body.appendChild(calenderPane);
          $mdUtil.disableScrollAround(calenderPane);
          cElement.addClass('show');
        }

        // recieve selected Date from Calender 
        scope.receiveSelectedDate = function(d){
          if(d===null){
            cElement.removeClass('show').addClass('hide');
          }else{
            scope.value =d.format(scope.format);
            cElement.removeClass('show').addClass('hide');
          }
          $mdUtil.enableScrolling();      
        }

        // remove element on scope destroyed
        scope.$on('$destroy',function(){
          calenderPane.parentNode.removeChild(calenderPane);
        });


        function destroyCalender(){
          calenderPane.parentNode.removeChild(calenderPane);
      }
    }
  }
} 




function smCalender (){
  return{
    restrict : 'E',
    scope:{
      format:'@',
      divider: '@',
      selectedRange:'&'
    },
    controller: ['$scope',RangePickerCtrl],
    controllerAs : 'vm',
    templateUrl : 'picker/date-range-picker.html'    
  }
}

var RangePickerCtrl = function(scope){
  var self = this;
  self.scope = scope;
  self.clickedButton = 0;
  self.divider = angular.isUndefined(self.scope.divider)?'To':self.scope.divider;
  self.showCustom=false;
  self.startDate = moment().format(self.scope.format);
  self.endDate = moment().format(self.scope.format);
  self.selectedRange = scope.selectedRange;
}

RangePickerCtrl.prototype.selectedStartDate= function(d){
    var self = this;
    self.startDate = d.format(self.scope.format);
    self.selectedTabIndex =1;
} 
RangePickerCtrl.prototype.selectedEndDate= function(d){
    var self = this;  
    self.endDate = d.format(self.scope.format);
  }  

RangePickerCtrl.prototype.dateRangeSelected = function(){
    var self = this;
    self.selectedTabIndex =0;
    self.showCustom=false;
    self.selectedRange({startDate:self.startDate,endDate:self.endDate,divider:self.divider});
}

RangePickerCtrl.prototype.preDefineDate = function(p){
    var self = this;  
    self.clickedButton=p;
    var instance = moment();
    switch (p){
      case 1:
        self.startDate = instance.clone().startOf('day').format(self.scope.format);
        self.endDate = instance.clone().endOf('day').format(self.scope.format);
        break;
      case 2:
        self.startDate = instance.clone().subtract(7,'d').format(self.scope.format);
        self.endDate = instance.clone().format(self.scope.format);
        break;
      case 3:
        self.startDate = instance.clone().startOf('month').format(self.scope.format);
        self.endDate = instance.endOf('month').format(self.scope.format);
        break;
      case 4:
        self.startDate = instance.clone().subtract(1,'month').startOf('month').format(self.scope.format);
        self.endDate = instance.clone().endOf('month').format(self.scope.format);
        break;
      case 5:
        self.startDate = instance.clone().startOf('quarter').format(self.scope.format);;
        self.endDate = instance.clone().endOf('quarter').format(self.scope.format);
        break;
      case 6:
        self.startDate = instance.clone().startOf('year').format(self.scope.format);;
        self.endDate = instance.clone().endOf('year').format(self.scope.format);
        break;
      case 7:
        self.showCustom=true;
        self.selectedTabIndex=0
        break;
      case 8:
        self.startDate = instance.clone().startOf('year').format(self.scope.format);;
        self.endDate = instance.clone().format(self.scope.format);
        break;
      default:
        break;
    }
    if(p!=7)
      self.selectedRange({startDate:self.startDate,endDate:self.endDate,divider:self.divider});
} 


var app = angular.module('dateTimePicker');
app.directive('dateTimePicker',['$mdUtil','$mdMedia','$document',DateTimePicker]);
app.directive('gjRangePicker',[smCalender]);
app.directive('gjRangePickerInput',['$document',RangePickerInput]);

})();