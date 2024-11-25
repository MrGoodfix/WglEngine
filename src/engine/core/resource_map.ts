class MapEntry {
    private _refCount: number;

    constructor(private _data: string) {
        this._refCount = 1;
    }

    decRef() { this._refCount--; }
    incRef() { this._refCount++; }

    set data(data: string) {
        this._data = data;
    }
    get date() { return this._data; }

    canRemove(): boolean { return (this._refCount == 0); }
}

const map = new Map();
let outstandingPromises: (Promise<Response>|Promise<void>)[] = [];

function has(path: string): boolean { return map.has(path); }

function get(path: string): string {
    if (!has(path)) {
        throw Error("Error [" + path + "]: not loaded");
    }
    return map.get(path);
}

function set(key: string, value: string) {
    console.log("Resource map set " + key);
    map.set(key, value); 
}

/*
function set(key, value) { 
    mMap.get(key).set(value);
}
*/

function loadRequested(path: string) {
    map.set(path, new MapEntry(""));
}

function incRef(path: string) {
    map.get(path).incRef();
}

function unload(path: string): boolean {
    const entry = map.get(path);
    entry.decRef();
    if (entry.canRemove()) {
        map.delete(path);
    }
    return entry.canRemove();
}

function pushPromise(p: (Promise<Response>|Promise<void>)) {
    outstandingPromises.push(p);
}

/*
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
*/

function loadDecodeParse(
    path: string, 
    decodeResponseResource: (p: Response) => Promise<string>, 
    parseTextResource: (p: string) => string): Promise<void> {
    let fetchPromise: Promise<void>;
    if (!has(path)) {
        loadRequested(path);
        fetchPromise = fetch(path)
            .then(res => decodeResponseResource(res))
            .then(data => parseTextResource(data))
            .then(parsed => { return set(path, parsed) })
            .catch(err => { throw err });
        pushPromise(fetchPromise);
        return fetchPromise;
    } else {
        incRef(path); // increase the reference count
    }
    return Promise.resolve();
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