const React = require('react');
const { Text, Newline } = require('ink');
const importJsx = require('import-jsx');

const steps = importJsx('./steps');

const baseAnswers = {
	defaultInstance: 'furniture',
	defaultServiceAPIURL: 'https://service-api-demo.superfast.shop/api/graphql',
	bootstrapInstance: 'no',
};

const welcomeMessage = (
	<>
		<Text>
			<Text underline>
				OSSPIM - headless ecommerce
			</Text>
			<Newline />
			<Text>Hi you, let's make something awesome!</Text>
		</Text>
	</>
);

module.exports = {
	baseAnswers,
	welcomeMessage,
	steps,
};
