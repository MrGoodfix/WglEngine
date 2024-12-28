import { Resource } from "../core/resource";
import * as map from "../core/resource_map";

const unload = map.unload;
const has = map.has;

function decodeResource(data: Response): Promise<ArrayBuffer> {
    return data.arrayBuffer();
}

function parseResource(data: Resource): Promise<Resource> {
    return (<AudioContext>audioContext).decodeAudioData(<ArrayBuffer>data);
}

function load(path: string): Promise<void> {
    return map.loadDecodeParse(path, decodeResource, parseResource);
}

let audioContext: AudioContext|null = null;
let backgroundAudio: AudioBufferSourceNode|null = null;

let backgroundGain: GainNode|null = null;
let cueGain: GainNode|null = null;
let masterGain: GainNode|null = null;

const defaultInitGain = 0.1;

function init() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContextClass = window.AudioContext || (<any>window).webkitAudioContext;
        audioContext = new AudioContextClass();
        masterGain = audioContext.createGain();
        masterGain.connect(audioContext.destination);
        masterGain.gain.value = defaultInitGain;

        backgroundGain = audioContext.createGain();
        backgroundGain.connect(masterGain);
        backgroundGain.gain.value = 1.0;

        cueGain = audioContext.createGain();
        cueGain.connect(masterGain);
        cueGain.gain.value = 1.0;
    }
    catch {
        throw new Error("...");
    }
}

function playCue(path: string, volume: number) {
    if (audioContext && cueGain) {
        const source = audioContext.createBufferSource();
        source.buffer = <AudioBuffer>map.get(path);
        source.start(0);

        source.connect(cueGain);
        cueGain.gain.value = volume;
    }
}

function playBackground(path: string, volume: number) {
    if (audioContext && backgroundGain && has(path)) {
        stopBackground();
        backgroundAudio = audioContext.createBufferSource();
        backgroundAudio.buffer = <AudioBuffer>map.get(path);
        backgroundAudio.loop = true;
        backgroundAudio.start(0);

        backgroundAudio.connect(backgroundGain);
        setBackgroundVolume(volume);
    }
}

function stopBackground() {
    if (backgroundAudio !== null) {
        backgroundAudio.stop(0);
        backgroundAudio = null;
    }
}

function isBackgroundPlaying(): boolean {
    return (backgroundAudio !== null);
}

function setBackgroundVolume(volume: number) {
    if (backgroundGain !== null) {
        backgroundGain.gain.value = volume;
    }
}

function incBackgroundVolume(increment: number) {
    if (backgroundGain !== null) {
        backgroundGain.gain.value += increment;

        if (backgroundGain.gain.value < 0) {
            setBackgroundVolume(0);
        }
    }
}

function setMasterVolume(volume: number) {
    if (masterGain !== null) {
        masterGain.gain.value = volume;
    }
}

function incMasterVolume(increment: number) {
    if (masterGain !== null) {
        masterGain.gain.value += increment;

        if (masterGain.gain.value < 0) {
            masterGain.gain.value = 0;
        }
    }
}

function cleanUp() {
    audioContext?.close();
    audioContext = null;
}

export {
    init,
    cleanUp,
    has,
    load,
    unload,
    playCue,
    playBackground,
    stopBackground,
    isBackgroundPlaying,
    setBackgroundVolume,
    incBackgroundVolume,
    setMasterVolume,
    incMasterVolume
}