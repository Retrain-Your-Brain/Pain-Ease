import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog1 from "./Dialog1";

export default function Home() {

 const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="bg-white">
      <div className="py-32 ">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding.{" "}
            <a href="#" className="font-semibold text-indigo-600">
              <span aria-hidden="true" className="absolute inset-0" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Because Pain Changes—Your Plan Should Too.
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            PainEase is an AI-powered wellness app that personalizes exercise and support for chronic pain
            relief—gently, consistently, and compassionately.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Daily Insights</h1>
          <div className="bg-gray-50 rounded-xl shadow-md p-6 mt-6 w-full max-w-md mx-auto">
            <p className="text-lg font-medium text-gray-700 mb-4">Log your Symptoms</p>
            <button
              className="bg-pink-500 text-white rounded-full w-10 h-10 text-2xl font-bold hover:bg-pink-400"
              onClick={() => setIsOpen(true)}
            >
              +
            </button>
          </div>
        </div>

        {/* Modal */}
       <Dialog1 isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className=" -mx-20 max-w-screen p-6 mt-2 text-left bg-gradient-to-tr from-blue-500 to-teal-500 opacity-200 flex justify-evenly gap-x-5 py-20 ">
          <div className="">
            <h1 className="text-white text-5xl font-bold leading-tight mt-10">Personalized workout plan</h1>
          
            <h1 className="text-white text-5xl font-bold leading-tight">for chronic pain</h1>
            <p className="mt-8 text-white text-lg">Have your plan customized by us.</p>

            <button
              className="mt-10 px-5 py-2 bg-white text-blue-700 font-semibold rounded shadow hover:bg-gray-100"
              onClick={handleClick}
            >
              Get Started Now!
            </button>
          </div>

          <div>
            <img src="/chronic.png" className=" h-80 w-100 " />
          </div>
        </div>

        {/* left */}
        <div className="flex mt-2 ">
          {/* Left Box */}
          <div className="w-3/2 -ml-20 p-10 bg-orange-100 text-center  mr-2">
            <h1 className="text-black text-4xl font-thin leading-tight mt-10">Track Progress</h1>
            <p className="text-black text-2xl leading-tight pt-3">Get rewards by completing tasks</p>
            <button className="mt-10 px-5 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-100">
              View
            </button>
            <div className="flex justify-center pt-6">
              <img src="/track.png" alt="Track Progress" className="h-60 object-contain" />
            </div>
          </div>

          <div className="w-3/2 -mr-20 p-10 bg-gradient-to-tr from-pink-500 to-blue-200 text-center ">
            <h1 className="text-black text-4xl font-thin leading-tight mt-10">Online Community</h1>
            <p className="text-black text-2xl leading-tight pt-3">Get support from peers</p>
            <button className="mt-10 px-5 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-100">
              Visit Now
            </button>
            <div className="flex justify-center pt-6">
              <img src="/hug.png" alt="Online Community" className="h-60 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
