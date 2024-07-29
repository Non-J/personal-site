import type { Component, JSX } from 'solid-js';

const Button: Component<{
	href?: string;
	onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
	text: string;
	className?: string;
	noWrap?: string;
	highlightedColor?: boolean;
	disabled?: boolean;
}> = ({
	href,
	onClick,
	text,
	className,
	noWrap = true,
	highlightedColor = false,
	disabled = false,
}) => {
	let finalClass =
		'select-none overflow-hidden rounded-full py-4 text-center transition duration-200';

	if (noWrap) {
		finalClass += ' whitespace-nowrap';
	}

	if (!disabled) {
		if (highlightedColor) {
			finalClass +=
				' bg-rose-700 hover:bg-rose-900 text-neutral-100 text-opacity-90';
		} else {
			finalClass +=
				' bg-indigo-700 hover:bg-indigo-800 text-neutral-100 text-opacity-90';
		}
	} else {
		if (highlightedColor) {
			finalClass +=
				' pointer-events-none cursor-default bg-rose-900 text-neutral-100 text-opacity-50';
		} else {
			finalClass +=
				' pointer-events-none cursor-default bg-indigo-900 text-neutral-100 text-opacity-50';
		}
	}

	if (className) {
		finalClass += ' ' + className;
	}

	return onClick ? (
		<button class={finalClass} onClick={onClick} disabled={disabled}>
			{text}
		</button>
	) : (
		<a class={finalClass} href={href ?? '#'} aria-disabled={disabled}>
			{text}
		</a>
	);
};

export { Button };
