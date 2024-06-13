import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	const styleContainer = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const stylesArrow = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: isOpen,
	});
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styleContainer}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={stylesArrow} />
		</div>
	);
};
