import { IAppState, ITrack } from "../types";
import { euclideanRhythm } from "../utils";

const defaultNumBeats = 16;
const defaultNumStepsOn = 8;

export const defaultTrack: ITrack = {
    isMuted: false,
    numRotations: 0,
    numStepsOn: defaultNumStepsOn,
    sampleName: 'kick',
    stepOverrideIndices: [],
    rhythm: euclideanRhythm(defaultNumStepsOn, defaultNumBeats)
}

export const initialAppState: IAppState = {
    isPlaying: false,
    numBeats: defaultNumBeats,
    numBeatsPerMinute: 120,
    tracks: [
        defaultTrack
    ]
};