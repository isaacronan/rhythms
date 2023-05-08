import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ISample, ISampleControls } from "../types";

const SampleContext = createContext<ISampleControls | null>(null);

export const SampleService = (props: PropsWithChildren<{ samples: ISample[] }>) => {
    const [audioElementSamples, setAudioElementSamples] = useState<ISample[]>([]);
    const audioElementRefs = useRef<HTMLMediaElement[]>([]);
    const audioElementSampleRefs = useRef<ISample[]>([]);

    const play = (sampleNames: string[]) => {
        sampleNames.forEach(sampleName => {
            const idleAudioElementIndex = audioElementSampleRefs.current.findIndex((sample, index) => {
                if (sample.sampleName !== sampleName) return false;
                const element = audioElementRefs.current[index];
                if (element === undefined) return false;
                return !(!element.paused && element.duration > 0);
            });
            
            if (idleAudioElementIndex !== -1) {
                audioElementRefs.current[idleAudioElementIndex].play();
            } else {
                const sample = props.samples.find(sample => sample.sampleName === sampleName);
                setAudioElementSamples(prev => ([...prev, sample!]));
                audioElementSampleRefs.current.push(sample!);
            }
        });
    };

    const samples = useMemo(() => ([...props.samples]), [props.samples]);
    
    return (
        <SampleContext.Provider value={{ play, samples }}>
            {props.children}
            <div style={{ display: 'none' }}>
                {audioElementSamples.map((sample, index) => (
                    <audio autoPlay={true} ref={node => {
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