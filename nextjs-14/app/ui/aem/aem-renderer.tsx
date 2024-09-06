
import { JSX } from 'react/jsx-runtime';
import { AemClientRenderer } from './aem-client-renderer';

export function AemRenderer({
	pagePath,
	host,
	isAemPreview,
	pathPrefix,
	project
}: {
	host: string,
	pagePath: string,
	isAemPreview: boolean,
	pathPrefix: string,
	project: string,
}): JSX.Element {
	
	const url = !pagePath?.startsWith(pathPrefix) && !pagePath.startsWith('/conf/') && !pagePath.startsWith('/content/experience-fragments') ? pathPrefix + pagePath : pagePath;
	return <><AemClientRenderer isInEditor={isAemPreview} modelHost={host} modelUrl={url} pagePath={pagePath} project={project} /></>
}
