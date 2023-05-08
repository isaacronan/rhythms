import { IAppState, ITrack } from "../types";

export const defaultTrack: ITrack = {
    isMuted: false,
    numRotations: 0,
    numStepsOn: 8,
    sampleName: 'kick',
    stepOverrideIndices: [],
}

export const initialAppState: IAppState = {
    isPlaying: false,
    numBeats: 16,
    numBeatsPerMinute: 120,
    tracks: [
        defaultTrack
    ]
};