import justice from '../assets/justice.jpg'
import MaskImg from '../assets/Mask-IMG.png'
import Immigration from '../assets/immigration.png'
import Estate from '../assets/estate.png'

function Home() {
    return (
    <>
        <div className='mx-auto w-full flex'>
            <div className='mx-auto px-5 w-1/2'>
                <div className=' flex items-center justify-center mt-10 text-4xl font-bold text-blue-600'>Navigating Legal Waters,<br></br> Securing  Your Tomorrow</div>

                <p className='font-medium flex items-center justify-center mt-10 text-lg'>We advocate for customers and underrepresented parties,<br></br> amplifying their voices and safeguarding their rights </p>

                <div className='flex gap-5 items-center justify-center'>


                <button
                className="inline-block rounded h-10 w-25 px-4 bg-indigo-600  text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring mt-5"
                type="button">
                    Get Started
                </button>

                <button
                className="inline-block rounded h-10 w-25 px-4 bg-indigo-600  text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring mt-5"
                type="button">
                    About Us           
                </button>
                </div>
            </div>

            <div className='w-1/2 overflow-hidden flex justify-center items-center '><img src={MaskImg} alt='MaskImg' className='h-80 px-12 pr-15 object-cover object-center  '></img></div>
            

            
        </div>

        <div className='flex flex-wrap mx-auto mt-12'>
                <div className='w-1/2'>
                    
                    <div className=' pl-5 text-4xl flex items-center justify-center text-center font-bold text-blue-400'>
                    Defending your rights, crafting your victory
                    </div> 

                    <p className='mt-10 text-center text-lg'>
                        We excel in advancing for consumers and smaller entities in legal battles against corporate giants. Our focus areas encompass cases involving emission scandals , data breaches, online gambling , estabhlishments and broader consumer rights issues
                    </p>   
                </div>

                <div className='w-1/2'>
                    <img src={justice} className='h-30 w-30 px-10 ' ></img>
                </div>
        </div>

        <div className='flex justify-center items-center mx-auto mt-12'>
            <div className='mx-auto'>

            <h3 className='font-bold text-blue-600 text-center text-4xl'>Estate Planning and Probate</h3>
            
            <div className='w-full h-full flex items-center justify-center'>
            <img src={Estate} className='h-45'></img>
            </div>
            <p className='text-center'>Our focus encompasses cases involving<br></br> emission scandals, data breaches,<br></br> online gambling estabhlishments</p>

            </div>

            <div className='mx-auto'>

            <h3 className='font-bold text-blue-600 text-center text-4xl pb-14'>Immigration Laws</h3>
            
            <div className='w-full h-full flex items-center justify-center'>
            <img src={Immigration} className='h-60 w-60'></img>
            </div>
            <p className='text-center'>We excel in advocating for consumers and smaller entities</p>
            </div>
        </div>
    </>
        
    )
}

export default Home