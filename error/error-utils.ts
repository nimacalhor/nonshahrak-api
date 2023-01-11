const logExtra = (extra: Object) =>
  Object.entries(extra).forEach(([key, value]) => {
    console.log({ key: value });
    console.log("");
  });

export const logError = (err: any, title?: string, extra?: Object) => {
  console.log(title || "*** uncaught exceptions ***");
  console.log("");
  console.log({ errorName: err.name });
  console.log("");
  console.log({ errorMessage: err.message });
  console.log("");
  if (extra) logExtra(extra);
  console.log({ stack: err.stack });
};
