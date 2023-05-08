export type Rhythm = boolean[];

export interface ISample {
    sampleName: string;
    assetPath: string;
};

export interface ISampleControls {
    play: (sampleNames: string[]) => void;
    samples: ISample[];
}

export interface ITrack {
    numStepsOn: number;
    numRotations: number;
    sampleName: string;
    isMuted: boolean;
    stepOverrideIndices: number[];
    rhythm: Rhythm;
}

export interface ITrackControlProps {
    samples: ISample[];
    selectedSampleName: string;
    isMuted: boolean;
    euclideanRhythm: Rhythm;
    effectiveRhythm: Rhythm;
    onToggleMute: () => void;
    onChangeSample: (sampleName: string) => void;
    onDelete: () => void;
    onRotateRight: () => void;
    onRotateLeft: () => void;
    onIncrementOnsets: () => void;
    onDecrementOnsets: () => void;
}

export interface ILoop {
    steps: (() => void)[];
    stepDuration: number;
};

export interface ILoopControls {
    start: (loop: ILoop) => void;
    patch: (loop: ILoop) => void;
    stop: () => void;
}

export interface IAppState {
    numBeats: number
    numBeatsPerMinute: number;
    isPlaying: boolean;
    tracks: ITrack[];
}

export interface IOrchestrationControls {
    play: () => void;
    stop: () => void;
}