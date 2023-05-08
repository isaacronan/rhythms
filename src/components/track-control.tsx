import { ITrackControlProps } from "../types";

export const TrackControl = (props: ITrackControlProps) => {
    const {
        effectiveRhythm, euclideanRhythm, isMuted, samples, selectedSampleName,
        onToggleMute, onDelete, onChangeSample, onIncrementOnsets, onDecrementOnsets, onRotateLeft, onRotateRight
    } = props;

    return (
        <div>
            <button onClick={onToggleMute}>{isMuted ? 'muted' : 'not muted'}</button>
            <select onChange={e => onChangeSample(e.target.value) } name="" id="" value={selectedSampleName}>
                {samples.map(({ sampleName }) => (
                    <option value={sampleName}>{sampleName}</option>
                ))}
            </select>
            <div>
                <button onClick={onDecrementOnsets}>dec onsets</button>
                <button onClick={onIncrementOnsets}>inc onsets</button>
            </div>
            <div>
                <button onClick={onRotateLeft}>rotate left</button>
                <button onClick={onRotateRight}>rotate right</button>
            </div>
            <div>
                <button onClick={onDelete}>delete track</button>
            </div>
            <div>
                {effectiveRhythm.map((isOn, index) => {
                    const marker = isOn ? 'X' : '_';
                    if (euclideanRhythm[index]) {
                        return <span>.{marker}.</span>;
                    }
                    return <span> {marker} </span>;
                })}
            </div>
        </div>
    );
};