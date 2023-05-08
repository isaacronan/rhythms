import { useLoop } from "./loop-service";
import { useSamples } from "./sample-service";
import { ILoop } from "../types";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { useAppState } from "./state-service";

export const OrchestrationService = (props: PropsWithChildren) => {
    const { start, stop, patch } = useLoop();
    const { play } = useSamples();
    const state = useAppState();

    const loop = useMemo<ILoop>(() => {
        const steps = [];
        for (let beatNum = 0; beatNum < state.numBeats * state.beatDivision; beatNum++) {
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
            stepDuration: 1000 * 60 / (state.numBeatsPerMinute * state.beatDivision)
        }
    }, [state.tracks, state.numBeatsPerMinute]);

    useEffect(() => {
        patch(loop);
    }, [loop]);

    useEffect(() => {
        if (state.isPlaying) {
            start(loop);
        } else {
            stop();
        }
    }, [state.isPlaying])

    return (
        <>
            {props.children}
        </>
    );
};
