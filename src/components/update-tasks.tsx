import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast"
import { updateTask } from '@/server/data/fetch-data';
import { Button } from "@nextui-org/react";

type Props = {
  id: string;
  status_details: string;
  current_status: string;
  style: string;
};

const Update = ({ id, status_details, current_status, style }: Props) => {
    const { toast } = useToast()
  const [milestoneChecked, setMilestoneChecked] = useState<{ [key: string]: boolean }>({});

  // Parse status_details to get milestones
  const milestones: string[] = status_details.split(',');

  // Initialize checkbox states based on current_status
  useEffect(() => {
    const completedMilestones: string[] = current_status.split(',').map(milestone => milestone.trim());
    const initialMilestoneChecked: { [key: string]: boolean } = {};
    milestones.forEach((milestone) => {
      initialMilestoneChecked[milestone.trim()] = completedMilestones.includes(milestone.trim());
    });
    setMilestoneChecked(initialMilestoneChecked);
  }, [status_details, current_status]);

  const handleCheckboxChange = (milestone: string) => {
    setMilestoneChecked((prevState) => ({
      ...prevState,
      [milestone]: !prevState[milestone],
    }));
  };

  const updateTaskStatus = () => {
    const updatedMilestones: string[] = [];
    Object.entries(milestoneChecked).forEach(([milestone, isChecked]) => {
      if (isChecked) {
        updatedMilestones.push(milestone);
      }
      
    });
    const updatedCurrentStatus: string = updatedMilestones.join(',');
    console.log(updatedCurrentStatus)
    
    updateTask(id, updatedCurrentStatus)
      .then((response) => {
        // Handle success response
        if (response.status) {
            toast({
                description:response.message,
              })
        } else {
            toast({
                description:"Unable to Update Task. Try again."
              })
        }
      })
      .catch((error) => {
        toast({
            description:error.message
          })
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger ><Button className={`${style}`}>Update Task</Button>
        </DialogTrigger>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Update Your Tasks</DialogTitle>
            <DialogDescription>
              <div className='my-2 mx-10'>
                {milestones.map((milestone, key) => (
                  <div key={key}>
                    <input
                      type="checkbox"
                      checked={milestoneChecked[milestone.trim()] || false}
                      onChange={() => handleCheckboxChange(milestone.trim())}
                    />
                    {milestone.trim()}
                  </div>
                ))}
                <Button onClick={updateTaskStatus} className='rounded bg-[rgba(62,56,245,0.9)] text-white font-medium py-2 mt-3'>Update</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Update;
