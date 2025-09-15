import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);

	const [updatedParams, setUpdatedParams] =
		useState<ArticleStateType>(defaultArticleState);

	const updateParams = (param: keyof ArticleStateType, value: OptionType) => {
		setUpdatedParams((prevParam) => ({ ...prevParam, [param]: value }));
	};

	const resetParams = () => {
		setArticleParams(defaultArticleState);
		setUpdatedParams(defaultArticleState);
	};

	const submitParams = () => {
		setArticleParams(updatedParams);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				params={updatedParams}
				onChange={updateParams}
				onSubmit={submitParams}
				onReset={resetParams}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
