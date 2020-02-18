import express, { Application } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import fileUpload from "express-fileupload";
import compression from "compression";
import firebase from "firebase-admin";
import socket from "socket.io";
import http from "http";

import { AppConfig } from "./config/AppConfig";
import routes from "./routes";
import { User } from "./objects";

declare global {
    namespace Express {
        interface Request {
            user: User;
            roles: string[];
            firebaseUser: firebase.auth.DecodedIdToken;
        }
    }
}

const app: Application = express();

AppConfig.loadConfig();
AppConfig.loadKnex();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/", routes);

const server = http.createServer(app);
const io = socket(server);

let connectedUsers: string[] = [];
io.on("connection", (client) => {
    // usersCount += 1;
    console.log(" a user connected...");
    // io.emit("connect-user", usersCount);

    client.on("join", (obj: { email: string}) => {
        console.log(" join: ", obj);
        const userAlreadyConnected = connectedUsers.find(x => x === obj.email);
        if (!userAlreadyConnected) {
            connectedUsers.push(obj.email);
            io.emit("member", connectedUsers.length);
        }
        console.log(" connected usersCount: ", connectedUsers);
    });

    client.on("leave", (obj: {email: string}) => {
        console.log(" leave email: ", obj);
        const filteredList = connectedUsers.filter(x => x !== obj.email);
        connectedUsers = [...filteredList || [] ];
        io.emit("member", connectedUsers.length);
    });

    client.on("clear", () => {
        console.log(" clear event triggered...");
        connectedUsers = [];
    });

    client.on("disconnect", () => {
        console.log(" a client disconnected ");
    })
});

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(" server has started on port " + PORT));
