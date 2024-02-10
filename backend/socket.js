const socketIO = require('socket.io');
const Message = require('./models/MessageModel');

const initializeSocket = (server) => {
    const io = socketIO(server, {
        pingTimeout: 60000,
        cors: {
            origin: "http://localhost:3000",
        },
    });

    let users = [];

    const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
    }
    

    const findUser = (userId) => {
        return users.find((user) => user.userId === userId);
    }

    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    }
    

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
          });
        

        socket.on("disconnect", () => {
            console.log("A user disconnected");
            removeUser(socket.id);
        
            // To send a new list of all current users
            io.emit("getUsers", users);
        });
        

        socket.on('sendMessage', async(data) => {
            const user = findUser(data.receiverId);

            const newMessage = await Message.create({
                message: data.message,
                chatId: data.chatId,
                sender: data.senderId,
                receiver: data.receiverId,
            })   
            
            if (user) {
                io.to(user.socketId).emit('getMessage', {
                    senderId: data.senderId,
                    message: data.message,
                });
            }

        })
    });

    return io;
};

module.exports = initializeSocket;
