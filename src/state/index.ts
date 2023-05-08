import { IAppState, ITrack } from "../types";
import { euclideanRhythm } from "../utils";

const defaultNumBeats = 4;
const defaultBeatDivision = 4;
const defaultNumStepsOn = 4;

export const defaultTrack: ITrack = {
    isMuted: false,
    numRotations: 0,
    numStepsOn: defaultNumStepsOn,
    sampleName: 'kick',
    stepOverrideIndices: [],
    rhythm: euclideanRhythm(defaultNumStepsOn, defaultNumBeats * defaultBeatDivision)
}

export const initialAppState: IAppState = {
    isPlaying: false,
    numBeats: defaultNumBeats,
    numBeatsPerMinute: 120,
    beatDivision: defaultBeatDivision,
    tracks: [
        defaultTrack
    ]
};

// TODO implement beat divisions (e.g. 1/4, 1/3); add extra buffered audio elements