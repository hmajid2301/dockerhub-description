import fs from "fs";
import path from "path";
import dockerHubAPI from "docker-hub-api";

async function update_description() {
  const info = await dockerHubAPI.login(
    process.env.DOCKERHUB_USERNAME,
    process.env.DOCKERHUB_PASSWORD
  );
  dockerHubAPI.setLoginToken(info.token);
  const filePath = process.env.README_PATH || path.join("./", "README.md");
  const json = JSON.stringify({
    full: fs.readFileSync(filePath, { encoding: "utf-8" }),
    short: process.env.SHORT_DESCRIPTION || undefined
  });

  try {
    const response = dockerHubAPI.setRepositoryDescription(
      process.env.DOCKERHUB_REPO_PREFIX || process.env.DOCKERHUB_USERNAME,
      process.env.DOCKERHUB_REPO_NAME || process.env.DOCKERHUB_REPO,
      JSON.parse(json)
    );
    console.table(response);
  } catch (e) {
    console.error(e);
  }
}

update_description();
