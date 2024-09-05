import { XmlBuilderOptions, XMLBuilder } from "fast-xml-parser";

const options: XmlBuilderOptions = {
  ignoreAttributes : false,
  attributeNamePrefix: '',
  textNodeName: '$t',
  suppressBooleanAttributes: false,
}

export const builder = new XMLBuilder(options);