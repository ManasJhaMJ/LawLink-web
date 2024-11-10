import Testimonials from './Testimonials'
import Features from './Features'
import Pricing from './Pricing'
import Steps from './Steps'

function Home() {
    return (
        <>
            <section
                className="relative w-full h-screen bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661497281000-b5ecb39a2114?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVnYWx8ZW58MHx8MHx8fDA%3D')",
                }}
            >
                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Content Centering */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white px-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                        Welcome to LawLink
                    </h1>
                    <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto">
                        Get reliable and expert legal advice at your fingertips. Our AI-powered legal assistant is here to help with all your legal needs.
                    </p>
                    <div className="flex space-x-4">
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

    )
}

export default Home