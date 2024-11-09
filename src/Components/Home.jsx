import React from 'react'
import MaskImg from '../assets/Mask-IMG.png'

function Home() {
    return (
        <div className='mx-auto w-full flex'>
            <div className='mx-auto px-5 w-1/2'>
                <div className='text-5xl flex items-center justify-center mt-10'>Navigating Legal Waters,<br></br> Securing  Your Tomorrow</div>

                <p className='font-medium flex items-center justify-center mt-10 '>We advocate for customers and underrepresented parties,<br></br> amplifying their voices and safeguarding their rights </p>

                <div>
                    <button>Get Started </button>
                    <button>About Us</button>
                </div>
            </div>

            <div className='w-1/2'>
                <img src={MaskImg} alt='MaskImg' className='h-80 flex justify-center items-center px-10 '></img>
            </div>
        </div>
    )
}

export default Home