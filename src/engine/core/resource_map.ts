import { Resource } from "./resource";

class MapEntry {
    private _refCount: number;

    constructor(private _data: Resource) {
        this._refCount = 1;
    }

    decRef() { this._refCount--; }
    incRef() { this._refCount++; }

    set data(data: Resource) {
        this._data = data;
    }
    get data() { return this._data; }

    canRemove(): boolean { return (this._refCount == 0); }
}

const resMap = new Map<string, MapEntry>();
let outstandingPromises: (Promise<Response>|Promise<void>)[] = [];

function has(path: string): boolean { return resMap.has(path); }

function get(path: string): Resource {
    if (!has(path)) {
        throw Error("Error [" + path + "]: not loaded");
    }
    return <Resource>resMap.get(path)?.data;
}

function set(key: string, value: Resource) {
    console.log("Resource map set " + key);
    const entry = resMap.get(key);
    if (entry) {
        entry.data = value;
    }
}

function loadRequested(path: string) {
    console.log(`Setting map for ${path}`);
    resMap.set(path, new MapEntry(""));
    resMap.forEach((value: MapEntry, key: string) => {
        console.log(key, value);
    });
}

function incRef(path: string) {
    console.log(`Incrementing map for ${path}`);
    resMap.get(path)?.incRef();
    resMap.forEach((value: MapEntry, key: string) => {
        console.log(key, value);
    });
}

function pushPromise(p: (Promise<Response>|Promise<void>)) {
    outstandingPromises.push(p);
}

function loadDecodeParse(
    path: string, 
    decodeResource: (p: Response) => Promise<Resource>, 
    parseResource: (p: Resource) => Resource|Promise<Resource>): Promise<void> {
    let fetchPromise: Promise<void>;
    if (!has(path)) {
        loadRequested(path);
        fetchPromise = fetch(path)
            .then(res => decodeResource(res))
            .then(data => parseResource(data))
            .then(parsed => { return set(path, parsed) })
            .catch(err => { throw err });
        pushPromise(fetchPromise);
        return fetchPromise;
    } else {
        incRef(path); // increase the reference count
    }
    return Promise.resolve();
}

function unload(path: string): boolean {
    console.log(`Unloading map for ${path}`);
    console.log(JSON.stringify(resMap));
    resMap.forEach((value: MapEntry, key: string) => {
        console.log(key, value);
    });
    console.log(`Map has ${path}: ${resMap.has(path)}`);
    const entry = <MapEntry>resMap.get(path);
    if (entry) {
        console.log(JSON.stringify(entry));
        entry.decRef();
        if (entry.canRemove()) {
            resMap.delete(path);
        }
        return entry.canRemove();
    }
    else {
        throw console.error(`Could not find map entry for ${path}`);
    }
}

async function waitOnPromises() {
    console.log("Resource map is processing promises.");
    await Promise.all(outstandingPromises);
    outstandingPromises = [];
    console.log("Resource map finished processing promises.");
}

export {
    has, 
    get, 
    set,
    loadRequested,
    incRef,
    loadDecodeParse,
    unload,
    pushPromise,
    waitOnPromises
}