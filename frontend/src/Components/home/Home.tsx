'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Customize Plan', href: '#' },
  { name: 'Track Progress', href: '#' },
  { name: 'Online Community', href: '#' },
  { name: 'Rewards', href: '#' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">

            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <div className="flex justify-center items-center space-x-3">
             <img
              src="/final.png" 
               alt="Logo"
              className="h-20"
            />
          </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >  
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"></div>
        </div>
        <div className="py-32 ">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
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
            PainEase is an AI-powered wellness app that personalizes exercise and support for chronic pain relief—gently, consistently, and compassionately.
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
         



        <div className=" -mx-20 max-w-screen p-6 mt-2 text-left bg-gradient-to-tr from-blue-500 to-teal-500 opacity-200 flex justify-evenly gap-x-5 py-20 ">

  <div className="">
  
  <h1 className="text-white text-5xl font-bold leading-tight mt-10">
    Personalized workout plan
  </h1>
  <h1 className="text-white text-5xl font-bold leading-tight">
    for chronic pain
  </h1>
  <p className="mt-8 text-white text-lg">
    Have your plan customized by us.
  </p>
  <button className="mt-10 px-5 py-2 bg-white text-blue-700 font-semibold rounded shadow hover:bg-gray-100">
    Get Started Now!
  </button>
  </div>

  <div >
            <img
            src="/chronic.png" 
           className=" h-80 w-200 "
          />
        </div>

</div>


 {/* left */}
<div className="flex ">
<div className=" w-3/2 -ml-20 p-6 mt-2 bg-orange-100  py-10 px-40 text-center">

<div className="">
<h1 className="text-black text-4xl font-thin leading-tight mt-10">
  Track Progress
</h1>

<p className="text-black text-2xl leading-tight pt-3">
  Get rewards by completing tasks
</p>

<button className="mt-10 px-5 py-2 bg-white text-black-700 font-semibold rounded shadow hover:bg-gray-100 text-black">
  View
</button>
</div>

<div >
          <img
          src="/track.png" 
         className=" pt-5 h-80 w-200 "
        />
      </div>

</div>

<div>
<div className=" w-3/2 ml-2 p-6 mt-2 -mr-20 px-40 bg-gradient-to-tr from-pink-500 to-blue-200 py-10 text-center">

<div className="">

<h1 className="text-black text-4xl font-thin leading-tight mt-10">
  Online Community
</h1>

<p className="text-black text-2xl leading-tight pt-3">
  Get support from peers 
</p>

<button className="mt-10 px-5 py-2 bg-white text-black-700 font-semibold rounded shadow hover:bg-gray-100 text-black">
  Visit Now
</button>
</div>

<div >
          <img
          src="/hug.png" 
         className=" h-80 w-300 pl-15 pr-15 ml-30 mr-40"
        />
      </div>

</div>
</div>
</div>
</div>

</div>     
       


    
     
 
  )}

