import { TogglePlayAction } from "../types/actions";
import { useAppDispatch, useAppState } from "./state-service";

export const Viz = () => {
    const state = useAppState();
    const dispatch = useAppDispatch();

    return (
        <div className="text-[4.0rem] text-center">
            <button onClick={() => dispatch<TogglePlayAction>({ type: 'toggle-play' })}>
                <span className={`fa-solid fa-${state.isPlaying ? 'stop' : 'play'}`}></span>
            </button>
        </div>
    );
};