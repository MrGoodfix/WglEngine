import { Resource } from "../core/resource";
import * as map from "../core/resource_map";

const unload = map.unload;
const has = map.has;
const get = map.get;

function decodeResponse(data: Response): Promise<string> {
    return data.text();
}

function parseText(text: Resource): Resource {
    return <string>text;
}

function load(path: string): Promise<void> {
    return map.loadDecodeParse(path, decodeResponse, parseText);
}

export {
    has, 
    get,
    load,
    unload
}