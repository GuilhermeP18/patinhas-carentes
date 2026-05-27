import { useState } from 'react';

export default function Home(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <div id="nav" className="w-full h-[80px] border-b border-gray-400/50 flex items-center justify-between px-4 md:px-20 bg-white">
                <div className="flex items-center">
                    <img src="../patas.png" alt="" className="w-10 h-10 bg-[#ff6b35] rounded-full mr-3" />  
                    <h1 className="text-xl font-bold">AdotaPet</h1>
                </div>

                
                <div className="hidden md:flex items-center gap-6">
                    <div className="bg-[#ff6b35] hover:bg-[#ff8254] rounded-xl px-4 py-2 flex items-center text-white transition-all duration-200">
                        <button className="cursor-pointer font-medium">
                            Cadastrar Pet
                        </button>
                    </div>
                    <a href="/" className="cursor-pointer text-gray-400 hover:text-[#3a3a3a] transition-all duration-200 font-medium">
                        Sair
                    </a>                          
                </div>

                
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 px-4 py-6 flex flex-col gap-4 shadow-lg">
                    <button className="w-full bg-[#ff6b35] text-white py-3 rounded-xl font-bold hover:bg-[#ff8254] transition-colors">
                        Cadastrar Pet
                    </button>
                    <a href="/" className="w-full text-center text-gray-400 py-2 font-medium hover:text-[#3a3a3a] transition-colors">
                        Sair
                    </a>
                </div>
            )}
        </div>
    );
}