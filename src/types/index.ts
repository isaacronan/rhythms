export type Rhythm = boolean[];

export interface ISample {
    sampleName: string;
    assetPath: string;
};

export interface ISampleControls {
    play: (sampleNames: string[]) => void;
    samples: ISample[];
}

export interface Track {
    rhythm: Rhythm;
    sampleName: string;
}

export interface ILoop {
    steps: (() => void)[];
    stepDuration: number;
};

export interface ILoopControls {
    play: (loop: ILoop) => void;
    patch: (loop: ILoop) => void;
    stop: () => void;
}
