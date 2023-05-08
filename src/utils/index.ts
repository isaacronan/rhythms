import { Rhythm } from "../types";

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

export const sleep = (numMilliseconds: number) => new Promise(resolve => setTimeout(resolve, numMilliseconds));