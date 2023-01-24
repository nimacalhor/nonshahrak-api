import rateLimit from "express-rate-limit";

const MAX = 100;
const WINDOWS_MINUTE = 30;

const limiter = rateLimit({
  max: MAX,
  windowMs: WINDOWS_MINUTE * 60 * 1000,
});

export default limiter;
