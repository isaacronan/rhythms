import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useRef } from "react";
import { ISample, ISampleControls } from "../types";

const SampleContext = createContext<ISampleControls | null>(null);

export const SampleService = (props: PropsWithChildren<{ samples: ISample[] }>) => {
    const sampleBuffers = useRef<AudioBuffer[]>([]);
    const audioContext = useRef<AudioContext>(new AudioContext());

    useEffect(() => {
        Promise.all(
            props.samples.map(sample => fetch(sample.assetPath).then(r => r.arrayBuffer()).then(r => audioContext.current.decodeAudioData(r)))
        ).then(audioBuffers => sampleBuffers.current = audioBuffers);
    }, [props.samples]);

    const play = (sampleNames: string[]) => {
        sampleNames.forEach(sampleName => {
            const index = props.samples.findIndex(sample => sample.sampleName === sampleName);
            const source = audioContext.current.createBufferSource();
            source.start(0);
            source.buffer = sampleBuffers.current[index];
            source.connect(audioContext.current.destination);
        });
    };

    const samples = useMemo(() => ([...props.samples]), [props.samples]);
    
    return (
        <SampleContext.Provider value={{ play, samples }}>
            {props.children}
        </SampleContext.Provider>
    );
};

export const useSamples = () => {
    const sampleControls = useContext(SampleContext)!;

    return sampleControls;
}