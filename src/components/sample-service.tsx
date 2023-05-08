import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ISample, ISampleControls } from "../types";

const SampleContext = createContext<ISampleControls | null>(null);

const BUFFER = 1;

const createBufferedSamples = (samples: ISample[]) => samples.map(sample => new Array(BUFFER).fill(null).map(() => sample)).reduce((acc, cur) => ([...acc, ...cur]));

export const SampleService = (props: PropsWithChildren<{ samples: ISample[] }>) => {
    const [audioElementSamples, setAudioElementSamples] = useState<ISample[]>(createBufferedSamples(props.samples));
    const audioElementRefs = useRef<HTMLMediaElement[]>([]);
    const audioElementSampleRefs = useRef<ISample[]>(createBufferedSamples(props.samples));

    const playIndex = (index: number) => {
        setTimeout(() => audioElementRefs.current[index].play());
    };

    const play = (sampleNames: string[]) => {
        sampleNames.forEach(sampleName => {
            const idleAudioElementIndices = audioElementSampleRefs.current.map((sample, index) => {
                if (sample.sampleName !== sampleName) return null;
                const element = audioElementRefs.current[index];
                if (element === undefined) return null;
                if (!element.paused && element.duration > 0) return null;
                return index;
            }).filter(index => index !== null);

            if (idleAudioElementIndices.length <= BUFFER) {
                const sample = props.samples.find(sample => sample.sampleName === sampleName);
                for (let i = 0; i <= BUFFER - idleAudioElementIndices.length; i++) {
                    setAudioElementSamples(prev => ([...prev, sample!]));
                    audioElementSampleRefs.current.push(sample!);
                }
            }
            
            if (idleAudioElementIndices.length > 0) {
                audioElementRefs.current[idleAudioElementIndices[0]!].play()
            } else {
                playIndex(audioElementSampleRefs.current.length - 1);
            }
            
        });
    };

    const samples = useMemo(() => ([...props.samples]), [props.samples]);
    
    return (
        <SampleContext.Provider value={{ play, samples }}>
            {props.children}
            <div style={{ display: 'none' }}>
                {audioElementSamples.map((sample, index) => (
                    <audio ref={node => {
                        if (node) {
                            audioElementRefs.current[index] = node;
                        } else {
                            delete audioElementRefs.current[index];
                        }
                    }} src={sample.assetPath}></audio>
                ))}
            </div>
        </SampleContext.Provider>
    );
};

export const useSamples = () => {
    const sampleControls = useContext(SampleContext)!;

    return sampleControls;
}