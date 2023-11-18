"use client";
import { updatePassword } from "@/server/auth/update-user";
import supabase from "@/server/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"

function UpdatePassword() {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const router = useRouter();
    const { toast } = useToast()
    const updatePass = async () => {
        if (password1 === password2) {
            const { status, error, data } = await updatePassword(password1);
            if (status) {
                router.push("/");
                toast({
                    description:"Password Updataed Succesfully",
                  }) 
            } else {
                toast({
                    description:error,
                  })
            }
        } else {
            toast({
                description:"Password mismatch. Enter Again",
              })
        }
    };
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event !== "PASSWORD_RECOVERY") {
                // if there's no password recovery event (this will event will be set by supabase when the reset link is clicked)
                router.push("/");
            }
        });
    }, []);
    return (
        <div
            className=" flex gap-20 flex-col justify-center items-center h-[100vh] bg-cover "
            style={{ backgroundImage: "url(./Login/circle-scatter.svg)" }}
        >
            <div className="w-[35vw] p-8">
                <h1 className="text-3xl font-semibold mb-6">Reset Password</h1>
                <label className="text-lg font-medium">Password</label>
                <input
                    className="border-2 border-grey-400 rounded-lg my-1 h-10 w-full"
                    type="text"
                    name="newPassword1"
                    id="newPassword1"
                    onChange={(e) => setPassword1(e.target.value)}
                ></input>
                <label className="text-lg font-medium">Re-enter Password</label>
                <input
                    className="border-2 border-grey-400 rounded-lg my-1 h-10 w-full"
                    type="text"
                    name="newPassword2"
                    id="newPassword2"
                    onChange={(e) => setPassword2(e.target.value)}
                ></input>
                <br></br>
                <button
                    className="bg-[#4d47eb]  hover:bg-[hsl(242,80%,65%)] focus:bg-[hsl(242,89%,71%)]  text-white px-5 py-2 mt-6 rounded-xl p-1"
                    onClick={updatePass}
                >
                    {" "}
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default UpdatePassword;
