(function(){

'use strict';

function newCalender(){
	return {
	    restrict : 'E',
	    scope :{
	      	initialDate : "@",
	      	minDate:"=",
	      	maxDate:"=",
	      	format:"@",
	      	mode:"@",
	      	startDay:"@",
	      	showDisplayHeader:"@",
	      	selectedDate:"&"
	    },
	   	controller:["$scope","$timeout",CalenderCtrl],
	    controllerAs : 'vm',
	    templateUrl:"picker/calender.html",
		link : function(scope,element,att,ctrl){
			console.log(scope.showDisplayHeader);
			scope.$on('$destroy',function(){
			   element.remove();
			});
		}      
	}
}

var CalenderCtrl = function($scope,$timeout){
	var self  = this;
	self.$timeout = $timeout;
	self.initialDate = $scope.initialDate; 	//if calender to be  initiated with specific date 
	self.startDay = $scope.startDay;	   	//if calender to be start on specific day default is sunday
	self.minDate = $scope.minDate;			//Minimum date 
	self.maxDate = $scope.maxDate;			//Maximum date 
	self.mode = $scope.mode;				//Calender mode
	self.format = $scope.format;
	self.restrictToMinDate = angular.isUndefined($scope.minDate) ? false : true;
	self.restrictToMaxDate = angular.isUndefined($scope.maxDate) ? false : true;
	console.log($scope.showDisplayHeader);
	self.showDisplayHeader = angular.isUndefined($scope.showDisplayHeader) ? false : true;
	self.selectedDate = $scope.selectedDate;
	self.stopScrollPrevious =false;
	self.stopScrollNext = false;
	self.view= 'DATE';
	self.yearCells = [];
	self.monthCells=[];
	self.dateCellHeader= [];	
	self.dateCells = [];
	self.hourCells =[];
	self.minuteCells =[];
	self.monthList = moment.months();
	self.moveCalenderAnimation='';
	self.init();

}



CalenderCtrl.prototype.init = function(){
	var self = this;
	self.format = angular.isUndefined(self.format) ? 'MM-DD-YYYY': self.format;
	self.startDay = angular.isUndefined(self.startDay) ? 'Sunday' : self.startDay ;
	self.initialDate =	angular.isUndefined(self.initialDate)? moment() : moment(self.initialDate,self.format);
	self.currentDate = self.initialDate.clone();
	if(self.restrictToMinDate) 
		self.minDate = moment(self.minDate, self.format);
	if(self.restrictToMaxDate) 
		self.maxDate = moment(self.maxDate, self.format);
	self.buildYearCells();
	self.buildDateCells();
	self.buildDateCellHeader();
	self.buildMonthCells();
	self.buidHourCells();
	self.buidMinuteCells();

};



CalenderCtrl.prototype.buildYearCells = function(y){
	var self = this;
	var startYear = self.initialDate.year() -25;
	if(!angular.isUndefined(self.minDate)){
		startYear = self.minDate.year();		
	}
	var endYear = startYear +25;
	if(!angular.isUndefined(self.maxDate)){
		endYear = self.maxDate.year();		
	}	
	for (var i = startYear ; i <= endYear; i++) {
		self.yearCells.push(i);
	};	
};

CalenderCtrl.prototype.buildMonthCells = function(){
	var self = this;
	self.monthCells = moment.months();
};

CalenderCtrl.prototype.buildDateCells = function(){
	var self = this;
	

	var currentMonth = self.initialDate.month();

    var calStartDate  = self.initialDate.clone().date(0).day(self.startDay);
    var weekend = false;
    var isDisabledDate =false;

    /*
    	Check if min date is greater than first date of month
    	if true than set stopScrollPrevious=true 
    */
	if(!angular.isUndefined(self.minDate)){	
		self.stopScrollPrevious	 = self.minDate.unix() > calStartDate.unix();
	}

    self.dateCells =[];
	for (var i = 0; i < 6; i++) {
		var week = [];
		for (var j = 0; j < 7; j++) {
			
			var isCurrentMonth = (calStartDate.month()=== currentMonth);	
			

			if(isCurrentMonth){isDisabledDate=false}else{isDisabledDate=true};
			

			if(self.restrictToMinDate && !angular.isUndefined(self.minDate) && !isDisabledDate)
				isDisabledDate = self.minDate.isAfter(calStartDate);
			
			if(self.restrictToMaxDate && !angular.isUndefined(self.maxDate) && !isDisabledDate)
				isDisabledDate = self.maxDate.isBefore(calStartDate);
			
			console.log();

			var  day = {
	            	date : calStartDate.clone(),
	                dayNum: isCurrentMonth ? calStartDate.date() :"",
	                month : calStartDate.month(),
	                today: calStartDate.isSame(moment(),'day') && calStartDate.isSame(moment(),'month'),
	                year : calStartDate.year(),
	                dayName : calStartDate.format('dddd'),
	                isWeekEnd : weekend,
	                isDisabledDate : isDisabledDate,
	                isCurrentMonth : isCurrentMonth
			};
			
			week.push(day);
            calStartDate.add(1,'d')
		}
		self.dateCells.push(week);
	}
    /*
    	Check if max date is greater than first date of month
    	if true than set stopScrollPrevious=true 
    */
	if(self.restrictToMaxDate && !angular.isUndefined(self.maxDate)){	
		self.stopScrollNext	= self.maxDate.unix() < calStartDate.unix();
	}



};

CalenderCtrl.prototype.buidHourCells = function(){
	var self = this;
	for (var i = 0 ; i <= 23; i++) {
		var hour={
			hour : i,
			isCurrent :(self.initialDate.hour())=== i 
		}
		self.hourCells.push(hour);
	};	
};

CalenderCtrl.prototype.buidMinuteCells = function(){
	var self = this;
	for (var i = 0 ; i <= 59; i++) {
		var minute = {
			minute : i,
			isCurrent : (self.initialDate.minute())=== i,
		}
		self.minuteCells.push(minute);
	};
};

CalenderCtrl.prototype.changePeriod = function(c){
	var self = this;
	if(c === 'p'){

		if(self.stopScrollPrevious) return;
		self.moveCalenderAnimation='slideLeft';
		self.initialDate.subtract(1,'M');
	}else{
		if(self.stopScrollNext) return;
		self.moveCalenderAnimation='slideRight';
		self.initialDate.add(1,'M');
	}
	self.buildDateCells();
	self.$timeout(function(){
		self.moveCalenderAnimation='';
	},500);
	
};


CalenderCtrl.prototype.selectDate = function(d,isDisabled){
	var self = this;
	if (isDisabled) return;
	self.currentDate = d;
}


CalenderCtrl.prototype.buildDateCellHeader = function(startFrom){
	var self = this;
	var daysByName = {
		sunday    : {'shortName':'Su','fullName':'Sunday','single':'S'}, 
		monday    : {'shortName':'Mo','fullName':'MonDay','single':'M'}, 
		tuesday   : {'shortName':'Tu','fullName':'TuesDay','single':'T'}, 
		wednesday : {'shortName':'We','fullName':'Wednesday','single':'W'}, 
		thursday  : {'shortName':'Th','fullName':'Thursday','single':'T'}, 
		friday    : {'shortName':'Fr','fullName':'Friday','single':'F'}, 
		saturday  : {'shortName':'Sa','fullName':'Saturday','single':'S'}
	}
	var keys = [];
	for (var key in daysByName) {
		keys.push(key)
	}
	var startIndex = moment().day(self.startDay).day(), count = 0;
	for (var key in daysByName) {

    	self.dateCellHeader.push(daysByName[ keys[ (count + startIndex) % (keys.length)] ]);
        count++; // Don't forget to increase count.
    }  
}
/*
	Month Picker
*/

CalenderCtrl.prototype.changeView = function(view){
	var self = this;
	self.view =view;
}

/*
	Year Picker
*/


CalenderCtrl.prototype.changeYear = function(yr){
	var self = this;
	self.initialDate.year(yr);
	self.buildDateCells();
	self.view='DATE';	
}

/*
	Hour and Time
*/


CalenderCtrl.prototype.setHour = function(h){
	var self = this;
	self.currentDate.hour(h);
}

CalenderCtrl.prototype.setMinute = function(m){
	var self = this;
	self.currentDate.minute(m);
}

CalenderCtrl.prototype.selectedDateTime = function(){
	var self = this;
	self.selectedDate({date: self.currentDate});
	self.view='DATE';	
}

CalenderCtrl.prototype.closeDateTime = function(){
	var self = this;
	self.selectedDate({date: null});
	self.view='DATE';	
}


var app = angular.module('dateTimePicker');

app.directive('gjCalender',['$timeout',newCalender]);


})();