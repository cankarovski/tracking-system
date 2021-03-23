const redis = require("redis");

const connectRedis = (host, port) => {
  const client = redis.createClient({
    host: host,
    port: port,
  });

  const log = (type) => {
    return () => {
      console.log("Redis", type);
    };
  };

  client.on("connect", log("connect"));
  client.on("ready", log("ready"));
  client.on("reconnecting", log("reconnecting"));
  client.on("error", log("error"));
  client.on("end", log("end"));

  return client;
};

module.exports = connectRedis;
