import { useState, useEffect } from 'react';
import { Tooltip } from "@nextui-org/react";
import { Tasktype } from '@/types/tasktype';
import { getLeastDeadline } from '@/utilities/utillities';

type Props = { tasks: Tasktype[] | undefined }

const Calendar = ({ tasks }: Props) => {
  const [monthDays, setMonthDays] = useState<Date[]>([]);
  const today = new Date();
  const daysToShow = 30;

  useEffect(() => {
    const generateMonthDays = () => {
      const days: Date[] = [];
      const startingDate = new Date(today.getTime());
      startingDate.setDate(today.getDate() - 2); // Set starting date 2 days before today

      for (let i = 0; i < daysToShow; i++) {
        const newDate = new Date(startingDate.getTime());
        newDate.setDate(startingDate.getDate() + i);
        days.push(newDate);
      }

      setMonthDays(days);
    };

    generateMonthDays();
  }, [today, daysToShow]);

  if (tasks) {
    const deadlines = getLeastDeadline(tasks);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className='my-4 mx-2'>
        <h2 className='text-2xl font-semibold px-3 py-4'>{monthNames[today.getMonth()]}, {today.getFullYear()}</h2>
        <div className='flex gap-3.5 ml-2'>
          {monthDays.map((day, key) => {
            const matchingTasks = tasks.filter(task => {
              const taskDueDate = new Date(task.task_due);
              return (
                day.getUTCFullYear() === taskDueDate.getUTCFullYear() &&
                day.getUTCMonth() === taskDueDate.getUTCMonth() &&
                day.getUTCDate() === taskDueDate.getUTCDate()
              );
            });

            let style = 'font-semibold p-2.5';
            let hover = false;
            let taskNames: string[] = [];

            if (today.getUTCDate() === day.getUTCDate()) {
              style = `font-semibold bg-[#6466F1] rounded-full text-white w-11 h-11 p-3 shadow-lg`;
            } else if (matchingTasks.length > 0) {
              style = 'font-semibold p-2.5 rounded-full w-10 h-10 ring-2 ring-[#52DB50]';
              hover = true;
              taskNames = matchingTasks.map(task => task.task_title);
            }

            return (
              <div key={key} className='flex flex-col items-center text-sm'>
                <p className='text-[#A7A9D2]'>{days[day.getUTCDay()]}</p>
                <div className='my-1'>
                  <Tooltip content={hover ? `Due for ${taskNames.join(', ')}` : 'No Task Due here'} delay={hover ? 0 : 3000}>
                    <p className={style}>{day.getDate()}</p>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null; // or return a loader or default component while tasks are loading
  }
};

export default Calendar;
