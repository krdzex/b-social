import { Kafka } from "kafkajs";

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "notifications-service",
});

const consumer = kafka.consumer({
  groupId: "notifications-service",
});

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
      const data = JSON.parse(message.value.toString());

      console.log(data);
    },
  });
}

export async function disconnectConsumer() {
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}
