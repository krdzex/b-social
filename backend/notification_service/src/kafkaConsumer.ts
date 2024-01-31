import { Kafka } from "kafkajs";
import { Server } from "socket.io";
import { ioInstance } from "./utils/socket";

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "notifications-service",
});

const consumer = kafka.consumer({
  groupId: "notifications-service",
});

let io: Server;

export function setSocketIOInstance(socketIO: Server) {
  io = socketIO;
}

export async function connectConsumer() {
  await consumer.connect();
  console.log("Connected to consumer");

  await consumer.subscribe({
    topic: "comment-created",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message || !message.value) {
        return;
      }
      
      ioInstance.emit("newComment", { test: "aa" });
    },
  });
}

export async function disconnectConsumer() {
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}
