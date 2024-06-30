import fs from "node:fs";
import cp from "node:child_process";
import path from "node:path";
import { packagePath, readFile, run, runWithResult } from "../shared.js";

const CLASS_MAP_FILE = "class_map.json";
const CDP_FILES_PATH = path.join(packagePath, "cdp");

export async function execute() {
	const dflRan = await runWithResult("!!webpackCache");
	if (!dflRan) {
		// No need to directly use DFL
		await run(
			readFile(
				path.join("node_modules", "decky-frontend-lib", "dist", "webpack.js"),
			).replace(/export /g, ""),
		);
	}
	await run(readFile(path.join(CDP_FILES_PATH, "class_modules_db.js")));

	const filePath = path.join(process.cwd(), CLASS_MAP_FILE);
	const output = await runWithResult(
		readFile(path.join(CDP_FILES_PATH, "class_modules.js")),
	);

	fs.writeFileSync(filePath, JSON.stringify(output));
	cp.spawnSync("npx", ["@biomejs/biome", "format", "--write", filePath]);
	console.log("Wrote %o", filePath);
}