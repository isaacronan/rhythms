import { AddTrackAction, ChangeBeatDivisionAction, ChangeNumBeatsAction, ChangeNumBeatsPerMinuteAction, ChangeTrackOnsetsAction, ChangeTrackRotationAction, ChangeTrackSampleAction, DeleteTrackAction, TogglePlayAction, ToggleTrackMuteAction } from "../types/actions";
import { useLoop } from "./loop-service";
import { useSamples } from "./sample-service";
import { SequencerChart } from "./sequencer-chart";
import { useAppDispatch, useAppState } from "./state-service";
import { TrackControl } from "./track-control";
import { ShiftControl } from "./shift-control";

export const Controls = () => {
    const state = useAppState();
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-wrap mb-[1.0rem]">
            <div className="basis-full mb-[1.0rem]">
                <ShiftControl
                    value={state.numBeatsPerMinute} iconNeg="minus" iconPos="plus" negDisabled={state.numBeatsPerMinute === 1}
                    onNeg={() => dispatch<ChangeNumBeatsPerMinuteAction>({ type: 'change-num-beats-per-minute', delta: -1 })}
                    onPos={() => dispatch<ChangeNumBeatsPerMinuteAction>({ type: 'change-num-beats-per-minute', delta: 1 })}
                />
            </div>
            <div className="basis-1/2 pr-[0.5rem]">
                <ShiftControl
                    value={state.numBeats} iconNeg="minus" iconPos="plus" negDisabled={state.numBeats === 1}
                    onNeg={() => dispatch<ChangeNumBeatsAction>({ type: 'change-num-beats', delta: -1 })}
                    onPos={() => dispatch<ChangeNumBeatsAction>({ type: 'change-num-beats', delta: 1 })}
                />
            </div>
            
            <div className="basis-1/2 pl-[0.5rem]">
                <ShiftControl
                    value={state.beatDivision} iconNeg="minus" iconPos="plus" negDisabled={state.beatDivision === 1}
                    onNeg={() => dispatch<ChangeBeatDivisionAction>({ type: 'change-beat-division', delta: -1 })}
                    onPos={() => dispatch<ChangeBeatDivisionAction>({ type: 'change-beat-division', delta: 1 })}
                />
            </div>
        </div>
    );
};