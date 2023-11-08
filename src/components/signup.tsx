"use client";
import { useState } from "react";
import { signUp, login } from "@/server/auth/auth-user";
import vector from "../../public/Login/signup-vector.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setEmail } from "../store/slice";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  async function signupUser(name: string, email: string, password: string) {
    const res = await signUp(name, email, password);
    if (res.status) {
      dispatch(setEmail(email));
      login(email, password);
      alert(`${res.data} - Logged In Successfully`);
      router.push("/");
    } else {
      alert(res.error);
    }
  }

  return (
    <div
      className="md:flex justify-center items-center bg-cover h-[100vh] bgImage"
      style={{ backgroundImage: "url(./Login/circle-scatter-2.svg)" }}
    >
      <div className="pt-12 md:w-[30vw] flex flex-col gap-2 md:gap-5 p-8">
        <h1 className="text-center mb-5 text-3xl sm:text-left font-medium sm:mb-2">
          Sign-Up to Continue
        </h1>
        <div>
          <label className="text-lg font-medium">Name</label>
          <input
            className="w-full bg-slate-200 rounded-lg px-4 py-2 mt-2"
            type="text"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label className="text-lg font-medium">Email ID</label>
          <input
            className="w-full bg-slate-200 rounded-lg px-4 py-2 mt-2"
            type="mail"
            id="name"
            required
            onChange={(e) => {
              setMail(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label className="text-lg font-medium">Enter Password</label>
          <input
            className="w-full bg-slate-200 rounded-lg px-4 py-2 mt-2"
            type="password"
            id="name"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button
          type="submit"
          className="p-2 mt-3 w-[6rem] mx-auto rounded-lg text-white font-semibold bg-[hsl(242,80%,60%)] hover:bg-[hsl(242,80%,65%)] focus:bg-[hsl(242,89%,71%)]  transition-all ease-linear"
          onClick={() => {
            signupUser(name, email, password);
          }}
        >
          Sign-Up{" "}
        </button>
        <h3 className="text-center mt-1">
          Have an account?{" "}
          <a href="/login" className="text-[#4d47eb] underline">
            Login
          </a>
        </h3>
      </div>
      <Image src={vector} width={520} alt="Login Image"></Image>
    </div>
  );
}
