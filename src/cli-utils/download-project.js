#!/usr/bin/env node
'use strict';

const React = require('react');
const gittar = require('gittar');
const { Text, Box } = require('ink');

const repos = {
	'Next.js': 'osspim-nextjs-boilerplate#main',
	'Next.js - Content and commerce': 'content-commerce-boilerplate#main',
	Gatsby: 'osspim-gatsby-boilerplate#main',
	'Nuxt.js - Content and product listing':
		'osspim-nuxtjs-boilerplate#main',
	'React Native': 'osspim-react-native-boilerplate#main',
	'Service API - Backend for any of the frontends':
		'service-api-boilerplate#main',
	'Next.js - Subscription Commerce': 'osspim-saas-boilerplate#main',
	'Next.js - Conference': 'conference-boilerplate#main'
};

function DownloadProject({
	answers,
	projectName,
	projectPath,
	resolveStep,
	flags,
}) {
	React.useEffect(() => {
		if (projectName) {
			const repo = `ossgroupp/${repos[answers.boilerplate]}`;

			gittar
				.fetch(repo, {
					force: true,
				})
				.then(async (a) => {
					if (flags.info) {
						console.log(a);
					}

					await gittar.extract(repo, projectPath);

					// Why a timeout here? And why was it 2000ms?
					// setTimeout(resolveStep, 2000);
					resolveStep();
				});
		}
	}, [answers.boilerplate, flags.info, projectName, projectPath, resolveStep]);

	return (
		<Box>
			<Text>Downloading the {answers.boilerplate} boilerplate...</Text>
		</Box>
	);
}

module.exports = {
	DownloadProject,
};
