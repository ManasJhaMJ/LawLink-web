import LegalAI from '../assets/LegalAI.png'
import { useAuth0 } from "@auth0/auth0-react";
function Navbar() {
  const { loginWithRedirect } = useAuth0();
    return (
        <div className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className='flex justify-center items-center'>
            <img src={LegalAI} alt='Legal AI' width={50} height={50} ></img>
        </div>

        
     
      <ul className='flex flex-row gap-5 text-sm  flex-1 flex-wrap justify-center items-center'>
        <li className='text-lg'>Our Services</li>
        <li className='text-lg'>About Us</li>
        <li className='text-lg'>Contact Us</li>
        <li className='text-lg'>More</li>
      </ul>

      <div className="flex items-center gap-4 flex-wrap">
      {/* <button
  onClick={() => loginWithRedirect()}
  className="inline-flex h-10 w-25 items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring"
>
  <span className="text-sm font-medium">Sign Up</span>


          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button> */}

                                          {/* LOGIN BUTTON FOR YASH */}

                                          <button
  onClick={() => loginWithRedirect()}
  className="inline-block rounded h-10 w-25 px-4 bg-indigo-600 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
>
  Log in / Sign Up
</button>

      </div>
    </div>
  </div>
</div>
    )
}

export default Navbar