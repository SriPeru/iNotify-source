(() => {
  'use strict';

  const app = angular.module('app');
    
    app.factory('Messages', Messages);

    Messages.$inject = ['$websocket'];

    function Messages($websocket) {
      var ws = $websocket('ws://localhost:7070/');
      var collection=[];

      ws.onMessage(function(event) {

        var res;
        try {
          res = JSON.parse(event.data);
        } catch(e) {
          res = {'msgType': '1', 'message': event.data};
        }

          if(res.length > 0){
                res.forEach(function(item, index){
                      collection.push(res[index]);
                });
          }else{
              //console.log(res);
              collection.push(res);
          }
      });

      ws.onError(function(event) {
        console.log('connection Error', event);
      });

      ws.onClose(function(event) {
        console.log('connection closed', event);
      });

      ws.onOpen(function() {
        console.log('connection open');
        ws.send('Hello Im in');
        ws.send('Came Again');
        ws.send('and Again');
      });
    //Didn't close the connection - need to enable
      // setTimeout(function() {
      //   ws.close();
      // }, 500)

      return {
        collection: collection,
        status: function() {
          return ws.readyState;
        },
        send: function(message) {
          if (angular.isString(message)) {
            ws.send(message);
          }
          else if (angular.isObject(message)) {
            ws.send(JSON.stringify(message));
          }
        }

      };
    };
})();