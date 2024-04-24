import type { JSX } from 'preact/jsx-runtime';

const JS_TO_CSS = {};
const CSS_REGEX = /[A-Z]/g;
const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

// basic hash code implementation loosely based on the one used in java, rshift to truncate to 32bit
const hash = (str: string) => [...str].reduce((p,v) => (101*p+v.charCodeAt(0)) >>> 0, 11).toString(36);

const styleTag = document.head.appendChild(document.createElement('style'));

const classes = [];

/**
 * rendering logic taken from preacts' jsx runtime.
 */

export function css<T extends Record<string, JSX.CSSProperties>>(styling: T) {
	const transformed = Object.entries(styling).reduce((p,v) => {
		const compiled = Object.entries(v[1]).map(([prop, val]) => {
			if (val === null || val === '') return;
			const name = prop[0] == '-' ? prop : (JS_TO_CSS[prop] || (JS_TO_CSS[prop] = prop.replace(CSS_REGEX, '-$&').toLowerCase()));
			const suffix = (typeof val === 'number' && !name.startsWith('--') && !IS_NON_DIMENSIONAL.test(name)) ? 'px;' : ';';
			return `${name}:${val}${suffix}`;
		}).join('');
		const className = `_${v[0].replace(CSS_REGEX, '-$&').toLowerCase()}__${hash(compiled)}`;
		classes.push(`.${className}{${compiled}}`);
		p[v[0]] = className;
		return p;
	}, {});

	styleTag.innerHTML = classes.join('');

	return transformed  as Record<keyof T, string>;
}