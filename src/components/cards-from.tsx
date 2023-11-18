import { Tasktype } from '@/types/tasktype'
import React from 'react'
import { FormatDate } from "@/utilities/utillities";
import Progress from "./progress";
import Update from "./update-tasks";
import { Button } from '@nextui-org/react';

type Props = {assigned: Tasktype[]|undefined}

const CardsFrom = ({assigned}: Props) => {
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
                                  <p>Assigned To : <span className="text-[#3e38f5] font-semibold">{task.assignee_name.name}</span></p>
                              </div>
                              <div>
                                  <Progress percent={complete}/>
                              </div>
                          </div>
                          <div className="grid grid-flow-col justify-stretch pt-5 w-full gap-5 ml-2">
                              <Button className="font-medium bg-indigo-600/10 py-1 rounded ring-1 ring-inset ring-indigo-600/50 text-center">{date}</Button>
                          </div>
                      </div>
                  </div>
              )})}
          
        </div>
          :
          <div className="text-center">
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
  
  export default CardsFrom;
  
