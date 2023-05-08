import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Beat, Sample, SampleControls } from "../types";

const SampleContext = createContext<SampleControls | null>(null);

export const SampleService = (props: PropsWithChildren<{ samples: Sample[] }>) => {
    const [audioElements, setAudioElements] = useState<{ [sampleName: string]: string[] }>(props.samples.reduce((acc, cur) => ({ ...acc, [cur.sampleName]: [crypto.randomUUID()]}), {}));
    const audioElementRefs = useRef<{ [audioElementUuid: string]: HTMLMediaElement }>({});

    const play = (beat: Beat) => {
        beat.sampleNames.forEach(sampleName => {
            const audioElementUuids = audioElements[sampleName];
            const idleAudioElementUuid = audioElementUuids.find(uuid => {
                const element = audioElementRefs.current[uuid];
                return !(!element.paused && element.duration > 0);
            });
            
            if (idleAudioElementUuid) {
                audioElementRefs.current[idleAudioElementUuid].play();
            } else {
                setAudioElements(prev => ({
                    ...prev,
                    [sampleName]: [...prev[sampleName], crypto.randomUUID()]
                }));
            }
        });
    };

    const samples = useMemo(() => ([...props.samples]), [props.samples]);
    
    return (
        <SampleContext.Provider value={{ play, samples }}>
            {props.children}
            <div style={{ display: 'none' }}>
                {props.samples.map(sample => (
                    <>
                        {audioElements[sample.sampleName].map(elementUuid => (
                            <audio autoPlay={true} ref={node => {
                                if (node) {
                                    audioElementRefs.current[elementUuid] = node;
                                } else {
                                    delete audioElementRefs.current[elementUuid];
                                }
                            }} src={sample.assetPath}></audio>
                        ))}
                    </>
                ))}
            </div>
        </SampleContext.Provider>
    );
};

export const useSampleControls = () => {
    const controls = useContext(SampleContext)!;

    return controls;
}

export const useSamples = () => {
    const { samples } = useContext(SampleContext)!;

    return samples;
}