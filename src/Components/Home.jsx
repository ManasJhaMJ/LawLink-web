import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Testimonials from './Testimonials';
import Features from './Features';
import Pricing from './Pricing';
import Steps from './Steps';

function Home() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    
    // Remove the useEffect to prevent automatic login on page load
    // const [isRedirecting, setIsRedirecting] = useState(false);

    // Function to trigger login when button is clicked
    const handleAIAssistantClick = () => {
        if (!isAuthenticated) {
            loginWithRedirect({
                redirectUri: window.location.origin + "/form",  // Redirect to /form after login
            });
        } else {
            navigate("/form");  // Redirect to /form if authenticated
        }
    };

    return (
        <>
            <section
                className="relative w-full h-screen bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://knowliah.com/wp-content/uploads/2022/08/What_Trends-Legal-Tech-Holds-for-the-Industry-in-2020.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-70"></div>
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-6">
                    <div className='flex space-x-5'><h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        Welcome to 
                    </h1>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-light-blue-700">
                       LawLink
                    </h1></div>
                    <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto">
                        Get reliable and expert legal advice at your fingertips. Our AI-powered legal assistant is here to help with all your legal needs.
                    </p>
                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <a
                                    href="/form"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg"
                                >
                                    AI Assistant
                                </a>
                                <a
                                    href="/connect"
                                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md text-lg hover:bg-white hover:text-blue-600"
                                >
                                    Lawyer Connect
                                </a>
                            </>
                        ) : (
                            <button
                                onClick={handleAIAssistantClick}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg"
                            >
                                Log in to Access Services
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <section>
                <Testimonials />
                <Features />
                <Pricing />
                <Steps />
            </section>
        </>
    );
}

export default Home;
