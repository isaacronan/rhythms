import { PropsWithChildren, createContext, useContext, useRef, useState } from "react";
import { ILoop, ILoopControls } from "../types";

const LoopContext = createContext<ILoopControls | null>(null);

export const LoopService = (props: PropsWithChildren) => {
    const stepInterval = useRef<ReturnType<typeof setInterval> | null>(null);
    const currentLoop = useRef<ILoop | null>(null);
    const currentStepRef = useRef<number>(0);
    const [currentStep, setCurrentStep] = useState(currentStepRef.current);

    const executeStep = () => {
        setCurrentStep(currentStepRef.current);
        currentLoop.current!.steps[currentStepRef.current]();
        currentStepRef.current = (currentStepRef.current + 1) % currentLoop.current!.steps.length;
    };

    const resetStepInterval = () => {
        clearInterval(stepInterval.current!);
        stepInterval.current = setInterval(() => {
            if (currentStepRef.current >= currentLoop.current!.steps.length) {
                currentStepRef.current = 0;
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
        currentStepRef.current = 0;
    };

    return (
        <LoopContext.Provider value={{ start, stop, patch, currentStep }}>
            {props.children}
        </LoopContext.Provider>
    );
};

export const useLoop = () => {
    const loopControls = useContext(LoopContext)!;

    return loopControls;
}