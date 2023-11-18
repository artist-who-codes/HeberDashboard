"use client";
import { useToast } from "@/components/ui/use-toast"

import { useState } from "react";

type Props = {};

const VerifyMail = (props: Props) => {
    const { toast } = useToast()
  const [display, setdisplay] = useState("hidden");
  const [Div1, setDiv1] = useState("");
  function sendOTP() {
    setDiv1("transition-transform duration-500 transform -translate-y-20 h-20");
    setdisplay("block");
    toast({
        description:"Check your mail for OTP",
      })
  }
  return (
    <div
      className=" flex gap-20 flex-col justify-center items-center h-[100vh] bg-cover "
      style={{ backgroundImage: "url(./Login/circle-scatter.svg)" }}
    >
      <div className="w-[35vw] p-8">
        <div className={`${Div1} my-14 MoveUp`}>
          <h1 className="text-3xl font-semibold mb-6">E-Mail Verification</h1>
          <label className="text-lg font-medium">Your E-Mail ID</label>
          <br></br>
          <input
            className="border-2 border-grey-400 rounded-lg my-1 p-1 h-10 w-full"
            type="mail"
            placeholder="rollnoorstaffname@bhc.edu.in"
          ></input>
          <br></br>
          <button
            onClick={() => {
              sendOTP();
            }}
            className="bg-[#4d47eb] text-white px-5 py-2 mt-6 rounded-xl"
          >
            Send OTP
          </button>
          <br></br>
        </div>
        <div id="OTPSection" className={`${display} EaseFadeIn`}>
          <label className="text-lg font-medium"> OTP </label>
          <input
            className="border-2 p-1 border-grey-400 rounded-lg my-1 h-10 w-full"
            type="number"
            placeholder="Enter OTP"
          ></input>
          <br></br>
          <button className="bg-[#4d47eb] text-white px-5 py-2 mt-6 rounded-xl">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
