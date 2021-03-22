const redis = require("redis");
const client = redis.createClient({
  host: "192.168.1.18",
  port: 6379,
});

client.on("error", (err) => {
  console.log(err);
});

client.on("message", (channel, data) => {
  console.log("Received data from channel:", channel);
  console.log(JSON.parse(data));
});

client.subscribe("tracking-data");
