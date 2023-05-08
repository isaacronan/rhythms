import { AddTrackAction, ChangeNumBeatsAction, ChangeNumBeatsPerMinuteAction, ChangeTrackOnsetsAction, ChangeTrackRotationAction, ChangeTrackSampleAction, DeleteTrackAction, ToggleTrackMuteAction } from "../types/actions";
import { useOrchestration } from "./orchestration-service";
import { useSamples } from "./sample-service";
import { useAppDispatch, useAppState } from "./state-service";
import { TrackControl } from "./track-control";

export const Controls = () => {
    const { samples } = useSamples();
    const state = useAppState();
    const dispatch = useAppDispatch();
    const { play, stop } = useOrchestration();

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <button onClick={play}>play</button>
                <button onClick={stop}>stop</button>
            </div>
            <div>
                <button onClick={() => dispatch<ChangeNumBeatsAction>({ type: 'change-num-beats', delta: -1})}>dec</button>
                <span>{state.numBeats}</span>
                <button onClick={() => dispatch<ChangeNumBeatsAction>({ type: 'change-num-beats', delta: 1})}>inc</button>
            </div>
            <div>
                <button onClick={() => dispatch<ChangeNumBeatsPerMinuteAction>({ type: 'change-num-beats-per-minute', delta: -1 })}>dec</button>
                <span>{state.numBeatsPerMinute}</span>
                <button onClick={() => dispatch<ChangeNumBeatsPerMinuteAction>({ type: 'change-num-beats-per-minute', delta: 1 })}>inc</button>
            </div>
            {state.tracks.map((track, index) => (
                <TrackControl
                    onIncrementOnsets={() => dispatch<ChangeTrackOnsetsAction>({ type: 'change-track-onsets', trackIndex: index, delta: 1 })}
                    onDecrementOnsets={() => dispatch<ChangeTrackOnsetsAction>({ type: 'change-track-onsets', trackIndex: index, delta: -1 })}
                    onRotateLeft={() => dispatch<ChangeTrackRotationAction>({ type: 'change-track-rotation', trackIndex: index, delta: -1 })}
                    onRotateRight={() => dispatch<ChangeTrackRotationAction>({ type: 'change-track-rotation', trackIndex: index, delta: 1 })}
                    onDelete={() => dispatch<DeleteTrackAction>({ type: 'delete-track', trackIndex: index })}
                    onToggleMute={() => dispatch<ToggleTrackMuteAction>({ type: 'toggle-track-mute', trackIndex: index })}
                    onChangeSample={(sampleName) => dispatch<ChangeTrackSampleAction>({ type: 'change-track-sample', trackIndex: index, sampleName })}
                    isMuted={track.isMuted}
                    samples={samples}
                    selectedSampleName={track.sampleName}
                    effectiveRhythm={track.rhythm}
                    euclideanRhythm={track.rhythm}
                />
            ))}
            <div>
                <button onClick={() => dispatch<AddTrackAction>({ type: 'add-track' })}>add track</button>
            </div>
        </div>
    );
};