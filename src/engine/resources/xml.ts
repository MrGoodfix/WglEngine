import { Resource } from "../core/resource";
import * as map from "../core/resource_map";

const unload = map.unload;
const has = map.has;
const get = map.get;

const parser = new DOMParser();

function decodeXML(data: Response): Promise<Resource> {
    return data.text();
}

function parseXML(text: Resource): Resource {
    return parser.parseFromString(<string>text, "text/xml");
}

function load(path: string): Promise<void> {
    return map.loadDecodeParse(path, decodeXML, parseXML);
}

export {
    has, 
    get,
    load,
    unload
}