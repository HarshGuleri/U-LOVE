require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const { handelStart, handelDisconnect, getType } = require("./lib");
const socketAuth = require("./middleware/SocketAuth");
const Message = require("./models/Message");

// ================= DB =================
connectDB();

// ================= APP =================
const app = express();
const server = http.createServer(app);

// ================= SECURITY =================
app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || "*",
  credentials: true
}));

app.use(express.json({ limit: "10kb" }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: { message: "Too many requests" }
  })
);

// ================= REST =================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

app.get("/", (_, res) => {
  res.send("U-Love API + Socket running 💖");
});

// ================= SOCKET =================
const io = new Server(server, {
  cors: { origin: "*" }
});

// 🔐 JWT AUTH FOR SOCKET
io.use(socketAuth);

let online = 0;
let roomArr = [];


io.on("connection", socket => {
  socket.on("start", cb => handelStart(roomArr, socket, cb, io));

  socket.on("disconnect", () => handelDisconnect(socket.id, roomArr, io));

  // WEBRTC SIGNALING
  socket.on("ice:send", ({ candidate }) => {
    const type = getType(socket.id, roomArr);
    if (!type) return;
    const target = type.type === "p1" ? type.p2id : type.p1id;
    target && io.to(target).emit("ice:reply", { candidate });
  });

  socket.on("sdp:send", ({ sdp }) => {
    const type = getType(socket.id, roomArr);
    if (!type) return;
    const target = type.type === "p1" ? type.p2id : type.p1id;
    target && io.to(target).emit("sdp:reply", { sdp });
  });

  // CHAT FIX: Use socket.to(roomId) taaki sender ko apna msg wapis na mile
  socket.on("send-message", async ({ text, roomId }) => {
    if (!text || !roomId) return;
    try {
      const msg = await Message.create({ roomId, sender: socket.user.id, text });
      socket.to(roomId).emit("get-message", {
        text: msg.text,
        sender: socket.user.id,
        time: msg.createdAt
      });
    } catch (err) { console.log(err); }
  });
});

// ================= START =================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
