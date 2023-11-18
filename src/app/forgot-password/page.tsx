"use client";
import { resetPasswordWithEmail } from "@/server/auth/update-user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast"

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const { toast } = useToast()
    const resetPass = async () => {
        const { status, error } = await resetPasswordWithEmail(email);
        if (status) {
            alert("Password Updated Successfully"); //Will change this soon to customized alert
            router.push("/");
        } else {
            toast({
                description: error,
              }) 
        }
    };
    return (
        <div
            className=" flex gap-20 flex-col justify-center items-center h-[100vh] bg-cover "
            style={{ backgroundImage: "url(./Login/circle-scatter.svg)" }}
        >
            <div className="w-[35vw] p-8">
                <h1 className="text-3xl font-semibold mb-6">Verify your Email</h1>
                <label className="text-lg font-medium">Email</label>
                <input
                    className="border-2 border-grey-400 rounded-lg my-1 h-10 w-full"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button
                    className="bg-[#4d47eb]  hover:bg-[hsl(242,80%,65%)] focus:bg-[hsl(242,89%,71%)] text-white px-5 py-2 mt-6 rounded-xl p-1"
                    onClick={resetPass}
                >
                    {" "}
                    Confirm
                </button>
            </div>
        </div>
    );
}
