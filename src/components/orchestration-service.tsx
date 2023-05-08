import { useLoop } from "./loop-service";
import { useSamples } from "./sample-service";
import { ILoop, IOrchestrationControls } from "../types";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from "react";
import { useAppState } from "./state-service";

const OrchestrationContext = createContext<IOrchestrationControls | null>(null);

export const OrchestrationService = (props: PropsWithChildren) => {
    const { start, stop, patch } = useLoop();
    const { play } = useSamples();
    const state = useAppState();

    const loop = useMemo<ILoop>(() => {
        const steps = [];
        for (let beatNum = 0; beatNum < state.numBeats; beatNum++) {
            const sampleNames: string[] = [];
            state.tracks.forEach((track, index) => {
                if (track.rhythm[beatNum] && !track.isMuted) {
                    sampleNames.push(track.sampleName);
                }
            })
            steps.push(() => play(sampleNames));
        }
        return {
            steps,
            stepDuration: 1000 * 60 / state.numBeatsPerMinute
        }
    }, [state.tracks, state.numBeatsPerMinute]);

    useEffect(() => {
        patch(loop);
    }, [loop]);

    return (
        <OrchestrationContext.Provider value={{ play: () => start(loop), stop: () => stop() }}>
            {props.children}
        </OrchestrationContext.Provider>
    );
};

export const useOrchestration = () => {
    const orchestrationControls = useContext(OrchestrationContext)!;

    return orchestrationControls;
}