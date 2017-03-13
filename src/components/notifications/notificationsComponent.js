(() => {
  'use strict';

  const app = angular.module('app');

  app.component('notifications', {
    // defines a two way binding in and out of the component
    bindings: {
      brand: '<'
    },
    // Pulls in out template
    templateUrl: '/html/notificationsComponent.html',
    controller: notificationsController
      })
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

notificationsController.$inject = ['Messages', 'filterFilter', 'nowTime'];
    
function notificationsController(Messages, filterFilter, nowTime) {
        console.log(Messages.collection);
        this.MsgStore = Messages;
        this.Messages = Messages.collection;
    /******
        Time can be calculated like below:
        1. Till 60 sec "Just Now"
        2. After 60Sec "Minute Ago"
        3. More than one minute "In an Hour" after that "Today"
        3. 24 hours before "Yesterday"...
    *****/
        this.pageLoadTime = (new Date()).toISOString();
        this.nowTime = nowTime;
        console.log(this.Messages);
        
        this.taskCount = (count) => {
            return filterFilter( this.Messages, {"msgType":count}).length;
          }
  }
})();