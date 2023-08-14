const base = "/api";

export default {
  url: {
    base,
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || "fbae_clone",
  },
};
