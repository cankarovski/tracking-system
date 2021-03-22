const redis = require("redis");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --address <string>", "Redis server address", "localhost")
  .option("-p, --port <number>", "Redis server port", 6379)
  .option("-c, --channel <string>", "Redis server port", "tracking-data")
  .option("-f, --filter <id...>", "Filter messages by account IDs")
  .parse();

const options = program.opts();

const client = redis.createClient({
  host: options.address,
  port: options.port,
});

client.on("error", (err) => {
  console.log(err);
});

client.on("message", (channel, data) => {
  const dataObj = JSON.parse(data);
  if (options.filter.indexOf(dataObj.accountId) !== -1) {
    console.log(
      `accountId: ${dataObj.accountId}, timestamp: ${dataObj.timestamp}, data: ${dataObj.data}`
    );
  }
});

client.subscribe(options.channel);
