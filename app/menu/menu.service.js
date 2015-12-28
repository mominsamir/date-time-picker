(function(){

  'use strict';

  angular.module('dateTimePicker')
    .factory('menu', [
      '$location',
      function ($location) {

        var sections = [{
          name: 'Home',
          state: 'home',
          type: 'link',
          icon: 'home',
        }];

        sections.push({
          name: 'Date Picker',
          type: 'toggle',
          iconp: 'date_range',
          pages: [{
            name: 'Demo',
            type: 'link',
            state: 'date-time-picker'
          },{
            name: 'API',
            type: 'link',
            state: 'date-time-picker-api'
          }]
        });

        sections.push({
          name: 'Range Picker',
          type: 'toggle',
          iconp: 'date_range',
          pages: [{
            name: 'Demo',
            type: 'link',
            state: 'range-picker-demo'
          }]
        });


        var self;

        return self = {
          sections: sections,

          toggleSelectSection: function (section) {
            self.openedSection = (self.openedSection === section ? null : section);
          },
          isSectionSelected: function (section) {
            return self.openedSection === section;
          },

          selectPage: function (section, page) {
            page && page.url && $location.path(page.url);
            self.currentSection = section;
            self.currentPage = page;
          }
        };
      }]).filter('nospace', function () {
      return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
      };
    })
    //replace uppercase to regular case
    .filter('humanizeDoc', function () {
      return function (doc) {
        if (!doc) return;
        if (doc.type === 'directive') {
          return doc.name.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
          });
        }

        return doc.label || doc.name;
      };
    });

})();