import TranslationEN from './en.json';
import TranslationTH from './th.json';
import TranslationKO from './ko.json';
import TranslationWW from './ww.json';

import type { AstroGlobal } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';
import { readTranslationMap } from 'src/utils/uwulingo';

export const languages = {
	en: 'English',
	th: 'ไทย',
	ko: '한국어',
	ww: 'UwU',
};

export const defaultLocale = 'en';

export type Language = keyof typeof languages;

type TranslationMap = typeof TranslationEN;

type AstroCurrentLocale = AstroGlobal['currentLocale'];

function checkAstroLocale(astroLocale: AstroCurrentLocale): Language {
	if (
		astroLocale === undefined ||
		Object.keys(languages).includes(astroLocale)
	) {
		return astroLocale ?? (defaultLocale as any);
	}

	throw new Error(`Astro Locale "${astroLocale}" is not supported.`);
}

function formatNumberWithLeadingZero(num: number, length: number): string {
	return num.toFixed(0).padStart(length, '0');
}

interface Translator {
	currentLocale: Language;
	/**
	 * Return the translated text from the label. The variables are substituted into the template.
	 *
	 * Example: For template "There are ${num} eggs in the basket".
	 * The variables would be {"num": 4}
	 *
	 * This function can't magically fixes grammatical errors (e.g., when num is 1, egg is singular).
	 *
	 * @param label The label for the desired text
	 * @param variables The mappings of template name to the substitution value
	 */
	getText(
		label: keyof TranslationMap | keyof typeof TranslationWW,
		variables?: Record<string, string>,
	): string;
	getRoute(path: string): string;
	getRouteToLocale(path: string, locale?: Language): string;

	/**
	 * Format date to local format. Don't do time or timezone, only date.
	 * @param date Date only. Won't output time anyway.
	 */
	formatDate(date: Date): string;
}

/**
 * Create a translator object which provides translation services
 * @param lang Pass Astro.currentLocale here
 */
export function getTranslator(lang: AstroCurrentLocale): Translator {
	const currentLocale = checkAstroLocale(lang);

	let map: TranslationMap;
	switch (currentLocale) {
		case 'en':
			map = TranslationEN;
			break;
		case 'ko':
			map = TranslationKO;
			break;
		case 'th':
			map = TranslationTH;
			break;
		case 'ww':
			map = TranslationWW;
			break;
	}

	return {
		currentLocale,

		getRouteToLocale: (path: string, locale: Language = defaultLocale) => {
			let localeFreePath = `${path}`;
			const locales = Object.keys(languages);
			locales.forEach((l) => {
				const prefix = `/${l}`;
				if (localeFreePath.startsWith(prefix)) {
					localeFreePath = localeFreePath.slice(prefix.length);
				}
			});

			return locale === defaultLocale
				? localeFreePath
				: `/${locale}${localeFreePath}`;
		},

		getRoute: (path: string) => {
			return getRelativeLocaleUrl(lang ?? '', path);
		},

		getText: (
			label: keyof TranslationMap,
			variables?: Record<string, string>,
		) => {
			let result = map[label];

			if (currentLocale === 'ww' && result.length > 0 && result[0] === '!') {
				result = readTranslationMap(result.slice(1));
			}

			if (variables !== undefined) {
				for (let [name, val] of Object.entries(variables)) {
					result = result.replaceAll('${' + name + '}', val);
				}
			}

			return result;
		},

		formatDate(date) {
			switch (currentLocale) {
				case 'ko':
					// Korean: 2024년 1월 15일 (No zero prefix)
					return `${date.getUTCFullYear()}년 ${
						date.getUTCMonth() + 1
					}월 ${date.getUTCDate()}일`;
				default:
					// Note: Thai also gets yyyy-mm-dd because Thai date format sucks.

					// Default returns yyyy-mm-dd, the best date format!
					return `${date.getUTCFullYear()}-${formatNumberWithLeadingZero(
						date.getUTCMonth() + 1,
						2,
					)}-${formatNumberWithLeadingZero(date.getUTCDate(), 2)}`;
			}
		},
	};
}
