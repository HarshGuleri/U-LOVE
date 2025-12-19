const { v4: uuidv4 } = require('uuid');

function handelStart(roomArr, socket, cb, io) {
  const availableRoom = checkAvailableRoom();

  if (availableRoom.is) {
    socket.join(availableRoom.roomid);
    cb('p2');
    closeRoom(availableRoom.roomid);

    if (availableRoom.room) {
      // Dono ko signal bhejo ki stranger mil gaya hai
      io.to(availableRoom.room.p1.id).emit('remote-socket', socket.id);
      socket.emit('remote-socket', availableRoom.room.p1.id);
      // P2 ko room id bhejo
      socket.emit('roomid', availableRoom.roomid);
    }
  } else {
    const roomid = uuidv4();
    socket.join(roomid);
    roomArr.push({
      roomid,
      isAvailable: true,
      p1: { id: socket.id },
      p2: { id: null }
    });
    cb('p1');
    socket.emit('roomid', roomid);
  }

  function closeRoom(roomid) {
    for (let i = 0; i < roomArr.length; i++) {
      if (roomArr[i].roomid === roomid) {
        roomArr[i].isAvailable = false;
        roomArr[i].p2.id = socket.id;
        break;
      }
    }
  }

  function checkAvailableRoom() {
    for (let i = 0; i < roomArr.length; i++) {
      if (roomArr[i].isAvailable) {
        return { is: true, roomid: roomArr[i].roomid, room: roomArr[i] };
      }
    }
    return { is: false, roomid: '', room: null };
  }
}

function handelDisconnect(disconnectedId, roomArr, io) {
  for (let i = 0; i < roomArr.length; i++) {
    if (roomArr[i].p1.id === disconnectedId || roomArr[i].p2.id === disconnectedId) {
      const otherUser = roomArr[i].p1.id === disconnectedId ? roomArr[i].p2.id : roomArr[i].p1.id;
      if (otherUser) io.to(otherUser).emit('disconnected');
      roomArr.splice(i, 1);
      break;
    }
  }
}

function getType(id, roomArr) {
  for (let i = 0; i < roomArr.length; i++) {
    if (roomArr[i].p1.id === id) return { type: 'p1', p2id: roomArr[i].p2.id };
    if (roomArr[i].p2.id === id) return { type: 'p2', p1id: roomArr[i].p1.id };
  }
  return false;
}

module.exports = { handelStart, handelDisconnect, getType };