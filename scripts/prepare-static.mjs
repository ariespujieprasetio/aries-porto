import { existsSync, renameSync, rmSync } from "node:fs";

const source = "out";
const destination = "dist";

if (!existsSync(source)) {
  throw new Error("Next.js static export was not created.");
}

rmSync(destination, { recursive: true, force: true });
renameSync(source, destination);
