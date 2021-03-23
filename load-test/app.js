const loadtest = require("loadtest");
const axios = require("axios");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --address <string>", "API address", "localhost")
  .option("-p, --port <number>", "API port", 8000)
  .option("-r, --requests <number>", "Number of requests", 3000)
  .option("-c, --concurrency <number>", "Concurrent connections", 20)
  .option("-d, --data <string>", "Data string", "helloworld")
  .parse();

const options = program.opts();

const API_URL = `http://${options.address}:${options.port}`;

const getActiveAccountId = async () => {
  const res = await axios.get(`${API_URL}/accounts`);

  let activeAccount = res.data.find((acc) => {
    return acc.isActive === true;
  });

  return activeAccount._id;
};

const runLoadTest = () => {
  getActiveAccountId()
    .then((id) => {
      const loadTestOptions = {
        url: `http://localhost:8000/${id}?data=${options.data}`,
        maxRequests: options.requests,
        concurrency: options.concurrency,
      };
      console.log(loadTestOptions);

      loadtest.loadTest(loadTestOptions, function (err, result) {
        if (err) {
          return console.error("Got an error: %s", err);
        }
        console.log(result);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

runLoadTest();
