import fs from "fs";
import dockerHubAPI from "docker-hub-api";
import yargs from "yargs";

async function updateDescription(args) {
  const { username, password, repoName, readmePath } = args;
  const info = await dockerHubAPI.login(username, password);
  dockerHubAPI.setLoginToken(info.token);
  const json = JSON.stringify({
    full: fs.readFileSync(readmePath, { encoding: "utf-8" })
  });

  let repoPrefix = username;
  if (args.repoPrefix) {
    repoPrefix = args.repoPrefix;
  }

  const response = await dockerHubAPI.setRepositoryDescription(
    repoPrefix,
    repoName,
    JSON.parse(json)
  );

  return response;
}

const args = yargs
  .usage("Usage: $0 [options]")
  .env("DOCKERHUB")
  .option("u", {
    alias: "username",
    description: "Docker Hub username.",
    demandOption: true
  })
  .option("p", {
    alias: "password",
    description: "Docker Hub password (cannot be an access token).",
    demandOption: true
  })
  .option("r", {
    alias: "repoName",
    description:
      "The repository name that you want to update the description off.",
    demandOption: true
  })
  .option("x", {
    alias: "repoPrefix",
    description:
      "The prefix of the repository you want to  update, If not set defaults to username."
  })
  .option("f", {
    alias: "readmePath",
    description:
      "Path to README file which will be used as the description of repository on Docker Hub.",
    default: "./README.md"
  })
  .help("h")
  .alias("h", "help").argv;

updateDescription(args)
  .then(response => {
    process.stdout.write(JSON.stringify({ response }, null, 4));
  })
  .catch(error => {
    process.stdout.write(error);
    process.exit(1);
  });
