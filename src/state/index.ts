import { Color, IAppState, ITrack } from "../types";
import { euclideanRhythm, generateColor } from "../utils";

const defaultNumBeats = 4;
const defaultBeatDivision = 4;
const defaultNumStepsOn = 4;

const defaultTrack: Omit<ITrack, 'color'> = {
    isMuted: false,
    numRotations: 0,
    numStepsOn: defaultNumStepsOn,
    sampleName: 'kick',
    stepOverrideIndices: [],
    rhythm: euclideanRhythm(defaultNumStepsOn, defaultNumBeats * defaultBeatDivision)
};

export const createDefaultTrack: () => ITrack = () => ({
    ...defaultTrack,
    color: generateColor()
});

export const initialAppState: IAppState = {
    isPlaying: false,
    numBeats: defaultNumBeats,
    numBeatsPerMinute: 120,
    beatDivision: defaultBeatDivision,
    tracks: [
        createDefaultTrack()
    ]
};

// TODO implement beat divisions (e.g. 1/4, 1/3); add extra buffered audio elements