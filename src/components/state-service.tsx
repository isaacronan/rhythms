import { PropsWithChildren, createContext, useContext, useMemo, useReducer } from "react";
import { appReducer } from "../state/reducers";
import { initialAppState } from "../state";
import { Action } from "../types/actions";
import { IAppState } from "../types";

const StateContext = createContext<{
    state: IAppState,
    dispatch: <A extends Action>(action: A) => void,
} | null>(null);

export const StateService = (props: PropsWithChildren) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StateContext.Provider>
    );
};

export const useAppState = () => {
    const { state } = useContext(StateContext)!;

    return state;
};

export const useAppDispatch = () => {
    const { dispatch } = useContext(StateContext)!;

    return dispatch;
};