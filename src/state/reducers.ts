import { createDefaultTrack } from ".";
import { AddTrackAction, ChangeBeatDivisionAction, ChangeNumBeatsAction, ChangeNumBeatsPerMinuteAction, ChangeTrackOnsetsAction, ChangeTrackRotationAction, ChangeTrackSampleAction, DeleteTrackAction, TogglePlayAction, ToggleTrackMuteAction } from "../types/actions";
import { createReducerRegistry, generateColor, rhythmRepair } from "../utils";

const registry = createReducerRegistry();

registry.register<ChangeNumBeatsAction>('change-num-beats', (action, state) => {
    const numBeats = state.numBeats + action.delta;
    return {
        ...state,
        numBeats,
        tracks: state.tracks.map(rhythmRepair(numBeats * state.beatDivision))
    };
});

registry.register<ChangeNumBeatsPerMinuteAction>('change-num-beats-per-minute', (action, state) => {
    return {
        ...state,
        numBeatsPerMinute: state.numBeatsPerMinute + action.delta
    };
});

registry.register<ChangeBeatDivisionAction>('change-beat-division', (action, state) => {
    const beatDivision = state.beatDivision + action.delta;
    return {
        ...state,
        beatDivision,
        tracks: state.tracks.map(rhythmRepair(state.numBeats * beatDivision))
    };
});

registry.register<ToggleTrackMuteAction>('toggle-track-mute', (action, state) => {
    console.log('mute')
    return {
        ...state,
        tracks: state.tracks.map((track, index) => index === action.trackIndex ? { ...track, isMuted: !track.isMuted } : track)
    };
});

registry.register<AddTrackAction>('add-track', (action, state) => {
    return {
        ...state,
        tracks: [...state.tracks, rhythmRepair(state.numBeats * state.beatDivision)(createDefaultTrack())]
    };
});

registry.register<DeleteTrackAction>('delete-track', (action, state) => {
    return {
        ...state,
        tracks: state.tracks.filter((track, index) => index !== action.trackIndex)
    };
});

registry.register<ChangeTrackSampleAction>('change-track-sample', (action, state) => {
    return {
        ...state,
        tracks: state.tracks.map((track, index) => index === action.trackIndex ? { ...track, sampleName: action.sampleName } : track)
    };
});

registry.register<ChangeTrackRotationAction>('change-track-rotation', (action, state) => {
    return {
        ...state,
        tracks: state.tracks.map((track, index) => index === action.trackIndex ? rhythmRepair(state.numBeats * state.beatDivision)({
            ...track,
            numRotations: (track.numRotations + state.numBeats * state.beatDivision + action.delta) % (state.numBeats * state.beatDivision)
        }) : track)
    };
});

registry.register<ChangeTrackOnsetsAction>('change-track-onsets', (action, state) => {
    return {
        ...state,
        tracks: state.tracks.map((track, index) => index === action.trackIndex ? rhythmRepair(state.numBeats * state.beatDivision)({
            ...track,
            numStepsOn: Math.min(Math.max(track.numStepsOn + action.delta, 1), state.numBeats * state.beatDivision)
        }) : track)
    };
});

registry.register<TogglePlayAction>('toggle-play', (action, state) => {
    return {
        ...state,
        isPlaying: !state.isPlaying
    };
});

export const appReducer = registry.reducer;