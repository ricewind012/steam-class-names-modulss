function findFirstModule(filter, component) {
	const modules = findAllModules(filter);
	const printError = (msg) => {
		console.error("[%s] %s", component, msg);
	};

	if (modules.length === 0) {
		printError("found no modules");
	}
	if (modules.length > 1) {
		printError("found more than 1 module, returning first found");
	}

	return modules[0];
}

/**
 * Used only for usage in DevTools to identify modules easier.
 */
findUniqueKey = (key, index = 0) =>
	Object.keys(findAllModules((mod) => mod[key])[index]).find(
		(mod) => findAllModules((mod2) => mod2[mod]).length === 1,
	);

// TODO: sort classes
classModules = {
	...specialModules,
	...parsedModules
		.map((e) => ({ [e[0]]: e[1] }))
		.reduce((a, b) => Object.assign(a, b)),
	...exportedModules
		.flatMap((a) => {
			const mod = findFirstModule(a[1], a[0]);
			if (!mod) {
				return {};
			}

			return {
				[a[0]]: Object.keys(mod || {})
					.filter((e) => !mod[e].match(/^\d+(\.\d+)?(\w{2})?$/))
					.map((e) => Object({ [e]: mod[e] }))
					.reduce((a, b) => Object.assign(a, b)),
			};
		})
		.reduce((a, b) => Object.assign(a, b)),
};

sortedClassModules = Object.keys(classModules)
	.sort()
	.reduce((obj, key) => {
		obj[key] = classModules[key];

		return obj;
	}, {});

// return
sortedClassModules;
