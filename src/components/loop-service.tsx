import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Loop, LoopControls } from "../types";
import { useSampleControls } from "./sample-service";
import { sleep } from "../utils";

const LoopContext = createContext<LoopControls | null>(null);

export const LoopService = (props: PropsWithChildren) => {
    const [progress, setProgress] = useState(0);
    const beatInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const sampleControls = useSampleControls();
    const playSamples = useRef(sampleControls.play);
    const currentLoop = useRef<Loop | null>(null);

    useEffect(() => {
        playSamples.current = sampleControls.play;
    }, [sampleControls])

    const play = (loop: Loop) => {
        currentLoop.current = loop;
        const beatDuration = 60 / currentLoop.current.bpm;
        let curBeatNumber = 0;
        playSamples.current(currentLoop.current.beats[curBeatNumber]);
        setProgress((curBeatNumber + 1) / currentLoop.current.beats.length)
        curBeatNumber = (curBeatNumber + 1) % currentLoop.current.beats.length;
        beatInterval.current = setInterval(() => {
            if (curBeatNumber >= currentLoop.current!.beats.length) {
                curBeatNumber = 0;
            } else {
                playSamples.current(currentLoop.current!.beats[curBeatNumber]);
                setProgress((curBeatNumber + 1) / currentLoop.current!.beats.length)
                curBeatNumber = (curBeatNumber + 1) % currentLoop.current!.beats.length;
            }
        }, 1000 * beatDuration);
    };

    const patch = (loop: Loop) => {
        currentLoop.current = loop;
    };

    const stop = () => {
        clearInterval(beatInterval.current!);
        beatInterval.current = null;
    };

    return (
        <LoopContext.Provider value={{ play, stop, progress, patch }}>
            {props.children}
        </LoopContext.Provider>
    );
};

export const useLoop = () => {
    const { play, stop, progress, patch } = useContext(LoopContext)!;

    return { play, stop, progress, patch };
}