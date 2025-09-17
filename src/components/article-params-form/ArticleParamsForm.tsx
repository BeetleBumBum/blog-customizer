import { ArrowButton } from 'src/ui/arrow-button/ArrowButton';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';

import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickCloseOrEsc } from 'src/ui/select/hooks/useOutsideClickClose';

type TArticleParamsForm = {
	initialParams: ArticleStateType;
	onSubmit: (params: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialParams,
	onSubmit,
	onReset,
}: TArticleParamsForm) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(initialParams);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickCloseOrEsc({
		isSidebarOpen,
		rootRef: sidebarRef,
		onClose: () => setIsSidebarOpen(false),
		onChange: setIsSidebarOpen,
	});

	const updateParams = (param: keyof ArticleStateType, value: OptionType) => {
		setArticleParams((prevParam) => ({ ...prevParam, [param]: value }));
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onSubmit(articleParams);
	};

	const handleReset = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleParams(defaultArticleState);
		onReset();
	};

	// показываем сайдбар
	const sidebarShow = clsx({
		[styles.container]: true,
		[styles.container_open]: isSidebarOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => {
					setIsSidebarOpen(!isSidebarOpen);
				}}
			/>
			<aside ref={sidebarRef} className={sidebarShow}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<div style={{ blockSize: 50 }}></div>

					{/* шрифт */}
					<Select
						selected={articleParams.fontFamilyOption}
						onChange={(value) => updateParams('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* размер шрифта */}
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={articleParams.fontSizeOption}
						onChange={(value) => updateParams('fontSizeOption', value)}
						title='размер шрифта'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* цвет шрифта */}
					<Select
						selected={articleParams.fontColor}
						onChange={(value) => updateParams('fontColor', value)}
						options={fontColors}
						title='цвет шрифта'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* разделитель */}
					<Separator />
					<div style={{ blockSize: 50 }}></div>

					{/* цвет фона */}
					<Select
						selected={articleParams.backgroundColor}
						onChange={(value) => updateParams('backgroundColor', value)}
						options={backgroundColors}
						title='цвет фона'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* ширина контента */}
					<Select
						selected={articleParams.contentWidth}
						onChange={(value) => updateParams('contentWidth', value)}
						options={contentWidthArr}
						title='ширина контента'
					/>

					{/* кнопки */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
