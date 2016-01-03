(function(){

'use strict';



function RangePickerInput($document){
    return {
      restrict : 'EA',
      replace: true,
      scope :{
        value: '=',
        fname : "@",
        lable : "@",
        isRequired : '@',
        disable : '=',
        form : '=',
        format : '@',
        divider: '@',
        flexSize :'@'
      },
      template: ' <md-input-container flex="{{flexSize}}" flex-sm="100"  flex-xs="100"  >'
                +'    <label for="{{lable}}">{{lable}}</label>'
                +'      <input name="{{fname}}" ng-model="value" '
                +'             type="text" placeholde="{{lable}}"'
                +'             aria-label="{{fname}}" ng-required="{{isRequired}}" class="gj-input-container"'
                +'             ng-focus="show()" server-error >'
                +'          <div ng-messages="form[fname].$error" ng-if="form[fname].$touched">'
                +'              <div ng-messages-include="modules/core/views/validation-massages.html"></div>'
                +'          </div>'
                +'    <sm-range-picker class="gj-calender-pane" ng-model="value" format="{{format}}" ></sm-range-picker>'
                +'  </md-input-container>',
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
          var elementRect = inputPane.getBoundingClientRect();
          var bodyRect = document.body.getBoundingClientRect();
          calenderPane.style.left = (elementRect.left) + 'px';
          calenderPane.style.top = (elementRect.top) + 'px';
          document.body.appendChild(calenderPane);
          cElement.removeClass('hide').addClass('show');
        }

        scope.$on('range-picker:close',function(){
            cElement.removeClass('show').addClass('hide');
//            scope.value = scope.startDate +' ' + scope.divider + ' '+scope.endDate;
            cElement.removeClass('show').addClass('hide');            
//            $mdUtil.enableScrolling();            
        });
/*      
        }
*/

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
    require : ['ngModel','smRangePicker'],
    scope:{
      format:'@',
      divider: '@'
    },
    controller: ['$scope',RangePickerCtrl],
    controllerAs : 'vm',
    templateUrl : 'picker/range-picker.html',
    link : function(scope,element,att,ctrls){
      var ngModelCtrl = ctrls[0];
      var calCtrl = ctrls[1];
      calCtrl.configureNgModel(ngModelCtrl);

    }    
  }
}

var RangePickerCtrl = function($scope){
  var self = this;
  self.scope = $scope;
  self.clickedButton = 0;
  self.divider = angular.isUndefined(self.scope.divider)?'To':self.scope.divider;
  self.format = 'MM-DD-YYYY';
  self.showCustom=false;
  self.startDate = moment().format(self.scope.format);
  self.endDate = moment().format(self.scope.format);
  self.selectedTabIndex = $scope.selectedTabIndex;
  self.scope.$on('calender:date-selected',function(){
    self.selectedTabIndex =1;
  });        

}

RangePickerCtrl.prototype.configureNgModel = function(ngModelCtrl) {
    this.ngModelCtrl = ngModelCtrl;
    var self = this;
    ngModelCtrl.$render = function() {
      self.ngModelCtrl.$viewValue= self.startDate+' '+ self.divider +' '+self.endDate;
    };
};

RangePickerCtrl.prototype.dateRangeSelected = function(){
    var self = this;
    self.selectedTabIndex =0;
    self.showCustom=false;
    self.setNgModelValue(self.startDate,self.divider,self.endDate);
    self.showCustom=false;
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
    if(p!=7){
      self.setNgModelValue(self.startDate,self.divider,self.endDate);
      self.scope.$emit('range-picker:close');        
    }
} 

RangePickerCtrl.prototype.setNgModelValue = function(startDate,divider,endDate) {
    var self = this;
    self.scope.$emit('range-picker:close');
    self.ngModelCtrl.$setViewValue(startDate+' '+ divider +' '+endDate);
    self.ngModelCtrl.$render();
};

RangePickerCtrl.prototype.cancel = function(){
  var self = this;
  self.scope.$emit('range-picker:close');        
}

var app = angular.module('dateTimePicker');


  app.directive('smRangePicker',[smCalender]);
  app.directive('smRangePickerInput',['$document',RangePickerInput]);

})();