#!/usr/bin/env node
'use strict';

const React = require('react');
const { Text, Newline, Box } = require('ink');
const importJsx = require('import-jsx');
const { UncontrolledTextInput } = require('ink-text-input');

const { highlightColor } = require('../../shared');
const Tips = importJsx('../../cli-utils/tips');

const {
	stepsBootstrapExampleInstance,
	BootstrapWarning,
	RunBootstrapper,
} = importJsx('../_shared/step-bootstrap-instance');

const steps = [
	{
		render({ resolveStep }) {
			return (
				<Box flexDirection="column">
					<Text>Enter the instance identifier you want to bootstrap</Text>
					<UncontrolledTextInput
						placeholder="my-instance-identifier"
						onSubmit={resolveStep}
					/>
				</Box>
			);
		},
		answer({ answers, answer }) {
			answers.instance = answer;
		},
		staticMessage({ answers }) {
			return (
				<Text>
					All right, using instance{' '}
					<Text color={highlightColor}>{answers.instance}</Text>
				</Text>
			);
		},
	},
	...stepsBootstrapExampleInstance,
	{
		render({ answers, resolveStep }) {
			return (
				<>
					<Text>Please wait. This will take a few minutes...</Text>
					<RunBootstrapper answers={answers} onDone={resolveStep} />
					<Newline />
					<Tips />
				</>
			);
		},
		answer({ answers, answer }) {
			if (answer) {
				answers.bootstrapDuration = answer.duration;
			}
		},
	},
	{
		staticMessage({ answers }) {
			return (
				<Box marginY={1}>
					<Text>
						✨ <Text color={highlightColor}>{answers.instance}</Text> is
						bootstrapped with {answers.bootstrapInstance} example data.
						{answers.bootstrapDuration && (
							<>
								<Newline />
								Duration: {answers.bootstrapDuration}
							</>
						)}
					</Text>
				</Box>
			);
		},
	},
];

const baseAnswers = {
	bootstrapInstance: 'yes',
};

const welcomeMessage = (
	<Box flexDirection="column">
		<Text>
			<Text underline>
				OSSPIM - headless ecommerce
			</Text>
			<Newline />
			<Text>Let's bootstrap an instance</Text>
		</Text>
		<BootstrapWarning />
	</Box>
);

module.exports = {
	baseAnswers,
	welcomeMessage,
	steps,
};
