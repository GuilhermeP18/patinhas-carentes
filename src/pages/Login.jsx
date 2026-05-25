import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Tentando logar com: ${email}`);
        navigate('/Home'); 
    };

    return (
        // Corrigido "-50" para "bg-gray-50" para o fundo cinza claro funcionar
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 antialiased font-sans">
            
            {/* Topo: Ícone e Títulos */}
            <div className="flex flex-col items-center text-center mb-8 w-full max-w-xs">
                <div className="w-16 h-16 bg-[#ff6b35] rounded-full flex items-center justify-center text-white font-bold text-xs mb-4 shadow-sm">
                    <img src="../public/patas.png" alt="" />
                </div>
                <h1 className="text-3xl font-bold text-[#ff5e24] mb-1">AdotaPet</h1>
                <p className="text-gray-500 text-sm tracking-wide">Conectando corações e patinhas</p>
            </div>

            {/* Card de Login */}
            <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-[4px_8px_15px_rgba(0,0,0,0.1)]">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Entrar</h3>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Campo de E-mail */}
                    <div className="flex flex-col">
                        <label htmlFor="emailInput" className="text-sm font-semibold text-gray-700 mb-1">
                            E-mail
                        </label>
                        <input
                            id="emailInput"
                            type="email"
                            name="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full h-11 px-4 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Campo de Senha */}
                    <div className="flex flex-col">
                        <label htmlFor="passInput" className="text-sm font-semibold text-gray-700 mb-1">
                            Senha
                        </label>
                        <input
                            id="passInput"
                            type="password"
                            name="senha"
                            placeholder="•••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            className="w-full h-11 px-4 border border-gray-300 rounded-lg outline-none transition-all duration-200 focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/20 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Botão Entrar */}
                    <div className="pt-2">                        
                        <button 
                            type="submit" 
                            className="w-full h-12 bg-[#ff6b35] hover:bg-[#ff8254] active:scale-[0.99] text-white font-bold rounded-lg shadow-sm hover:shadow transition-all duration-200 cursor-pointer focus:outline-none"
                        >
                            Entrar
                        </button>
                    </div>
                </form>

                {/* Link de Cadastro */}
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Não tem uma conta?{' '}
                        <a 
                            id="cadastro" 
                            href="/Register" 
                            className="text-[#ff6b35] hover:text-[#e4460d] font-semibold transition-colors duration-200"
                        >
                            Cadastre-se
                        </a>
                    </p>
                </div>
            </div>

        </div>
    );
}