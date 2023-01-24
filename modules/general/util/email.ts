import { getEnvVar, isEnv } from "./general-utils";

import type { SendMailOptions } from "nodemailer";
import { createTransport } from "nodemailer";

const { host, pass, port, user } = getTransportData();

async function sendMail(options: SendMailOptions) {
  const transporter = createTransport({
    host,
    port,
    auth: { user, pass },
    secureConnection: false,
  } as any);

  const { to, from = "Nima Kalhor", subject, text } = options;
  const mailOptions = { to, from, subject, text };

  await transporter.sendMail(mailOptions);
}

export default sendMail;

function getTransportData() {
  const host = isEnv("development")
    ? getEnvVar("TEST_EMAIL_HOST")
    : getEnvVar("EMAIL_HOST");
  const port = isEnv("development")
    ? getEnvVar("TEST_EMAIL_PORT")
    : getEnvVar("EMAIL_PORT");
  const user = isEnv("development")
    ? getEnvVar("TEST_EMAIL_USERNAME")
    : getEnvVar("EMAIL_USERNAME");
  const pass = isEnv("development")
    ? getEnvVar("TEST_EMAIL_PASSWORD")
    : getEnvVar("EMAIL_PASSWORD");
  return { host, port, user, pass };
}
