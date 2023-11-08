"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, signOut } from "@/server/auth/auth-user";
import { ToLocalTime } from "@/utilities/utillities";
import { Button, Skeleton } from "@nextui-org/react";
import TaskForm from "@/components/task-form";
import Image from "next/image";
import exportIcon from "../../public/export.svg";
import { fetchTasks } from "@/server/data/fetch-data";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rolePower, setRolePower] = useState(0);
  const date = new Date();
  const today = ToLocalTime(date);
  const Hour = today.getUTCHours();
  let greeting: string;

  if (Hour >= 0 && Hour < 12) {
    greeting = "Good Morning";
  } else if (Hour > 12 && Hour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const [task, setTask] = useState({});
  useEffect(() => {
    async function fetchSession() {
      const data = await getSession();
      if (!data.data) {
        router.push("/login");
      } else {
        let id = data.data?.user.id;
        let meta = data.data?.user.user_metadata;
        setName(meta.name);
        setRolePower(meta.role_power);
        const tasks = await fetchTasks(id);
        if (tasks.data) {
          setTask(tasks.data);
        }
      }
    }
    fetchSession();
  }, []);

  async function signUserOut() {
    const { data, error, message, status } = await signOut();
    if (status) {
      window.location.href = "/";
    } else {
      console.error(error);
    }
  }

  return (
    <>
      {rolePower === 1 ? (
        <div className="px-20 py-7 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold">
              {greeting}
              {name ? (
                <span className="text-[rgba(62,56,245)]"> {name}</span>
              ) : (
                <Skeleton className="h-3 w-3/5 rounded-lg" />
              )}
              !
            </h1>
            <p className="text-xl  text-slate-500 mt-1">
              Here is a list of your tasks
            </p>
          </div>
          <div className="flex gap-12  items-center justify-center">
            <Button
              className="rounded-lg bg-[rgba(62,56,245,0.9)] text-white font-medium"
              onClick={() => signUserOut()}
            >
              Sign-out
            </Button>
          </div>
        </div>
      ) : (
        <div className="px-20 py-7 flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold flex gap-2">
              {greeting}
              {name ? (
                <span className="text-[rgba(62,56,245)]"> {name}</span>
              ) : (
                <span>
                  <Skeleton className="h-12 w-40 rounded-lg" />
                </span>
              )}
              !
            </h1>
            <p className="text-xl text-slate-500 mt-1">
              Here is a list of your tasks
            </p>
          </div>
          {name ? (
            <div className="flex gap-12  items-center justify-center">
              <TaskForm />
              <Button className="rounded-lg bg-slate-100">
                <Image src={exportIcon} width={20} alt="Plus"></Image>
                Export
              </Button>
              <Button
                className="rounded-lg bg-[rgba(62,56,245,0.9)] text-white font-medium"
                onClick={() => signUserOut()}
              >
                Sign-out
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
