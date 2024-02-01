import { Client } from "@elastic/elasticsearch";
import { EachMessagePayload, Kafka } from "kafkajs";

const topics = ["comment-created", "user-created", "post-created"];
const elasticClient = new Client({ node: "http://elasticsearch:9200" });

const kafka = new Kafka({
  brokers: ["kafka:9093"],
  clientId: "consumer-service",
});

const consumer = kafka.consumer({
  groupId: "consumer-service",
});

async function messageHandler(topic: string, data: any) {
  try {
    await elasticClient.index({
      index: topic,
      body: data,
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function connectConsumer() {
  await consumer.connect();
  console.log("Connected to consumer");

  topics.forEach(async (topic) => {
    await consumer.subscribe({
      topic,
      fromBeginning: true,
    });
  });

  await consumer.run({
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      if (!message || !message.value) {
        return;
      }

      const data = JSON.parse(message.value.toString());

      await messageHandler(topic, data);
    },
  });
}

export async function disconnectConsumer() {
  await consumer.disconnect();
  console.log("Disconnected from consumer");
}
