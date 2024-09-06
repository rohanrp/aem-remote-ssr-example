import { EditableComponent } from '@adobe/aem-react-editable-components';
import { lazy } from 'react';
import { TextEditConfig } from './text-config';


const LazyLoadedText = lazy(() => import('./text-component'));

export const AEMText = (props: any) => <EditableComponent {...props}  config={TextEditConfig}><LazyLoadedText /></EditableComponent>;