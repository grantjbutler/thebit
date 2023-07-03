import OBSWebSocket from "obs-websocket-js";

export default async () => {
  const obs = new OBSWebSocket();

  console.log(
    "Attempting to connect to OBS at:",
    process.env.OBS_WEBSOCKET_ADDRESS,
  );

  await obs.connect(
    `ws://${process.env.OBS_WEBSOCKET_ADDRESS}`,
    process.env.OBS_WEBSOCKET_PASSWORD,
  ).then((info) => {
    console.log("Connected and identified", info);
  }).catch((response) => {
    console.error("Error Connecting to OBSWebSocket", response);
    process.exit;
  });

  return obs;
};
