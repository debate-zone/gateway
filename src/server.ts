import "dotenv/config";
import { checkToken } from "./middlewares/authMiddlewares";
const gateway = require("fast-gateway");

const server = gateway({
  routes: [
    {
      prefix: "/user",
      target: process.env.USER_MICRO_SERVICE_URL,
    },
    {
      prefix: "/debate-zone",
      target: process.env.DEBATE_ZONE_MICRO_SERVICE_URL,
      middlewares: [checkToken],
    },
    {
      prefix: "/comment",
      target: process.env.COMMENT_MICRO_SERVICE_URL,
      middlewares: [checkToken],
    },
    {
      prefix: "/notification",
      target: process.env.NOTIFICATION_MICRO_SERVICE_URL,
      middlewares: [checkToken],
    },
    {
      prefix: "/media",
      target: process.env.MEDIA_MICRO_SERVICE_URL,
      middlewares: [checkToken],
    },
  ],
});

server
  .start(process.env.PORT)
  .then(() => {
    console.log("Server started on port " + process.env.PORT);
  })
  .catch((err: any) => {
    console.error(err);
  });
