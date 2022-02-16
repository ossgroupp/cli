#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

async function initReactNative({ answers, projectPath }) {
	const envVars = {
		OSSPIM_INSTANCE_IDENTIFIER: answers.instance,
		SERVICE_API_URL: answers.serviceAPIURL,
	};

	// Update .env file
	fs.writeFileSync(
		path.resolve(projectPath, '.env'),
		Object.keys(envVars)
			.map((key) => `${key}=${envVars[key]}`)
			.join(os.EOL) + os.EOL
	);
}

module.exports = initReactNative;
