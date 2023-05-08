import { ITrack, ITrackControlProps } from "../types";
import { ShiftControl } from "./shift-control";

export const TrackControl = (props: ITrackControlProps) => {
    const {
        effectiveRhythm, euclideanRhythm, isMuted, samples, selectedSampleName,
        onToggleMute, onDelete, onChangeSample, onIncrementOnsets, onDecrementOnsets, onRotateLeft, onRotateRight
    } = props;

    return (
        <div className="flex center text-[1.6rem]">
            <button className="border-[0.1rem] border-[#000000] rounded-[0.4rem] px-[1.0rem] py-[0.5rem]" onClick={onToggleMute}>
                <span className={`w-[1.6rem] fa-solid fa-volume-${isMuted ? 'xmark' : 'high'}`}></span>
            </button>
            <select className="px-[0.5rem] py-[0.5rem] grow ml-[1.0rem] border-[0.1rem] border-[#000000] rounded-[0.4rem] px-[1.0rem] appearance-none" onChange={e => onChangeSample(e.target.value)} name="" id="" value={selectedSampleName}>
                {samples.map(({ sampleName }) => (
                    <option value={sampleName}>{sampleName}</option>
                ))}
            </select>
            <div className="ml-[1.0rem]">
                <ShiftControl
                    iconNeg="minus" iconPos="plus" negDisabled={false}
                    onNeg={onDecrementOnsets}
                    onPos={onIncrementOnsets}
                />
            </div>
            <div className="ml-[1.0rem]">
                <ShiftControl
                    iconNeg="rotate-left" iconPos="rotate-right" negDisabled={false}
                    onNeg={onRotateLeft}
                    onPos={onRotateRight}
                />
            </div>
            <button className="mx-[1.0rem]" onClick={onDelete}>
                <span className="fa-solid fa-circle-xmark"></span>
            </button>
        </div>
    );
};