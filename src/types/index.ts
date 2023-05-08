export type Rhythm = boolean[];

export interface Sample {
    sampleName: string;
    assetPath: string;
};

export interface Track {
    rhythm: Rhythm;
    sampleName: string;
}

export interface Loop {
    beats: Beat[];
    bpm: number;
}

export interface Beat {
    sampleNames: string[];
}

export interface SampleControls {
    play: (beat: Beat) => void;
    samples: Sample[];
}

export interface LoopControls {
    play: (beat: Loop) => void;
    patch: (beat: Loop) => void;
    stop: () => void;
    progress: number;
}