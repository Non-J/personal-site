import { createDecipheriv } from 'node:crypto';

export const readTranslationMap = (input: string) => {
	//@ts-expect-error createDecipheriv does accept Buffer for key & iv (see: https://nodejs.org/docs/latest-v22.x/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options)
	const dec = createDecipheriv(
		'aes-128-ctr',
		Buffer.from('FmDwYqWVYlTo0ocDeA90hg==', 'base64'),
		Buffer.from('QuVlQLFiRPHH4h6AXyzyqA==', 'base64'),
	);

	let result = dec.update(input, 'base64', 'utf8');
	result += dec.final('utf8');

	return result;
};
