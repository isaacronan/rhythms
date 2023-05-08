import { PropsWithChildren, createContext, useContext, useMemo, useReducer } from "react";
import { appReducer } from "../state/reducers";
import { initialAppState } from "../state";
import { Action } from "../types/actions";
import { IAppState, Rhythm } from "../types";
import { euclideanRhythm, rotate } from "../utils";

const StateContext = createContext<{
    state: IAppState,
    dispatch: <A extends Action>(action: A) => void,
    computed: {
        rhythms: Rhythm[],
        trackSampleNames: string[]
    }
} | null>(null);

export const StateService = (props: PropsWithChildren) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    const rhythms = useMemo(() => {
        return state.tracks.map(track => rotate(euclideanRhythm(track.numStepsOn, state.numBeats), track.numRotations));
    }, [state.numBeats, state.tracks]);

    const trackSampleNames = useMemo(() => {
        return state.tracks.map(track => track.sampleName);
    }, [state.tracks]);

    return (
        <StateContext.Provider value={{ state, dispatch, computed: { rhythms, trackSampleNames } }}>
            {props.children}
        </StateContext.Provider>
    );
};

export const useAppState = () => {
    const { state } = useContext(StateContext)!;

    return state;
};

export const useAppComputed = () => {
    const { computed } = useContext(StateContext)!;

    return computed;
};

export const useAppDispatch = () => {
    const { dispatch } = useContext(StateContext)!;

    return dispatch;
};