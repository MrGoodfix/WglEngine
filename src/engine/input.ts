// input.ts? more like keyboard.ts

const keys = {
    // arrows
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,

    // space bar
    Space: 32,

    // numbers 
    Zero: 48,
    One: 49,
    Two: 50,
    Three: 51,
    Four: 52,
    Five : 53,
    Six : 54,
    Seven : 55,
    Eight : 56,
    Nine : 57,

    // Alphabets
    A : 65,
    D : 68,
    E : 69,
    F : 70,
    G : 71,
    I : 73,
    J : 74,
    K : 75,
    L : 76,
    Q : 81,
    R : 82,
    S : 83,
    W : 87
}

const lastKeyCode: number = 222;

const previousKeyStatuses: boolean[] = [];
const keyPressedStatuses: boolean[] = [];
const keyClickedStatuses: boolean[] = [];

function onKeyDown(event: KeyboardEvent) {
    // TODO - KeyboardEvent.keyCode is deprecated; specs recommend KeyboardEvent.code or KeyboardEvent.key.
    // Both of those are strings. Will need to refactor this later.
    keyPressedStatuses[event.keyCode] = true;
}

function onKeyUp(event: KeyboardEvent) {
    // TODO - KeyboardEvent.keyCode is deprecated; specs recommend KeyboardEvent.code or KeyboardEvent.key.
    // Both of those are strings. Will need to refactor this later.
    keyPressedStatuses[event.keyCode] = false;
}

function init() {
    for (let i = 0; i < lastKeyCode; i++) {
        keyPressedStatuses[i] = false;
        previousKeyStatuses[i] = false;
        keyClickedStatuses[i] = false;
    }

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);
}

function isKeyPressed(keyCode: number): boolean {
    if (keyCode > lastKeyCode) return false;

    return <boolean>keyPressedStatuses[keyCode];
}

function isKeyClicked(keyCode: number) {
    if (keyCode > lastKeyCode) return false;

    return <boolean>keyClickedStatuses[keyCode];
}

function update() {
    for (let i = 0; i < lastKeyCode; i++) {
        keyClickedStatuses[i] = <boolean>((!previousKeyStatuses[i]) && keyPressedStatuses[i]);
        previousKeyStatuses[i] = <boolean>keyPressedStatuses[i];
    }
}

function cleanUp() { }

export{
    keys,
    init,
    update,
    isKeyClicked,
    isKeyPressed,
    cleanUp
};