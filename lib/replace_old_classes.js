import fs from "node:fs";
import { CLASS_MAP_FILE, readFile, usePostcss } from "../shared.js";

const OLD_CLASS_MAP_FILE = `old_${CLASS_MAP_FILE}`;

if ([CLASS_MAP_FILE, OLD_CLASS_MAP_FILE].some((e) => !fs.existsSync(e))) {
	console.log("Usage:");
	console.log(
		"1. Run %o on stable Steam.",
		"npx steam-theming-utils build_class_modules",
	);
	console.log("2. Move %o to %o.", CLASS_MAP_FILE, OLD_CLASS_MAP_FILE);
	console.log("3. Run the same command on beta Steam.");
	process.exit(1);
}

const selectorReplacerPlugin = (opts) => (css) => {
	css.walkRules((rule) => {
		rule.selector = rule.selector.replace(opts.match, opts.replace);
	});
};
selectorReplacerPlugin.postcss = true;

const cwd = process.cwd();
const oldClasses = JSON.parse(fs.readFileSync(OLD_CLASS_MAP_FILE));
const newClasses = JSON.parse(fs.readFileSync(CLASS_MAP_FILE));
const modules = Object.keys(oldClasses);
const keys = modules
	.map((e) => ({ [e]: Object.keys(oldClasses[e]) }))
	.reduce((a, b) => Object.assign(a, b));

function findNewClassFromOld(oldName) {
	for (const mod of modules) {
		const className = keys[mod].find((e) => oldClasses[mod][e] === oldName);
		const newName = newClasses[mod]?.[className];
		if (!newName) {
			continue;
		}

		if (oldName !== newName) {
			console.log("Changed %o to %o", oldName, newName);
		}

		return `.${newName}`;
	}

	return `.${oldName}`;
}

export async function execute() {
	const parsedCss = fs
		.readdirSync(cwd, { recursive: true })
		.filter((e) => e.endsWith(".css"))
		.map((e) => [
			e,
			usePostcss({
				match: /\.([\w-]+)/g,
				replace: (_, s) => findNewClassFromOld(s),
			}).process(readFile(e), {
				from: e,
			}),
		]);

	for (const [file, result] of parsedCss) {
		fs.writeFileSync(file, (await result).css);

		console.log("[%s] done", file);
	}
}
