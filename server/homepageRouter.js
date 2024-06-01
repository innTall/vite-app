import express from "express";
import { readFile } from "fs/promises"; //+
import path from "path"; //+
const router = express.Router();
// added
const environment = process.env.NODE_ENV;
router.get("/*", async (_req, res) => {
  const data = {
    environment,
    manifest: await parseManifest(),
  };
  res.render("index.html.ejs", data);
});
const parseManifest = async () => {
  if (environment !== "production") return {};
  const manifestPath = path.join(path.resolve(), "dist", "manifest.json");
  const manifestFile = await readFile(manifestPath);
  return JSON.parse(manifestFile);
};
export default router;
