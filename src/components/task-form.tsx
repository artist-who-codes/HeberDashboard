'use client'
import Plus from "../../public/plus.svg"
import Image from 'next/image'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import { dashboardFliter } from "@/data/assign-to"
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem} from "@nextui-org/react";   
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, CircularProgress } from "@nextui-org/react";
import { Filter } from "@/types/filter"


const inputtext = "bg-[#6466F1]/10 w-full rounded-lg px-5 py-2 text-sm "
export default function TaskForm() {
    const pathname = usePathname()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    }
    const [role, setRole] = useState('')
    const [people, setpeople] = useState<Filter[]>([])
    useEffect(()=>{
        const filteredPeople = dashboardFliter.filter((people)=>people.role==role)

        setpeople(filteredPeople)
    }, [role])
    async function handleSubmit(event: any) {
        event.preventDefault()
        const details = {
            to: String(event.target.user.value),
            name: String(event.target.name.value),
            desc: String(event.target.desc.value),
            comments: String(event.target.comments.value),
            milestones: String(event.target.milestones.value),
            deadlineDate: String(event.target.deadlineDate.value),
            deadlineTime: String(event.target.deadlineTime.value)
        }

        // const res = await fetch(`${pathname}/api`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        //     body: JSON.stringify(details)
        // })
        // if (res.ok) {
        //     alert("Taskie Added Successfully");
        // }
        // else {
        //     alert("Failed to add Taskie");
        // }
    }
    return (
        <div>
            <Button onPress={() => handleOpen()} className="py-2 bg-[#3e38f5] rounded-lg text-white px-4">
              Assign Task</Button>
            <Modal
                size='3xl'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-xl">Your Progress</ModalHeader>
                            <form onSubmit={handleSubmit} className='my-10 flex flex-col gap-7 m-5'>
                                <ModalBody>
                                    <div >
                                        <p className='font-semibold text-lg pb-2'>Taskie Details</p>
                                        <div className='grid grid-cols-2 gap-3'>
                                        <Dropdown>
                                        <DropdownTrigger>
                                            <Button className={inputtext}>
                                                Assignee Role
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Static Actions" onAction={(key) => setRole(String(key))}>
                                        <DropdownItem key="HOD">HoD</DropdownItem>
                                        <DropdownItem key="Staff">Staff</DropdownItem>
                                        <DropdownItem key="Student">Student</DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                        <select className={inputtext}>
                                        <option selected className="text-left">Assignee</option>
                                            {people.map((person,key)=>{
                                                return(
                                                    <option key={key} value={person.name}>{person.name}</option>
                                                )
                                            })}
                                        </select>
                                            <input className={inputtext} type="text" name="name" id="name" placeholder=" Task Title"></input>
                                            <input className={inputtext} type="text" name="desc" id="desc" placeholder='Description'></input>
                                            <input className={`${inputtext} h-20`} type="text" id="milestones" placeholder='Milestones (seperated with comma)'></input>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='font-semibold text-lg pb-2'>Deadline Details</p>
                                        <div className='flex gap-5'>
                                            <input type='date' className={inputtext} id="deadlineDate" name="deadlineDate"></input>
                                            <input type="time" className={inputtext} id="deadlineTime" name="deadlineTime"></input>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <button type="submit" name="submit" id="submit" className=' mx-auto bg-[#4B50F7]/10 border-1 border-[#4B50F7] rounded-lg flex w-40 h-10 py-2 px-5 gap-2 my-3'><Image src={Plus} width={20} alt="Plus"></Image><p>Add Taskie</p></button>
                                </ModalFooter>
                            </form >
                        </>
                    )}
                </ModalContent>
            </Modal>




        </div>
    )
}

