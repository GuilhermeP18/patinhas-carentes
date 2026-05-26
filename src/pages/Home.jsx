export default function Home(){
    return (
        <div>
            <div id="nav" className="w-[100%] h-[80px] border-b border-gray-400/50 flex place-content-between">
                <div className="flex items-center ml-40">
                    <div>
                        <img src="../patas.png" alt="" className="w-10 h-10 bg-[#ff6b35] rounded-full mx-5" />  
                    </div>
                    <div>
                        <h1 style={{fontSize: 'Larger', fontWeight: 'bold'}}>AdotaPet</h1>
                    </div>
                </div>
                <div className="flex items-center w-[20%] place-content-between mr-50">
                    <div className="w-[40%] h-[50%] m-auto bg-[#ff6b35] hover:bg-[#ff8254] rounded-xl items-center flex text-white transition-all duration-200">
                        <button className="w-full h-full cursor-pointer">
                            Cadastrar Pet
                        </button>
                    </div>
                    <div className="mr-10">
                        <button className="cursor-pointer text-gray-400 hover:text-[#3a3a3a] transition-all duration-200">
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}