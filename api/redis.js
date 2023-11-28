const Redis = require('redis');
const client = Redis.createClient();

client.on("error", (err) => {
    console.log(err);
});

client.on("connect", () => {
    console.log("Connected to Redis");
});

client.on("end", () => {
    console.log("Redis connection ended");
});

client.connect(() => {
    console.log("Connect to Redis")
})

module.exports = client;