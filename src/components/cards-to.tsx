import { Tasktype } from "@/types/tasktype";
import React from "react";
import { FormatDate } from "@/utilities/utillities";
import NoTask from "../../public/notask.png"
import Image from "next/image";
import Update from "./update-tasks";
import Progress from "./progress";
import { Button } from "@nextui-org/react";

type Props = { assigned: Tasktype[]|undefined};
const CardsTo = (props: Props) => {
  const { assigned } = props;
  if(assigned){
  return (
    <>
    {assigned.length!=0?
        <div className="grid grid-cols-3 gap-5 my-7">
            {assigned.map((task, key)=>{
                const date = FormatDate(task.task_due)
                const complete = Math.ceil(task.current_status.length*100/task.status_details.length)
                return(
                    <div key={key} className="bg-[#3e38f5]/10 px-7 py-5 rounded">
                    <div>
                        <div className="flex justify-between leading-10">
                            <div className="py-1 h-14">
                                <p className="text-xl font-bold">{task.task_title}</p>
                                <p className="text-sm text-[#a7a9d2]">{task.task_description}</p>
                                <p>Assigned By : <span className="text-[#3e38f5] font-semibold">{task.assigner_name.name}</span></p>
                            </div>
                            <div>
                                <Progress percent={complete}/>
                            </div>
                        </div>
                        <div className="grid grid-flow-col justify-stretch pt-5 w-full gap-5 ml-2">
                              <Button className="font-medium bg-indigo-600/10 py-1 rounded ring-1 ring-inset ring-indigo-600/50 text-center">{date}</Button>
                              <Update style="rounded bg-[rgba(62,56,245,0.9)] py-2 px-3 text-white font-medium w-44"id={task.assignee_id} status_details={task.status_details} current_status={task.current_status}/>
                          </div>
                    </div>
                </div>
            )})}
        
      </div>
        :
        <div className="text-center">
            <Image src={NoTask} alt="NoTask" className="m-auto"></Image>
            <p className="">No Tasks Found!!</p>
        </div>
       }
   </>
  );
}
else{
    return(
        <div>
            <p className="mx-auto font-semibold text-xl">Loading...</p>
        </div>
    )
}
}

export default CardsTo;
