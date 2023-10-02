import { Filter } from "@/types/filter"
import { TaskType } from "@/types/tasktype"

export const Principal:TaskType[] = [
        {
            mail : "hod@bhc.edu.in",
            to: "Dr K Rajkumar" , 
            role: "HOD",
            task: {
                name: "Submit report", 
                description: "Report on monthly academic achivements",
                deadline: "2024-03-12T12:30:00.000Z",
                 milestones: {
                    "Milestone-1": true,
                    "Milestone-2": true,
                    "Milestone-3": true,
                    "Milestone-5": true,
                    "Milestone-6": false
                },
            }
        },
        {
            mail : "staff@bhc.edu.in",
            to: "Dr Karthikeyan", 
            role: "Staff",
            task: {
                name: "Prepare budget report for conference", 
                description: "Budgeting for conference held on september",
                deadline: "2024-03-12T12:30:00.000Z",
                milestones: {
                    "Milestone-1": true,
                    "Milestone-2": true,
                    "Milestone-3": true,
                    "Milestone-5": true,
                    "Milestone-6": false
                },
            }
        },
        {
            mail : "hod@bhc.edu.in",
            to: "Mr Sobers Smiles David",
            role: "HOD", 
            task: {
                name: "Schedule and Manage department inaugration", 
                description: "Budgeting for conference held on september",
                deadline: "2024-03-12T12:30:00.000Z",
                milestones: {
                    "Milestone-1": true,
                    "Milestone-2": true,
                    "Milestone-3": true,
                    "Milestone-5": true,
                    "Milestone-6": false
                },
            }
        }
]


export const HOD :TaskType[]= [
    {
        mail : "staff@bhc.edu.in",
        to: "Dr Ramah Sivakumar" , 
        role: "Staff",
        task: {
            name: "Submit report", 
            description: "Report on monthly academic achivements",
            deadline: "2024-03-12T12:30:00.000Z",
            milestones: {
            "Milestone-1": true,
            "Milestone-2": true,
            "Milestone-3": true,
            "Milestone-4": true,
            "Milestone-5": true,
            "Milestone-6": false
            },
        }
    },
    {
        mail : "staff@bhc.edu.in",
        to: "Ms Bhuvaneshwari", 
        role: "Staff",
        task: {
            name: "Prepare budget report for conference", 
            description: "Budgeting for conference held on september",
            deadline: "2024-03-12T12:30:00.000Z",
            milestones: {
            "Milestone-1": true,
            "Milestone-2": true,
            "Milestone-3": true,
            "Milestone-5": true,
            "Milestone-6": false
        },
    }
},
{
    mail : "staff@bhc.edu.in",
    to: "Mr James Daniel", 
    role: "Staff",
    task: {
        name: "Schedule and Manage department inaugration", 
        description: "Budgeting for conference held on september",
        deadline: "2024-03-12T12:30:00.000Z",
        milestones: {
            "Milestone-1": true,
            "Milestone-2": true,
            "Milestone-3": true,
            "Milestone-5": true,
            "Milestone-6": false
        },
    }
}
]
export const Teacher :TaskType[]= [
    {
        mail : "student@bhc.edu.in",
        to: "Abirami" , 
        role: "Student",
        task: {
            name: "Collect cash for lab manual", 
            description: "Collect 100 per student for the distribution of lab manual",
            deadline: "2024-03-12T12:30:00.000Z",
            milestones: {
                "Milestone-1": true,
                "Milestone-2": true,
                "Milestone-3": true,
                "Milestone-4": true,
                "Milestone-5": true,
                "Milestone-6": false
            },
        }
    },
    {
        mail : "student@bhc.edu.in",
        to: "Rohan Britto", 
        role: "Student",
        task: {
            name: "IOT Workshop", 
            description: "Budgeting for conference held on september",
            deadline: "2024-03-12T12:30:00.000Z",
            milestones: {
            "Milestone-1": true,
            "Milestone-2": true,
            "Milestone-3": true,
            "Milestone-5": true,
            "Milestone-6": false
            },
        }
    },
    {
        mail : "student@bhc.edu.in",
        to: "Ravi Shanker", 
        role: "Student",
        task: {
            name: "IOT Workshop", 
            description: "Budgeting for conference held on september",
            deadline: "2024-03-12T12:30:00.000Z",
            milestones: {
            "Milestone-1": true,
            "Milestone-2": true,
            "Milestone-3": true,
            "Milestone-5": true,
            "Milestone-6": false
            },
        }
    },
]

export const dashboardFliter:Filter[] = [
    {name: "Dr. Paul Dhayabaran", role: "Principal"}, 
    {name: "Dr K Rajkumar", role: "HOD"},
    {name: "Mr Sobers Smiles David", role: "HOD"},
    {name: "Mr James Daniel", role: "Staff"},
    {name: "Dr Karthikeyan", role: "Staff"},
    {name: "Dr Anuradha", role: "Staff"},
    {name: "Ms Bhuvaneshwari", role: "Staff"},
    {name: "Dr Ramah Sivakumar", role: "Staff"},
    {name: "Abirami", role: "Student"},
    {name: "Rohan Britto", role: "Student"},
    {name: "Ravi Shanker", role: "Student"}
]
