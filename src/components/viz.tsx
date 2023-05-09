import { useEffect, useRef } from "react";
import { TogglePlayAction } from "../types/actions";
import { useAppDispatch, useAppState } from "./state-service";
import { useLoop } from "./loop-service";
import { ITrack } from "../types";
import { select } from "d3-selection";
import { colorToRgb } from "../utils";

const MIN_RADIUS = 40;
const MIN_SIZE = 200;
const RING_DISTANCE = 15;

const getRingRadius: (ringIndex: number) => number = (ringIndex) => MIN_RADIUS + (ringIndex * RING_DISTANCE);

const getBeatPosition: (f: (angle: number) => number, trackIndex: number, beatIndex: number, numBeats: number) => number = (f, trackIndex, beatIndex, numBeats) => {
    const radius = getRingRadius(trackIndex);
    const angle = (beatIndex) * (2 * Math.PI / numBeats) - Math.PI / 2;
    return radius * f(angle);
};

const redraw = (svg: SVGSVGElement, tracks: ITrack[], currentStep: number | null) => {
    const size = Math.max(MIN_SIZE, 2 * (tracks.length * RING_DISTANCE + MIN_RADIUS))
    select(svg).attr('width', size).attr('height', size);
    const gUpdate = select(svg).selectAll<SVGGElement, ITrack>('g').data(tracks);
    const gEnter = gUpdate.enter().append('g');
    gEnter.merge(gUpdate).style('transform', `translate(${svg.clientWidth / 2}px,${svg.clientHeight / 2}px)`);
    gUpdate.exit().remove();

    gEnter.append('circle')
        .attr('class', 'ring')
        .attr('stroke', 'var(--er-gray)')
        .attr('fill', 'transparent')
        .attr('stroke-width', 2);

    gEnter.merge(gUpdate).select('.ring').attr('r', (d, i) => getRingRadius(i));
    const beatUpdate = gEnter.merge(gUpdate).selectAll<SVGCircleElement, ITrack>('.beat')
        .data((track, trackIndex) => track.rhythm.map(isOn => ({ isOn, color: track.color, trackIndex, numBeats: track.rhythm.length })));
    const beatEnter = beatUpdate.enter().append('circle')
        .attr('class', 'beat');
    beatEnter.merge(beatUpdate)
        .attr('cx', (d, i) => getBeatPosition(Math.cos, d.trackIndex, i, d.numBeats))
        .attr('cy', (d, i) => getBeatPosition(Math.sin, d.trackIndex, i, d.numBeats))
        .attr('r', (d, i) => i === currentStep ? 6 : 4)
        .attr('fill', d => {
            return d.isOn ? colorToRgb(d.color) : 'transparent';
        });
    beatUpdate.exit().remove();
};

export const Viz = () => {
    const state = useAppState();
    const dispatch = useAppDispatch();
    const { currentStep } = useLoop();
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        redraw(svgRef.current!, state.tracks, state.isPlaying ? currentStep : null);
    }, [state.tracks, state.isPlaying, currentStep]);

    return (
        <div className="text-[4.0rem] flex flex-col items-center relative">
            <svg width={MIN_SIZE} height={MIN_SIZE} ref={svgRef} />
            <div className="absolute w-full h-full flex items-center">
                <div className="w-full flex flex-col items-center">
                    <button className={`relative${!state.isPlaying ? ' left-[0.2rem]' : ''}`} onClick={() => dispatch<TogglePlayAction>({ type: 'toggle-play' })}>
                        <span className={`fa-solid fa-${state.isPlaying ? 'stop' : 'play'}`}></span>
                    </button>
                </div>
            </div>
        </div>
    );
};