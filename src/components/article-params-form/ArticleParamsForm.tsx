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
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

// Подъём состояния через пропсы
type TArticleParamsFormProps = {
	params: ArticleStateType;
	onChange: (param: keyof ArticleStateType, value: OptionType) => void;
	onSubmit: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	params,
	onChange,
	onSubmit,
	onReset,
}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		onSubmit();
	};

	const handleReset = (evt: React.FormEvent) => {
		evt.preventDefault();
		onReset();
	};

	// показываем сайдбар
	const sidebarShow = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
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
						selected={params.fontFamilyOption}
						onChange={(value) => onChange('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* размер шрифта */}
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={params.fontSizeOption}
						onChange={(value) => onChange('fontSizeOption', value)}
						title='размер шрифта'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* цвет шрифта */}
					<Select
						selected={params.fontColor}
						onChange={(value) => onChange('fontColor', value)}
						options={fontColors}
						title='цвет шрифта'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* разделитель */}
					<Separator />
					<div style={{ blockSize: 50 }}></div>

					{/* цвет фона */}
					<Select
						selected={params.backgroundColor}
						onChange={(value) => onChange('backgroundColor', value)}
						options={backgroundColors}
						title='цвет фона'
					/>
					<div style={{ blockSize: 47 }}></div>

					{/* ширина контента */}
					<Select
						selected={params.contentWidth}
						onChange={(value) => onChange('contentWidth', value)}
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
