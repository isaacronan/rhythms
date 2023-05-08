import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { ILoop, ILoopControls } from "../types";

const LoopContext = createContext<ILoopControls | null>(null);

export const LoopService = (props: PropsWithChildren) => {
    const stepInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const currentLoop = useRef<ILoop | null>(null);
    const currentStep = useRef<number>(0);

    const executeStep = () => {
        currentLoop.current!.steps[currentStep.current]();
        currentStep.current = (currentStep.current + 1) % currentLoop.current!.steps.length;
    };

    const resetStepInterval = () => {
        clearInterval(stepInterval.current!);
        stepInterval.current = setInterval(() => {
            if (currentStep.current >= currentLoop.current!.steps.length) {
                currentStep.current = 0;
            }
            executeStep();
        }, currentLoop.current!.stepDuration);
    };

    const start = (loop: ILoop) => {
        currentLoop.current = loop;

        if (stepInterval.current === null) {
            executeStep();
            resetStepInterval();
        }
    };

    const patch = (loop: ILoop) => {
        if (stepInterval.current !== null && currentLoop.current !== null && loop.stepDuration !== currentLoop.current.stepDuration) {
            currentLoop.current = loop;
            resetStepInterval();
        } else {
            currentLoop.current = loop;
        }
    };

    const stop = () => {
        clearInterval(stepInterval.current!);
        stepInterval.current = null;
        currentStep.current = 0;
    };

    return (
        <LoopContext.Provider value={{ start, stop, patch }}>
            {props.children}
        </LoopContext.Provider>
    );
};

export const useLoop = () => {
    const loopControls = useContext(LoopContext)!;

    return loopControls;
}