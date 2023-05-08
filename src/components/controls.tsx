import { AddTrackAction, ChangeBeatDivisionAction, ChangeNumBeatsAction, ChangeNumBeatsPerMinuteAction, ChangeTrackOnsetsAction, ChangeTrackRotationAction, ChangeTrackSampleAction, DeleteTrackAction, TogglePlayAction, ToggleTrackMuteAction } from "../types/actions";
import { useLoop } from "./loop-service";
import { useSamples } from "./sample-service";
import { SequencerChart } from "./sequencer-chart";
import { useAppDispatch, useAppState } from "./state-service";
import { TrackControl } from "./track-control";

export const Controls = () => {
    const { samples } = useSamples();
    const state = useAppState();
    const dispatch = useAppDispatch();
    const { currentStep } = useLoop();

    return (
        <div>
            <div className="text-[4.0rem]">
                <button onClick={() => dispatch<TogglePlayAction>({ type: 'toggle-play' })}>
                    <span className={`fa-solid fa-${state.isPlaying ? 'stop' : 'play'}`}></span>
                </button>
            </div>
            <div className="flex text-[2.0rem]">
                <div>
                    <button disabled={state.numBeats === 1} onClick={() => dispatch<ChangeNumBeatsAction>({ type: 'change-num-beats', delta: -1})}>
                        <span className="fa-solid fa-minus"></span>
                    </button>
                    <span>{state.numBeats}</span>
                    <button onClick={() => dispatch<ChangeNumBeatsAction>({ type: 'change-num-beats', delta: 1})}>
                        <span className="fa-solid fa-plus"></span>
                    </button>
                </div>
                <div>
                    <button disabled={state.numBeatsPerMinute === 1} onClick={() => dispatch<ChangeNumBeatsPerMinuteAction>({ type: 'change-num-beats-per-minute', delta: -1 })}>
                        <span className="fa-solid fa-minus"></span>
                    </button>
                    <span>{state.numBeatsPerMinute}</span>
                    <button onClick={() => dispatch<ChangeNumBeatsPerMinuteAction>({ type: 'change-num-beats-per-minute', delta: 1 })}>
                        <span className="fa-solid fa-plus"></span>
                    </button>
                </div>
                <div>
                    <button disabled={state.beatDivision === 1} onClick={() => dispatch<ChangeBeatDivisionAction>({ type: 'change-beat-division', delta: -1})}>
                        <span className="fa-solid fa-minus"></span>
                    </button>
                    <span>{state.beatDivision}</span>
                    <button onClick={() => dispatch<ChangeBeatDivisionAction>({ type: 'change-beat-division', delta: 1})}>
                        <span className="fa-solid fa-plus"></span>
                    </button>
                </div>
            </div>
            {state.tracks.map((track, index) => (
                <>
                    <TrackControl
                        key={index}
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
                    <SequencerChart
                        currentStep={state.isPlaying ? currentStep : null}
                        effectiveRhythm={track.rhythm} euclideanRhythm={track.rhythm}
                        numBeats={state.numBeats} beatDivision={state.beatDivision}
                    />
                </>
            ))}
            <div className="flex flex-col center text-[2.0rem]">
                <button onClick={() => dispatch<AddTrackAction>({ type: 'add-track' })}>
                    <span className="fa-solid fa-circle-plus"></span>
                </button>
            </div>
        </div>
    );
};