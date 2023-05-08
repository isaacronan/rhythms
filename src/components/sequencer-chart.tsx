import { useEffect, useMemo, useRef, useState } from "react";
import { ISequencerChartProps, Rhythm } from "../types";
import { select } from 'd3-selection';

const STEP_W = 30;
const STEP_H = 35;
const STEP_H_SPACE = 5;
const STEP_V_SPACE = 5;

const redraw: (svg: SVGSVGElement, rhythm: Rhythm, numStepsPerRow: number, currentStep: number | null) => void = (svg, rhythm, numStepsPerRow, currentStep) => {
    const update = select(svg!).selectAll<SVGRectElement, Rhythm[number]>('rect').data(rhythm);
    const enter = update.enter().append('rect')
        .attr('width', STEP_W).attr('height', STEP_H)
        .attr('rx', 4)
        .attr('stroke-width', 4);
    enter.merge(update)
        .attr('x', (d, i) => (STEP_W + 2 * STEP_H_SPACE) * (i % numStepsPerRow) + STEP_H_SPACE)
        .attr('y', (d, i) => (STEP_H + 2 * STEP_V_SPACE) * Math.floor(i / numStepsPerRow) + STEP_V_SPACE)
        .attr('fill', d => d ? 'black' : 'transparent')
        .attr('stroke', d => d ? 'black' : 'var(--er-gray)')
        .attr('stroke-width', (d, i) => i === currentStep ? 6 : 4);
    update.exit().remove();
};

export const SequencerChart = (props: ISequencerChartProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [maxStepsPerRow, setMaxStepsPerRow] = useState(0);

    const numBeatsPerRow = useMemo(() => {
        const initial = Math.max(Math.floor(Math.min(maxStepsPerRow, props.numBeats * props.beatDivision) / props.beatDivision), 1);
        let adjusted = initial;
        while (props.numBeats % adjusted !== 0) {
            adjusted -= 1;
        }
        return adjusted;
    }, [maxStepsPerRow, props.beatDivision, props.numBeats]);
    
    const numStepsPerRow = useMemo(() => {
        return numBeatsPerRow * props.beatDivision;
    }, [numBeatsPerRow, props.beatDivision]);

    const numRows = useMemo(() => {
        return Math.ceil(props.numBeats / numBeatsPerRow);
    }, [numBeatsPerRow, props.numBeats]);

    useEffect(() => {
        redraw(svgRef.current!, props.euclideanRhythm, numStepsPerRow, props.currentStep);
    }, [props.effectiveRhythm, props.euclideanRhythm, props.beatDivision, props.numBeats, numStepsPerRow, props.currentStep]);

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = containerRef.current!.clientWidth;
            setMaxStepsPerRow(Math.min(Math.floor(containerWidth / (STEP_W + 2 * STEP_H_SPACE))));
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col items-center" ref={containerRef}>
            <svg
                ref={svgRef}
                width={numStepsPerRow * (STEP_W + 2 * STEP_H_SPACE)}
                height={numRows * (STEP_H + 2 * STEP_V_SPACE)}
            />
        </div>
    );
};