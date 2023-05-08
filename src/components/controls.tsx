import { useLoop } from "./loop-service";
import { useSamples } from "./sample-service";
import { ILoop, Track } from "../types";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { euclideanRhythm } from "../utils";

export const Controls = () => {
    const { play, stop, patch } = useLoop();
    const { play: playSamples, samples } = useSamples();
    const bars = useRef(16);
    const defaultTrack = () => ({ sampleName: 'kick', rhythm: new Array(bars.current).fill(true) });
    const [tracks, setTracks] = useState<Track[]>([defaultTrack()]);

    const loopConfig = useMemo<ILoop>(() => {
        const steps = [];
        for (let i = 0; i < bars.current; i++) {
            const sampleNames: string[] = [];
            tracks.forEach(track => {
                if (track.rhythm[i]) {
                    sampleNames.push(track.sampleName);
                }
            })
            steps.push(() => playSamples(sampleNames));
        }
        return {
            steps,
            stepDuration: 1000 * 60 / 200
        }
    }, [tracks]);

    useEffect(() => {
        patch(loopConfig);
    }, [loopConfig]);

    const handleSampleChange = useMemo(() => (trackIndex: number) => (event: ChangeEvent<HTMLSelectElement>) => {
        setTracks(prev => prev.map((track, index) => index === trackIndex ? { ...track, sampleName: event.target.value } : track))  
    }, [samples, tracks]);

    const handleRhythmChange = useMemo(() => (trackIndex: number) => (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value && Number(event.target.value) <= bars.current && Number(event.target.value) > 0) {
            setTracks(prev => prev.map((track, index) => index === trackIndex ? { ...track, rhythm: euclideanRhythm(Number(event.target.value), bars.current) } : track));
        }
    }, [bars, tracks]);

    const sampleControl = useMemo(() => (track: Track, trackIndex: number) => (
        <div>
            <select onChange={handleSampleChange(trackIndex)} value={track.sampleName} name="" id="">
                {samples.map(sample => (
                    <option value={sample.sampleName}>{sample.sampleName}</option>
                ))}
            </select>
            <input type="number" onChange={handleRhythmChange(trackIndex)} value={track.rhythm.filter(isOn => isOn).length} />
        </div>
    ), [samples]);

    const handleBars = (event: ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) > 0) {
            bars.current = Number(event.target.value);
            setTracks(prev => prev.map(track => ({ ...track, rhythm: euclideanRhythm(Math.min(bars.current, track.rhythm.filter(isOn => isOn).length), bars.current)})));
        }
    };

    return (
        <div>
            <div>
                {tracks.map((track, index) => (
                    <div>
                        {sampleControl(track, index)}
                        {JSON.stringify(track.rhythm)};
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setTracks(prev => ([...prev, defaultTrack()]))}>add track</button>
            </div>
            <div>
                <input type="number" value={bars.current} onChange={handleBars}/>
            </div>
            <button onClick={() => play(loopConfig)}>play</button>
            <button onClick={() => stop()}>stop</button>
        </div>
    );
};