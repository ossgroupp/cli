#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');

async function initGatsby({ answers, projectPath }) {
	const appConfig = {
		locales: [],
	};

	// Set locales
	(answers.multilingual || ['en']).forEach(function addToConfig(lng) {
		appConfig.locales.push({
			locale: lng,
			displayName: lng,
			urlPrefix: answers.multilingual ? lng : '',
			appLanguage: 'en-US',
			osspimCatalogLanguage: lng,
			osspimPriceVariant: 'default',
		});
	});

	// Update app.config.json file
	fs.writeFileSync(
		path.resolve(projectPath, 'app.config.json'),
		JSON.stringify(appConfig, null, 3)
	);

	// Setup OSSPIM config
	fs.writeFileSync(
		path.resolve(projectPath, '.env'),
		[
			`GATSBY_OSSPIM_INSTANCE_ID=${answers.instance}`,
			`GATSBY_PUBLIC_SERVICE_API_URL=${answers.serviceAPIURL}`,
		].join(os.EOL),
		'utf-8'
	);

	// Add a sensible .gitignore
	fs.writeFileSync(
		path.resolve(projectPath, '.gitignore'),
		`${require('./default-gitignore')}

# gatsby files
.cache/
public`
	);
}

module.exports = initGatsby;
