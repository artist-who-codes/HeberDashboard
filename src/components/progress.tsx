import React from 'react'
import { CircularProgress } from "@nextui-org/react";

type Props = { percent: number }

const Progress = ({ percent }: Props) => {
    return (
        <div><CircularProgress
            label="Progress"
            value={percent}
            classNames={{
                svg: "w-20 h-20 drop-shadow-md",
                indicator: "stroke-indigo-600",
                track: "stroke-indigo-500/10",
                value: "text-md font-semibold text-[#4B50F7]",
            }}
            showValueLabel={true}
        /></div>
    )
}

export default Progress