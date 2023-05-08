export interface Action<T extends string = string> {
    type: T;
}

export interface ChangeNumBeatsAction extends Action<'change-num-beats'> {
    delta: number;
}

export interface ChangeNumBeatsPerMinuteAction extends Action<'change-num-beats-per-minute'> {
    delta: number;
}

export interface ToggleTrackMuteAction extends Action<'toggle-track-mute'> {
    trackIndex: number;
}

export interface AddTrackAction extends Action<'add-track'> {}

export interface DeleteTrackAction extends Action<'delete-track'> {
    trackIndex: number;
}

export interface ChangeTrackSampleAction extends Action<'change-track-sample'> {
    trackIndex: number;
    sampleName: string;
}

export interface ChangeTrackRotationAction extends Action<'change-track-rotation'> {
    trackIndex: number;
    delta: number;
}

export interface ChangeTrackOnsetsAction extends Action<'change-track-onsets'> {
    trackIndex: number;
    delta: number;
}