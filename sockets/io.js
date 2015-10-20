/**
 * Created by arun on 10/14/15.
 */

module.exports = function(socketIO){

        socketIO.sockets.on('connection',function(socket){




            socket.on('send-message',function(data){
                socketIO.sockets.emit('new-message',data);
            });

        });

};