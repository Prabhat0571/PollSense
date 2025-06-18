import { createPoll, voteOnOption } from '../controllers/pollController.js';

let votes = {};
let connectedUsers = {};

export const handleSockets = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket Connected:', socket.id);

    socket.on('createPoll', async (pollData) => {
      votes = {};
      const poll = await createPoll(pollData);
      io.emit('pollCreated', poll);
    });

    socket.on('submitAnswer', (data) => {
      votes[data.option] = (votes[data.option] || 0) + 1;
      voteOnOption(data.pollId, data.option);
      io.emit('pollResults', votes);
    });

    socket.on('joinChat', ({ username }) => {
      connectedUsers[socket.id] = username;
      io.emit('participantsUpdate', Object.values(connectedUsers));
    });

    socket.on('kickOut', (userToKick) => {
      for (const id in connectedUsers) {
        if (connectedUsers[id] === userToKick) {
          io.to(id).emit('kickedOut');
          const userSocket = io.sockets.sockets.get(id);
          if (userSocket) userSocket.disconnect();
          delete connectedUsers[id];
          break;
        }
      }
      io.emit('participantsUpdate', Object.values(connectedUsers));
    });

    socket.on('chatMessage', (message) => {
      io.emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
      delete connectedUsers[socket.id];
      io.emit('participantsUpdate', Object.values(connectedUsers));
      console.log('Socket Disconnected:', socket.id);
    });
  });
};
