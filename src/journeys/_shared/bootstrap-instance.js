const fs = require('fs-extra');
const path = require('path');

const { Bootstrapper, EVENT_NAMES } = require('@osspim/import-utilities');

function bootstrapInstance({
	instance,
	instanceSpec,
	id,
	secret,
	onUpdate = () => {},
}) {
	return new Promise((resolve) => {
		try {
			const spec = JSON.parse(
				fs.readFileSync(
					path.resolve(__dirname, `./specs/${instanceSpec}.json`),
					'utf-8'
				)
			);
			if (spec) {
				const bootstrapper = new Bootstrapper();

				bootstrapper.setAccessToken(id, secret);

				bootstrapper.setInstanceIdentifier(instance);

				bootstrapper.setSpec(spec);

				bootstrapper.start();

				bootstrapper.on(EVENT_NAMES.STATUS_UPDATE, onUpdate);
				bootstrapper.on(EVENT_NAMES.DONE, resolve);
			}
		} catch (e) {
			console.log(e);
			resolve();
		}
	});
}

module.exports = { bootstrapInstance };
