import { useEffect } from 'react';

type TUseOverlayClickClose = {
	isOpen: boolean;
	onClose?: () => void;
	overlayRef: React.RefObject<HTMLDivElement>;
};

export const useOverlayClickClose = ({
	isOpen,
	overlayRef: ovrlayRef,
	onClose,
}: TUseOverlayClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !ovrlayRef.current?.contains(target)) {
				isOpen && onClose?.();
			}
		};

		window.addEventListener('mouseup', handleClick);

		return () => {
			window.removeEventListener('mouseup', handleClick);
		};
	}, [onClose, isOpen, ovrlayRef]);
};
