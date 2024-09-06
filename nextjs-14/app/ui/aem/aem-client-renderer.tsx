
'use client'
import React from 'react';

import { Page } from '@adobe/aem-react-editable-components';
import { Constants, Model, ModelManager } from '@adobe/aem-spa-page-model-manager';
import { JSX } from 'react/jsx-runtime';
import { initialiseAEMComponents } from './components/import-component';
import { CustomModelClient } from './CustomModelClient';

export function AemClientRenderer({
	pagePath,
	isInEditor,
	project,
	modelHost,
	modelUrl
}: {
	pagePath: string,
	isInEditor: boolean,
	project: string,
	modelHost: string,
	modelUrl: string,
}): JSX.Element {

	initialiseAEMComponents(project);

	const [loading, setLoading] = React.useState<boolean>(true);
	const [model, setModel] = React.useState<Model | undefined>(undefined);

	const effectRan = React.useRef(false);

	React.useEffect(() => {
		(async function(){
			if (effectRan.current) {
				return;
			}
			effectRan.current = true
			const modelClient = new CustomModelClient(modelHost);
			let aemPageModel: Model
			try {
				aemPageModel =  await modelClient.fetch(modelUrl);
			} catch (e) {
				aemPageModel = {
					":path": pagePath
				}
			}
			await ModelManager.initialize({
				model: aemPageModel,
				path: pagePath
			});
			setModel(aemPageModel);
			setLoading(false);
		})();
	  }, []);

	return loading || !model ? <div>loading...</div> 
	// @ts-ignore
	: <Page isInEditor={isInEditor} cqPath={model[Constants.PATH_PROP]} cqItems={model[Constants.ITEMS_PROP]} cqItemsOrder={model[Constants.ITEMS_ORDER_PROP]}></Page>;
}
