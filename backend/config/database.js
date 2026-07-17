/*
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:"../config/.env"
})
const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to mongoDB");
    }).catch((error)=>{
        console.log(error);
    })
}
export default databaseConnection;

*/

import mongoose from "mongoose";
import dns from "node:dns";

const databaseConnection = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing. Add it to the project root .env file.");
    }

    const dnsServers = process.env.MONGO_DNS_SERVERS
        ?.split(",")
        .map((server) => server.trim())
        .filter(Boolean);

    if (dnsServers?.length) {
        dns.setServers(dnsServers);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
};

export default databaseConnection;