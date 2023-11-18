'use client'
import Plus from "../../public/plus.svg"
import Image from 'next/image'
import { useState } from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, CircularProgress } from "@nextui-org/react";
import { createTask, fetchUsers } from "@/server/data/fetch-data"
import plus from "../../public/plus.svg"
import { useToast } from "./ui/use-toast"
import { PersonType } from "@/types/usertype";


const inputtext = "bg-slate-100 w-full rounded-lg px-5 py-2 text-sm "
type Props ={role:number, userId:string}
export default function TaskForm({role,userId}:Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    }
    const { toast } = useToast()
    const [people, setpeople] = useState<PersonType[]>()

    async function fetch(){
        const data:any|null = await fetchUsers(role);
        if(data.data){
            setpeople(data.data)
        }
        else{
            toast({
                description:`${data}`
              })
        }
    }
    fetch()
    async function handleSubmit(event: any) {
        event.preventDefault()
            var to= String(event.target.user.value)
            var name= String(event.target.name.value)
            var desc=String(event.target.desc.value)
            var milestones=String(event.target.milestones.value)
            var due=String(event.target.due.value)
            var dueDate = new Date(due)
            const result:any|null = await createTask(userId, to, name, desc, dueDate, milestones, "");
            if(result.status){
                toast({
                    description:result.message
                  })
            }
            else{
                toast({
                    description:`${result.message}`
                  })
            }
        }
    if(people){
    return (
      <div>
        <Button
          onPress={() => handleOpen()}
          className="py-2 rounded bg-slate-100 px-4"
        >
          <Image src={plus} alt="plus icon"></Image>
          Assign Task
        </Button>
        <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-xl">
                  Task Assignment
                </ModalHeader>
                <form
                  onSubmit={handleSubmit}
                  className="my-10 flex flex-col gap-7 m-5"
                >
                  <ModalBody>
                    <div>
                      <p className="font-semibold text-lg pb-2">Task Details</p>
                      <div className="grid grid-cols-2 gap-3">

                        <select className={inputtext} name="user" id="user">
                          <option selected className="text-left">
                            Assign To
                          </option>
                          {people.map((person, key) => {
                            return (
                              <option key={key} value={person.id}>
                                {person.name}
                              </option>
                            );
                          })}
                        </select>
                        <input
                          className={inputtext}
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Task Title"
                        ></input>
                        <input
                          className={inputtext}
                          type="text"
                          name="desc"
                          id="desc"
                          placeholder="Description"
                        ></input>
                        <input
                          className={`${inputtext} h-20`}
                          type="text"
                          id="milestones"
                          placeholder="Milestones (seperated with comma)"
                        ></input>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg pb-2">
                        Deadline Details
                      </p>
                        <input
                          type="datetime-local"
                          className={inputtext}
                          id="due"
                          name="due"
                        ></input>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className=" mx-auto bg-slate-100 rounded-lg flex w-[8.8rem] h-10 py-2 px-5 gap-2 my-2"
                    >
                      <Image
                        src={Plus}
                        width={16}
                        alt="Plus"
                        className="mt-0.5"
                      ></Image>
                      <p>Add Task</p>
                    </button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
}
}


