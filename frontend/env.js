module.exports.getEnv = function (env) {
  const devParams = {
    APP_BASE_URL: "",
    APP_S3_URL: "",
    APP_ENV: "develop",
  };
  switch (env) {
    case "dev":
      return devParams;
    case "stg":
      return {
        APP_BASE_URL: "",
        APP_S3_URL: "",
        APP_ENV: "staging",
      };
    case "prd":
      return {
        APP_BASE_URL: "",
        APP_S3_URL: "",
        APP_ENV: "production",
      };
    default:
      return devParams;
  }
};
