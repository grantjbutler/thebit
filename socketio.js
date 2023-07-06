import io from "socket.io-client";
import axios from "axios";

export default async () => {
  const token = await axios.post(
    `${process.env.DN_ADDRESS}api/auth/local`,
    {
      username: process.env.DN_USER,
      password: process.env.DN_PASSWORD,
    },
  ).then((response) => {
    return response.data.token;
  }).catch((response) => {
    console.log("ERROR: Unable to connect to DN");
  });

  const socket = io(process.env.DN_ADDRESS, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
    auth: { token: `Bearer ${token}` },
  });

  socket.on(
    "connect",
    () =>
      console.log(
        `Connected to DN Socket at ${process.env.DN_ADDRESS}`,
      ),
  );
  socket.on(
    "connect_error",
    (reason) => {
      console.log("Failed to connect to DN.", reason);
      process.exit();
    },
  );
  socket.on(
    "disconnect",
    (reason) => console.log("Disconnected from DN.", reason),
  );

  return socket;
};
