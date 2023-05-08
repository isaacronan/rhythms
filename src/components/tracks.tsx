import { AddTrackAction, ChangeTrackOnsetsAction, ChangeTrackRotationAction, ChangeTrackSampleAction, DeleteTrackAction, ToggleTrackMuteAction } from "../types/actions";
import { useLoop } from "./loop-service";
import { useSamples } from "./sample-service";
import { SequencerChart } from "./sequencer-chart";
import { useAppDispatch, useAppState } from "./state-service";
import { TrackControl } from "./track-control";

export const Tracks = () => {
    const { samples } = useSamples();
    const state = useAppState();
    const dispatch = useAppDispatch();
    const { currentStep } = useLoop();

    return (
        <>
            {state.tracks.map((track, index) => (
                <div className="mb-[1.0rem]">
                    <div className="mb-[1.0rem]">
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
                    </div>
                    <SequencerChart
                        currentStep={state.isPlaying ? currentStep : null}
                        effectiveRhythm={track.rhythm} euclideanRhythm={track.rhythm}
                        numBeats={state.numBeats} beatDivision={state.beatDivision}
                    />
                </div>
            ))}
            <div className="flex flex-col center text-[2.0rem]">
                <button onClick={() => dispatch<AddTrackAction>({ type: 'add-track' })}>
                    <span className="fa-solid fa-circle-plus"></span>
                </button>
            </div>
        </>
    )
}