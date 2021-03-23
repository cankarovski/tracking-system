const connectRedis = require("../tracking-service/connections/ConnectRedis");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --address <string>", "Redis server address", "localhost")
  .option("-p, --port <number>", "Redis server port", 6379)
  .option("-c, --channel <string>", "Redis server port", "tracking-data")
  .option("-f, --filter <id...>", "Filter messages by account IDs", [])
  .parse();

const options = program.opts();

const redisClient = connectRedis(options.address, options.port);

function logData(id, ts, data) {
  console.log(`accountId: ${id}, timestamp: ${ts}, data: ${data}`);
}

redisClient.on("message", (channel, data) => {
  const dataObj = JSON.parse(data);
  if (
    options.filter.length === 0 ||
    options.filter.indexOf(dataObj.accountId) !== -1
  ) {
    logData(dataObj.accountId, dataObj.timestamp, dataObj.data);
  }
});

redisClient.subscribe(options.channel);
