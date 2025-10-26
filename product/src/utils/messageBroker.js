const config = require("../config");
const amqp = require("amqplib");

class MessageBroker {
  constructor() {
    this.channel = null;
  }

  async connect() {
    console.log("Connecting to RabbitMQ...");

    setTimeout(async () => {
      try {
        const connection = await amqp.connect(config.rabbitMQURI);
        this.channel = await connection.createChannel();

        // Khởi tạo queue chính (ví dụ queueName trong .env)
        await this.channel.assertQueue(config.queueName, { durable: true });
        console.log("✅ RabbitMQ connected & queue initialized:", config.queueName);
      } catch (err) {
        console.error("❌ Failed to connect to RabbitMQ:", err.message);
      }
    }, 40000); // 30 giây delay để RabbitMQ sẵn sàng
  }

  async publishMessage(queue, message) {
    if (!this.channel) {
      console.error("❌ No RabbitMQ channel available.");
      return;
    }

    try {
      // Đảm bảo queue tồn tại trước khi gửi
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log("📤 Message sent to queue:", queue);
    } catch (err) {
      console.log("❌ Failed to send message:", err.message);
    }
  }

  async consumeMessage(queue, callback) {
    if (!this.channel) {
      console.error("❌ No RabbitMQ channel available.");
      return;
    }

    try {
      // Đảm bảo queue tồn tại trước khi consume
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.consume(queue, (message) => {
        const content = message.content.toString();
        const parsedContent = JSON.parse(content);
        console.log("📩 Message received from queue:", queue);
        callback(parsedContent);
        this.channel.ack(message);
      });
    } catch (err) {
      console.log("❌ Failed to consume message:", err.message);
    }
  }
}

module.exports = new MessageBroker();
