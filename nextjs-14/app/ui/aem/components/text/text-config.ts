import { Config, MappedComponentProperties } from "@adobe/aem-react-editable-components";

export const TextEditConfig: Config<MappedComponentProperties> = {
    emptyLabel: 'Text',
    isEmpty: function(props: any) {
        return !props || !props.text || props.text.trim().length < 1;
    },
    
}