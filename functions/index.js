const functions = require("firebase-functions");
const Compute = require('@google-cloud/compute');

const compute = new Compute();
const zone = compute.zone('australia-southeast2-a');
const mcServerVm = zone.vm('mc-server-1')

const start = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Starting server", {structuredData: true});
  try {
    const data = await mcServerVm.start()
    response.json(data);
  } catch (error) {
    response.json({ error });
  }
});

const stop = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Stopping server", {structuredData: true});
  try {
    const data = await mcServerVm.stop()
    response.json(data);
  } catch (error) {
    response.json({ error });
  }
});

module.exports = {
  start,
  stop
}