"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./db/index"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT;
(0, index_1.default)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use((0, cors_1.default)());
app.use("/", express_1.default.static("public"));
app.use("/api", documentRoutes_1.default); // Mounting the document routes
// WebSocket logic
const users = {};
const socketToRoom = {};
const maximum = 10;
io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
    let thisRoomId;
    const TotalRooms = new Map();
    socket.emit("totalRoomsUpdate", TotalRooms, thisRoomId);
    socket.on("join", (data) => {
        if (users[data.room]) {
            if (users[data.room].length === maximum) {
                socket.to(socket.id).emit("room_full");
                return;
            }
            users[data.room].push({ id: socket.id, name: data.name });
        }
        else {
            users[data.room] = [{ id: socket.id, name: data.name }];
            socket.emit("room_created", data.room);
        }
        socketToRoom[socket.id] = data.room;
        socket.join(data.room);
        socket.emit("room_joined", data.room);
    });
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
    });
});
