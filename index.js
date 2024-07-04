#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { connection, readScript, SCRIPT_PATH } from "./shared.js";

const files = fs.readdirSync(SCRIPT_PATH).map((e) => e.replace(".js", ""));
if (!files.some((e) => process.argv[2] === e)) {
	console.error("Usage: %s <script>", path.basename(process.argv[1]));
	console.error("Where <script>:\n%s", files.map((e) => `- ${e}`).join("\n"));
	connection.close();
	process.exit(2);
}

await connection.Runtime.enable();
connection.Runtime.on("consoleAPICalled", (ev) => {
	if (ev.type !== "error") {
		return;
	}

	console.error(...ev.args.map((e) => e.description || e.value));
});

const script = await readScript(process.argv[2]);
await script.execute();
connection.close();
