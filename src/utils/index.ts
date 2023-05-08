import { Color, IAppState, ITrack, Rhythm } from "../types";
import { Action } from "../types/actions";

export const euclideanRhythm: (stepsOn: number, stepsTotal: number) => Rhythm = (stepsOn, stepsTotal) => {
    const steps = new Array(stepsOn).fill([true]).concat(new Array(stepsTotal - stepsOn).fill([false]));
    let boundaryIndex = stepsOn;
    while (boundaryIndex < steps.length - 1) {
        boundaryIndex = Math.min(steps.length - boundaryIndex, boundaryIndex)
        for (let i = 0; i < boundaryIndex; i++) {
            const el = steps.pop();
            steps[i] = [...steps[i], ...el];
        }
    }
    return steps.reduce((acc, el) => ([...acc, ...el]), []);
};

export const rotate: (rhythm: Rhythm, numRotations: number) => Rhythm = (rhythm, numRotations) => {
    const a = rhythm.slice(0, rhythm.length - numRotations);
    const b = rhythm.slice(rhythm.length - numRotations);
    return b.concat(a);
};

export const createReducerRegistry = () => {
    const registry: { [actionType: string]: any[] } = {};

    const register: <A extends Action>(actionType: A['type'], reducer: (action: A, state: IAppState) => IAppState) => void = (actionType: Action['type'], reducer: any) => {
        registry[actionType] = [...(registry[actionType] || []), reducer]
    };

    const reducer: (appState: IAppState, action: Action) => IAppState = (appState, action) => {
        const reducers = registry[action.type] || [];
        const updatedAppState = reducers.reduce((acc, reducer) => reducer(action, acc), appState);
        return updatedAppState;
    };

    return { register, reducer };
};

export const rhythmRepair: (numBeats: number) => (track: ITrack) => ITrack = (numBeats) => (track) => {
    const numStepsOn = Math.min(numBeats, track.numStepsOn);
    const numRotations = Math.min(track.numRotations, numBeats) % numBeats;
    return {
        ...track,
        numRotations,
        numStepsOn,
        rhythm: rotate(euclideanRhythm(numStepsOn, numBeats), numRotations)
    }
};

export const colorToRgb: (color: Color) => string = ([r, g, b]) => `rgb(${r},${g},${b})`;

const colorGenerator: (bounds: [number, number]) => () => Color = (bounds) => {
    const PRIME = 2 ** 7 - 1;
    const seed = Math.floor(Math.random() * 256);
    const [lower, upper] = bounds;
    const range = upper - lower;
    const delta = Math.floor(range / 3);
    let currentColor = [seed, lower + ((seed + delta) % range), lower + ((seed + 2 * delta) % range)] as Color;
    let cursor = 0;

    return () => {
        const i = cursor % 3;
        currentColor[i] = (currentColor[i] + PRIME) % 256;
        cursor += 1;
        return [...currentColor];
    };
};

export const generateColor = colorGenerator([0, 256]);