import { Model, ModelClient } from '@adobe/aem-spa-page-model-manager';

export class CustomModelClient extends ModelClient {
	async fetch<T extends Model>(modelPath: string): Promise<T> {
		const url = `${this.apiHost}${modelPath?.endsWith('/') ? modelPath.slice(0, -1) : modelPath}.model.json`;

		console.log('@----------Fetching aem model json from ' + url)

		// to remove
        const username = 'admin';
        const password = 'admin';
		const response = await fetch(url, {headers: {'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')}});
		const pageModel = await response.json();
    	return pageModel;
	}
}
