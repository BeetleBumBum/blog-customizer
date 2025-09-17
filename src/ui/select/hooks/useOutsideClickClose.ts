import { useEffect } from 'react';

type UseOutsideClickCloseOrEsc = {
	isSidebarOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickCloseOrEsc = ({
	isSidebarOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickCloseOrEsc) => {
	useEffect(() => {
		if (!isSidebarOpen) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isSidebarOpen && onClose?.();
				onChange?.(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				isSidebarOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose, onChange, isSidebarOpen]);
};
