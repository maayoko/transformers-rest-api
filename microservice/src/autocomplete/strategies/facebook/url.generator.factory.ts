import { FacebookUrlGenerator } from "./url.generator";

const urlFactory = type => {
	switch (type) {
		case FacebookUrlGenerator.TYPE:
			return new FacebookUrlGenerator();
	}
};

export { urlFactory };
