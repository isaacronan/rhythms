export type Rhythm = boolean[];
export type Color = [r: number, g: number, b: number];

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
    color: Color;
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

export interface ISequencerChartProps {
    euclideanRhythm: Rhythm;
    effectiveRhythm: Rhythm;
    numBeats: number;
    beatDivision: number;
    currentStep: number | null;
    color: string;
}

export interface ILoop {
    steps: (() => void)[];
    stepDuration: number;
};

export interface ILoopControls {
    start: (loop: ILoop) => void;
    patch: (loop: ILoop) => void;
    stop: () => void;
    currentStep: number;
}

export interface IAppState {
    numBeats: number;
    numBeatsPerMinute: number;
    beatDivision: number;
    isPlaying: boolean;
    tracks: ITrack[];
}
