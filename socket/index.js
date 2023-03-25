const io = require('socket.io')(4500, {
    cors: {
        origin: "http://localhost:3000",
    }
});

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on('connection', socket => {
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId)
       if(!user) return
       io.to(user.socketId).emit("getMessage", {
           senderId,
           text
       })

    })

    socket.on("disconnect", () => {
        console.log('User disconnected')
        users = users.filter(user => user.socketId !== socket.id)
        io.emit("getUsers", users)
    })
})