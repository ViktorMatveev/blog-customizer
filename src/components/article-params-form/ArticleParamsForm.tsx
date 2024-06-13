import { ArrowButton } from 'components/arrow-button';
import { Text } from '../text';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from '../radio-group';
import { useOverlayClickClose } from './hooks/useOverlayClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState(props: ArticleStateType): void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const stylesContainer = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	const handleOpenForm = () => {
		setIsOpen(!isOpen);
	};
	const handleSubmitForm = (evt: React.FormEvent) => {
		evt.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	const handleResetForm = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleState({
			...articleState,
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		});
	};

	const rootRef = useRef<HTMLDivElement>(null);

	useOverlayClickClose({
		isOpen: isOpen,
		onClose: () => setIsOpen(false),
		overlayRef: rootRef,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={handleOpenForm} />
			<aside className={stylesContainer}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text
						as={'h2'}
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='center'>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}></Select>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						name='font-size'
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}></Select>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}></Select>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
