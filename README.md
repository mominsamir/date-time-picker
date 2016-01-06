# SM Date, Time and Range Picker

Picker are design to be used with Angular Material.

  - for Demo and Docs [http://mominsamir.github.io/date-time-picker/]

### Feature
    - Angular Material based.
    - No JQuery Dependency
    - Anuglar Material Theme supported
    - Range Picker
    - Date Picker
    - DateTime Picker
    

### Installation
```sh
  bower install --save smDateTimeRangePicker
```
```sh
  angular.module('Your App',["ngMaterial","smDateTimeRangePicker"]); 
```
####  DateTime Picker
```sh

      <div  layout="row"> 
            <sm-date-time-picker 
                fname="field" 
                lable="Date of Birth"
                form="empForm" 
                value="vm.employee.dateOfBirth" 
                flex="50"
                flex-sm="100"
                flex-xs="100"                          
                is-required="{{true}}" 
                format="MM-DD-YYYY HH:mm"
                mode="date-time" 
                week-start-day="Monday">
            </sm-date-time-picker>
    </div>
```
####  Date Picker
```sh

      <div  layout="row"> 
            <sm-date-time-picker 
                fname="field" 
                lable="Date of Birth"
                form="empForm" 
                value="vm.employee.dateOfBirth" 
                flex="50"
                flex-sm="100"
                flex-xs="100"                          
                is-required="{{true}}" 
                format="MM-DD-YYYY HH:mm"
                week-start-day="Monday">
            </sm-date-time-picker>
    </div>
```
####  Range Picker
```sh
	    <div layout="row">
	        <sm-range-picker-input
	                fname="Date of Pay" 
	                lable="Date of Pay"
	                form="test"
	                min-date="11-10-2015" 
	                value="vm.employee.dateOfPay" 
	                flex="50"                         
	                is-required="{{true}}" 
	                format="MM-DD-YYYY"
	                mode="date-time" 
	                week-start-day="Sunday">
	        </sm-range-picker-input>
	    </div>
```
