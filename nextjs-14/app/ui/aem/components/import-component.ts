import { MapTo } from "@adobe/aem-react-editable-components";
import { AEMText } from "./text/aem-text";

export const initialiseAEMComponents = (project: string) => {
    MapTo([`${project}/components/text`])(AEMText)
}