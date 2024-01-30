import { Kafka, Producer, ProducerRecord } from "kafkajs";

class KafkaProducer {
  private producer: Producer;

  constructor() {
    this.producer = new Kafka({
      clientId: "api-service",
      brokers: ["kafka:9092"],
    }).producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }

  async publish(topic: string, message: string): Promise<void> {
    const kafkaMessage: ProducerRecord = {
      topic,
      messages: [{ value: message }],
    };

    await this.producer.send(kafkaMessage);
  }
}

export { KafkaProducer };
