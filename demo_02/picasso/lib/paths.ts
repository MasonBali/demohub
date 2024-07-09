export const getDirectories = async () => {
  if ("__TAURI__" in window) {
    console.debug("--- getDirectories ---");
    const { path } = await import("@tauri-apps/api");
    let paths: any = {};
    path.appDataDir().then((dir) => {
      // console.log(dir);
      console.debug(dir);
      paths["appDataDir"] = dir;
    });
    path
      .resolve(await path.appDataDir(), "ploty_server_ready.txt")
      .then((pathDir) => {
        paths["plotyServerReady"] = pathDir;
      });
    path
      .resolve(await path.appDataDir(), "slides", "service-account-key.json")
      .then((dir) => {
        console.debug(dir);
        // console.log(dir);
        paths["serviceKeyFilePath"] = dir;
      });
    path
      .resolve(await path.appDataDir(), "slides", "token.json")
      .then((dir) => {
        console.debug(dir);
        // console.log(dir);
        paths["tokenPath"] = dir;
      });
    path
      .resolve(await path.appDataDir(), "slides", "credentials.json")
      .then((dir) => {
        console.debug(dir);
        // console.log(dir);
        paths["credentialsPath"] = dir;
      });
    path.resolve(await path.appDataDir(), "slides", "index.js").then((dir) => {
      console.debug(dir);
      // console.log(dir);
      paths["slidesPath"] = dir;
    });
    path
      .resolve(await path.appDataDir(), "python", "venv", "Scripts", "python")
      .then((pathDir) => {
        // console.log(pathDir);
        console.debug(pathDir);
        paths["plotyPythonBinary"] = pathDir;
      });
    path
      .resolve(await path.appDataDir(), "python", "app_fastapi_simple.py")
      .then((pathDir) => {
        // console.log(pathDir);
        console.debug(pathDir);
        paths["plotyPythonModule"] = pathDir;
      });
    path
      .resolve(await path.appDataDir(), "python", "venv", "Scripts", "rembg")
      .then((pathDir) => {
        paths["rembgPath"] = pathDir;
      });
    path.resolve(await path.homeDir(), "ploty").then((dir) => {
      console.debug(dir);
      paths["plotyRootPath"] = dir;
    });
    path.resolve(await path.homeDir(), "ploty", "data").then((dir) => {
      console.debug(dir);
      paths["plotyDataPath"] = dir;
    });
    path.resolve(await path.homeDir(), "ploty", "cast").then((dir) => {
      console.debug(dir);
      paths["plotyCastPath"] = dir;
    });
    path.resolve(await path.homeDir(), "ploty", "session").then((dir) => {
      console.debug(dir);
      paths["plotySessionPath"] = dir;
    });
    path.resolve(await path.homeDir(), "ploty", "storyboards").then((dir) => {
      console.debug(dir);
      paths["plotyStoryboardsPath"] = dir;
    });
    path.resolve(await path.homeDir(), "ploty", "moodboards").then((dir) => {
      console.debug(dir);
      paths["plotyMoodboardsPath"] = dir;
    });
    path.resolve(await path.homeDir(), "ploty", "export").then((dir) => {
      console.debug(dir);
      paths["plotyExportPath"] = dir;
    });
    return path.homeDir().then((dir) => {
      console.debug(dir);
      paths["homeDir"] = dir;
      return paths;
    });
  }
  return null;
};

export const getPathBaseName = async (inputPath: string) => {
  if ("__TAURI__" in window) {
    const { path } = await import("@tauri-apps/api");
    return path.basename(inputPath);
  }
  return null;
};
