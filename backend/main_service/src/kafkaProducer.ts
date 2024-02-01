import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "producer-service",
  brokers: ["kafka:9093"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

export async function connectProducer() {
  await producer.connect();
  console.log("Producer connected");
}

export async function disconnectFromKafka() {
  await producer.disconnect();
  console.log("Producer disconnected");
}

const topics = ["comment-created", "user-created", "post-created"] as const;

export async function sendMessage(
  topic: (typeof topics)[number],
  message: any
) {
  const messageString = JSON.stringify(message);
  const messageBuffer = Buffer.from(messageString);
  return producer.send({
    topic,
    messages: [{ value: messageBuffer }],
  });
}
