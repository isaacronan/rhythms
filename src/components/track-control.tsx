import { ITrack, ITrackControlProps } from "../types";

export const TrackControl = (props: ITrackControlProps) => {
    const {
        effectiveRhythm, euclideanRhythm, isMuted, samples, selectedSampleName,
        onToggleMute, onDelete, onChangeSample, onIncrementOnsets, onDecrementOnsets, onRotateLeft, onRotateRight
    } = props;

    return (
        <div className="flex text-[2.0rem]">
            <button onClick={onToggleMute}>
                <span className={`fa-solid fa-volume-${isMuted ? 'xmark' : 'high'}`}></span>
            </button>
            <select onChange={e => onChangeSample(e.target.value)} name="" id="" value={selectedSampleName}>
                {samples.map(({ sampleName }) => (
                    <option value={sampleName}>{sampleName}</option>
                ))}
            </select>
            <div>
                <button onClick={onDecrementOnsets}>
                    <span className="fa-solid fa-minus"></span>
                </button>
                <button onClick={onIncrementOnsets}>
                    <span className="fa-solid fa-plus"></span>
                </button>
            </div>
            <div>
                <button onClick={onRotateLeft}>
                    <span className="fa-solid fa-rotate-left"></span>
                </button>
                <button onClick={onRotateRight}>
                    <span className="fa-solid fa-rotate-right"></span>
                </button>
            </div>
            <div>
                <button onClick={onDelete}>
                    <span className="fa-solid fa-circle-xmark"></span>
                </button>
            </div>
        </div>
    );
};