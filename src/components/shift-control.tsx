import { PropsWithChildren } from "react";

export const ShiftControl = (props: PropsWithChildren<{
    iconNeg: string,
    iconPos: string,
    value?: number,
    negDisabled: boolean
    onNeg: () => void,
    onPos: () => void,
}>) => {
    return (
        <div className=" flex text-[1.6rem] border-[0.1rem] border-[#000000] rounded-[0.4rem]">
            <button className={`py-[0.5rem] px-[1.0rem]${props.value === undefined ? ' border-r-[0.1rem] border-[#000000]' : ''}`} disabled={props.negDisabled} onClick={props.onNeg}>
                <span className={`fa-solid fa-${props.iconNeg}`}></span>
            </button>
            {props.value === undefined ? null : <span className="py-[0.5rem] px-[2.0rem] border-x-[0.1rem] border-x-[#000000] grow text-center">{props.value}</span>}
            <button className="py-[0.5rem] px-[1.0rem]" onClick={props.onPos}>
                <span className={`fa-solid fa-${props.iconPos}`}></span>
            </button>
        </div>
    );
};