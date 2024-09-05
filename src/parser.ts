import { X2jOptions, XMLParser } from "fast-xml-parser";

const options: X2jOptions = {
  ignoreAttributes : false,
  attributeNamePrefix: '',
  ignoreDeclaration: true,
  textNodeName: '$t',
  alwaysCreateTextNode: true,
  isArray: (name, _jpath, _isLeafNode, isAttribute) => { 
    return !isAttribute && name !== 'coverage'
  }
}

export const parser = new XMLParser(options);