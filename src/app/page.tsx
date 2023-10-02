"use client";

import Dashboard from "@/components/dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession, signOut } from "@/server/auth/auth-user";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Principal } from "@/data/assign-to";
import { HOD } from "@/data/assign-to";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    async function fetchSession() {
      const data = await getSession();
      if (data.data == null) {
        router.push("/login");
      }
    }
    fetchSession();
  }, []);
  const mail = useSelector((state: RootState) => state.auth.email);

  return (
    <>
      <Dashboard />
      <h1 className="text-3xl font-semibold mt-10 px-20">Assigned by you</h1>
      <div className="grid grid-cols-3 px-20 my-12 gap-4">
        {HOD.map((assigned, key) => {
          return (
            <>
              <div>
                <div className="p-5 w-[28rem] border-2 rounded-lg min-h-full">
                  <div key={key}>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-2xl">{assigned.task.name}</p>
                        <p className="mt-2">
                          To :{" "}
                          <span className="text-[#3e38f5]">{assigned.to}</span>
                        </p>
                      </div>
                      <div>
                        <p>{assigned.task.description}</p>
                        <p>Due: {assigned.task.deadline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <h1 className="text-3xl font-semibold mt-10 px-20">Assigned to you</h1>
      
    </>
  );

}
