import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

export default function Register() {
    
    const [perfil, setPerfil] = useState('');

    
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // 3. Estado para controlar os erros de validação
    const [errors, setErrors] = useState({});

    // Função mágica que atualiza qualquer input baseado no seu 'name'
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Função que valida as regras de negócio do formulário
    const validarFormulario = () => {
        let errosTemporarios = {};

        if (!perfil) {
            errosTemporarios.perfil = 'Selecione uma das opções acima.';
        }

        if (!formData.nomeCompleto.trim()) {
            errosTemporarios.nomeCompleto = 'O nome completo é obrigatório.';
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!formData.email) {
            errosTemporarios.email = 'O e-mail é obrigatório.';
        } else if (!emailRegex.test(formData.email)) {
            errosTemporarios.email = 'Insira um e-mail válido.';
        }

        if (!formData.password) {
            errosTemporarios.password = 'A senha é obrigatória.';
        } else if (formData.password.length < 6) {
            errosTemporarios.password = 'A senha deve ter pelo menos 6 caracteres.';
        }

        if (formData.password !== formData.confirmPassword) {
            errosTemporarios.confirmPassword = 'As senhas não coincidem.';
        }

        setErrors(errosTemporarios);
        return Object.keys(errosTemporarios).length === 0;
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validarFormulario()) {
            console.log('Formulário enviado com sucesso!', { perfil, ...formData });
            alert('Conta criada com sucesso! (Verifique o console)');
        }
    };

    return (
        
        <div className='min-h-screen w-full flex items-center justify-center bg-gray-50 p-4'>
            
            
            <div className='border border-gray-200 bg-white pt-6 px-8 pb-8 rounded-xl shadow-sm w-full max-w-3xl'>
                <div>
                    <p className='text-2xl font-semibold mb-4'>Criar conta</p>
                </div>
                <div>
                    <p className='mb-4 text-gray-600'>Eu sou:</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    {/* SELEÇÃO DE PERFIL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                        <label
                            className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 
                            ${perfil === 'adotante' 
                              ? 'border-orange-500 bg-blue-50/30 text-blue-600' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-500'
                            }`}
                        >
                            <input 
                                type="radio"
                                name="tipo_perfil"
                                value="adotante"
                                checked={perfil === 'adotante'}
                                onChange={(e) => setPerfil(e.target.value)}
                                className='sr-only'
                            />
                            <User className={`w-8 h-8 mb-2 ${perfil === 'adotante' ? 'text-orange-500' : 'text-gray-400'}`} />
                            <span className="font-bold text-gray-800 text-base">Adotante</span>
                            <span className="text-sm text-gray-400 text-center mt-1">Quero adotar um pet</span>
                        </label>

                        <label 
                            className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200
                            ${perfil === 'abrigo' 
                              ? 'border-orange-500 bg-blue-50/30 text-blue-600' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-500'
                            }`}
                        >
                            <input 
                                type="radio"
                                name="tipo_perfil"
                                value="abrigo"
                                checked={perfil === 'abrigo'}
                                onChange={(e) => setPerfil(e.target.value)}
                                className='sr-only'
                            />
                            <User className={`w-8 h-8 mb-2 ${perfil === 'abrigo' ? 'text-orange-500' : 'text-gray-400'}`} />
                            <span className="font-bold text-gray-800 text-base">Abrigo</span>
                            <span className="text-sm text-gray-400 text-center mt-1">Tenho pets para adoção</span>
                        </label>
                    </div>
                    <div className="mb-5 h-4">
                        {errors.perfil && <span className="text-xs text-red-500">{errors.perfil}</span>}
                    </div>

                    {/* INPUT NOME COMPLETO */}
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome Completo</label>
                        <div className='relative mt-2'>
                            <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.nomeCompleto ? 'text-red-400' : 'text-gray-400'}`} />
                            <input 
                                type="text" 
                                id="nome" 
                                name='nomeCompleto' 
                                value={formData.nomeCompleto}
                                onChange={handleChange}
                                className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                    ${errors.nomeCompleto ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                placeholder='Seu nome completo'
                            />
                        </div>
                        {errors.nomeCompleto && <span className="text-xs text-red-500 mt-1">{errors.nomeCompleto}</span>}
                    </div>

                    {/* INPUT E-MAIL */}
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
                        <div className='relative mt-2'>
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-400' : 'text-gray-400'}`} />
                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                    ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                placeholder='seu@email.com'
                            />
                        </div>
                        {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                    </div>

                    {/* GRID DE SENHAS */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="password">Senha</label>
                            <div className='relative mt-2'>
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.password ? 'text-red-400' : 'text-gray-400'}`} />
                                <input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`border rounded-md h-10 pr-2 pl-10 w-full outline-none transition-colors
                                        ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                />
                            </div>
                            {errors.password && <span className="text-xs text-red-500 mt-1">{errors.password}</span>}
                        </div>
                        
                        <div className='flex flex-col'>
                            <label htmlFor="confirmPassword">Confirmar senha</label>
                            <div className='relative mt-2'>
                                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`} />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    autoComplete='new-password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`border rounded-md h-10 pr-2 pl-10 w-full outline-none transition-colors
                                        ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                />
                            </div>
                            {errors.confirmPassword && <span className="text-xs text-red-500 mt-1">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    {/* BOTÃO E LINK */}
                    <div className='mt-8 text-center space-y-4'>
                        <button type="submit" className='w-full bg-[#ff6b35] hover:bg-[#ff8254] text-white font-semibold py-2.5 rounded-md transition-colors shadow-sm cursor-pointer'>
                            Criar conta
                        </button>
                        <p className='text-sm text-gray-600'>
                            Já tem uma conta? <a href="/Login" className='text-[#ff6b35] hover:text-[#e4460d] font-semibold transition-colors duration-200'>Entrar</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}