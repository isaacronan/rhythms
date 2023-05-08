import { defaultTrack } from ".";
import { AddTrackAction, ChangeNumBeatsAction, ChangeNumBeatsPerMinuteAction, ChangeTrackOnsetsAction, ChangeTrackRotationAction, ChangeTrackSampleAction, DeleteTrackAction, TogglePlayAction, ToggleTrackMuteAction } from "../types/actions";
import { createReducerRegistry, rhythmRepair } from "../utils";

const registry = createReducerRegistry();

registry.register<ChangeNumBeatsAction>('change-num-beats', (action, state) => {
    const numBeats = state.numBeats + action.delta;
    return {
        ...state,
        numBeats,
        tracks: state.tracks.map(rhythmRepair(numBeats))
    };
});

registry.register<ChangeNumBeatsPerMinuteAction>('change-num-beats-per-minute', (action, state) => {
    return {
        ...state,
        numBeatsPerMinute: state.numBeatsPerMinute + action.delta
    };
});

registry.register<ToggleTrackMuteAction>('toggle-track-mute', (action, state) => {
    return {
        ...state,
        tracks: state.tracks.map((track, index) => index === action.trackIndex ? { ...track, isMuted: !track.isMuted } : track)
    };
});

registry.register<AddTrackAction>('add-track', (action, state) => {
    return {
        ...state,
        tracks: [...state.tracks, rhythmRepair(state.numBeats)(defaultTrack)]
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
        tracks: state.tracks.map((track, index) => index === action.trackIndex ? rhythmRepair(state.numBeats)({
            ...track,
            numRotations: (track.numRotations + state.numBeats + action.delta) % state.numBeats
        }) : track)
    };
});

registry.register<ChangeTrackOnsetsAction>('change-track-onsets', (action, state) => {
    return {
        ...state,
        tracks: state.tracks.map((track, index) => index === action.trackIndex ? rhythmRepair(state.numBeats)({
            ...track,
            numStepsOn: track.numStepsOn + action.delta
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