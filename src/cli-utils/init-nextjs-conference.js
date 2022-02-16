#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

function initNextJSConference({ answers, projectPath }) {
	// Update website .env file
	const envVarsWebsite = {
		NEXT_PUBLIC_OSSPIM_INSTANCE_IDENTIFIER: answers.instance,
		NEXT_PUBLIC_SERVICE_API_URL: 'https://api.conference.superfast.shop',
	};
	fs.writeFileSync(
		path.resolve(projectPath, 'website/.env'),
		Object.keys(envVarsWebsite)
			.map((key) => `${key}=${envVarsWebsite[key]}`)
			.join(os.EOL) + os.EOL
	);

	// Update Service API .env.local file
	const envVarsServiceAPI = {
		OSSPIM_INSTANCE_IDENTIFIER: answers.instance,
		JWT_SECRET: 'some-secret-jwt-key-goes-here',
		EMAIL_FROM: '',
		OSSPIM_ACCESS_TOKEN_ID: '',
		OSSPIM_ACCESS_TOKEN_SECRET: '',
		STRIPE_SECRET_KEY: '',
		STRIPE_PUBLISHABLE_KEY: '',
		SENDGRID_API_KEY: '',
		SERVICE_CALLBACK_HOST: '',
	};
	fs.writeFileSync(
		path.resolve(projectPath, 'service-api/.env.local'),
		Object.keys(envVarsServiceAPI)
			.map((key) => `${key}=${envVarsServiceAPI[key]}`)
			.join(os.EOL) + os.EOL
	);

	// Add a sensible .gitignore
	const gitIgnore = `${require('./default-gitignore')}

# Next build output
.next`;
	fs.writeFileSync(path.resolve(projectPath, 'website/.gitignore'), gitIgnore);
	fs.writeFileSync(
		path.resolve(projectPath, 'service-api/.gitignore'),
		gitIgnore
	);

	// Remove boilerplate toolbar
	const appPath = path.resolve(projectPath, 'website/src/pages/_app.tsx');
	const _app = fs.readFileSync(appPath, 'utf-8');
	const firstParts = _app.split('{/*osspim-boilerplates-topbar-start*/}');

	// Check for presence of the code
	if (firstParts.length > 1) {
		const secondParts = firstParts[1].split(
			'{/*osspim-boilerplates-topbar-end*/}'
		);
		fs.writeFileSync(appPath, firstParts[0] + secondParts[1]);
	}
}

module.exports = initNextJSConference;
