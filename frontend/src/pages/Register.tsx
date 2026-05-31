import React, { useState } from 'react';
import { User, Mail, Lock, MapPin, Phone, Calendar, Building2, Hash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Errors {
    perfil?: string;

    // Adotante/Abrigo
    nomeCompleto?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    rua?: string,
    cidade?: string,
    bairro?: string,
    estado?: string,
    telefone?: string,
    data_nascimento?: string,
    cep?: string,
    cpf?: string,
    
    // Abrigo
    tipo_abrigo?: string,
    cnpj?: string,
    capacidade_total?: string

}

export default function Register() {
    
    const [perfil, setPerfil] = useState('');


    const navigate = useNavigate()

    // Define o estado inicial dos dados
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        password: '',
        confirmPassword: '',
        cep: '',
        rua: '',
        cidade: '',
        bairro: '',
        estado: '',
        telefone: '',
        data_nascimento: '',
        tipo_abrigo: '',
        cnpj: '',
        cpf: '',
        capacidade_total: ''
    });

    
    const [errors, setErrors] = useState<Errors>({});

    //  Usabilidade: Formata os campos automaticamente
    const formatters = {
            cnpj: (value: string) => {
               return value
                   .replace(/\D/g, '')
                   .replace(/^(\d{2})(\d)/, '$1.$2')
                   .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                   .replace(/\.(\d{3})(\d)/, '.$1/$2')
                   .replace(/(\d{4})(\d)/, '$1-$2')
                   .slice(0, 18);
           },
           cpf: (value: string) => {
               return value
                   .replace(/\D/g, '')
                   .replace(/(\d{3})(\d)/, '$1.$2')
                   .replace(/(\d{3})(\d)/, '$1.$2')
                   .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                   .slice(0, 14);
           },
           telefone: (value: string) => {
               return value
                   .replace(/\D/g, '')
                   .replace(/^(\d{2})(\d)/g, '($1) $2')
                   .replace(/(\d{5})(\d)/, '$1-$2')
                   .slice(0, 15);
           },
           cep: (value: string) => {
               return value
                   .replace(/\D/g, '')
                   .replace(/(\d{5})(\d)/, '$1-$2')
                   .slice(0, 9);
           },
           estado: (value: string) => {
                return value
                   .replace(/[^a-zA-Z]/g, '')
                   .slice(0, 2)
           },
           cidade: (value: string) => {
                return value
                   .replace(/[^a-zA-Z]/g, '')
           }

       };

    const fetchViaCep = async (cep: string) => {
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (data.erro) {
                setErrors(prev => ({ ...prev, cep: 'CEP não encontrado' }));
                return;
            }

            setFormData(prev => ({
                ...prev,
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf
            }));
            setErrors(prev => ({ ...prev, cep: undefined }));
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };
            
       
    // Atualiza o estado dos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let campoFormatado = value;


        if (name === 'cnpj') campoFormatado = formatters.cnpj(value);
        if (name === 'cpf') campoFormatado = formatters.cpf(value);
        if (name === 'telefone') campoFormatado = formatters.telefone(value);
        if (name === 'cep') {
            campoFormatado = formatters.cep(value);
            if (campoFormatado.replace(/\D/g, '').length === 8) {
                fetchViaCep(campoFormatado);
            }
        }
        if (name === 'estado') campoFormatado = formatters.estado(value).toUpperCase();
        if (name === 'cidade') campoFormatado = formatters.cidade(value);

        setFormData({
            ...formData,
            [name]: campoFormatado
        });
        
    };

    
    const validarFormulario = () => {
        let errosTemporarios: Errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefoneRegex = /^(\d{2})(\d{4,5})(\d{4})$/;
        const cidadeRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/;
        const cepRegex = /^\d{5}-?\d{3}$/;
        const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
        const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

        if (!perfil) {
            errosTemporarios.perfil = 'Selecione uma das opções acima.';
        }

        if (!formData.nomeCompleto.trim()) {
            errosTemporarios.nomeCompleto = 'O nome completo é obrigatório.';
        }

        if (!formData.email.trim()) {
            errosTemporarios.email = 'O e-mail é obrigatório.';
        } else if (!emailRegex.test(formData.email)) {
            errosTemporarios.email = 'Insira um e-mail válido.';
        }

        if (!formData.password.trim()) {
            errosTemporarios.password = 'A senha é obrigatória.';
        } else if (formData.password.length < 6) {
            errosTemporarios.password = 'A senha deve ter pelo menos 6 caracteres.';
        }

        if (formData.password !== formData.confirmPassword) {
            errosTemporarios.confirmPassword = 'As senhas não coincidem.';
        }

        if (!formData.telefone.trim()) {
            errosTemporarios.telefone = 'O telefone é obrigatório';
        } else if (!telefoneRegex.test(formData.telefone.replace(/\D/g, ''))) {
            errosTemporarios.telefone = 'Insira um telefone válido';
        }

        if (!formData.cep.trim()) {
            errosTemporarios.cep = 'O campo cep é obrigatório';
        } else if (!cepRegex.test(formData.cep.replace(/\D/g, ''))) {
            errosTemporarios.cep = 'Insira um CEP válido';
        }

        if (!formData.rua.trim()) {
            errosTemporarios.rua = 'O campo rua é obrigatório';
        }

        if (!formData.cidade.trim()) {
            errosTemporarios.cidade = 'O campo cidade é obrigatório';
        } else if (!cidadeRegex.test(formData.cidade)) {
            errosTemporarios.cidade = 'O nome da cidade contém caracteres inválidos';
        }

        if (!formData.bairro.trim()) {
            errosTemporarios.bairro = 'O campo bairro é obrigatório';
        }

        if (!formData.estado.trim()) {
            errosTemporarios.estado = 'O campo estado é obrigatório';
        }

        // Validação CPF e Data para Adotante
        if (perfil === 'adotante') {
            if (!formData.data_nascimento) {
                errosTemporarios.data_nascimento = 'A data é obrigatória';
            } else {
                const dataNasc = new Date(formData.data_nascimento);
                const hoje = new Date();
                let idade = hoje.getFullYear() - dataNasc.getFullYear();
                const mes = hoje.getMonth() - dataNasc.getMonth();
                
                // Ajusta a idade se o aniversário ainda não aconteceu este ano
                if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
                    idade--;
                }

                if (idade < 18) {
                    errosTemporarios.data_nascimento = 'Você deve ter pelo menos 18 anos para se cadastrar.';
                }
            }

            if (!formData.cpf.trim()) {
                errosTemporarios.cpf = 'O CPF é obrigatório';
            } else if (!cpfRegex.test(formData.cpf.replace(/\D/g, ''))) {
                errosTemporarios.cpf = 'Insira um CPF válido';
            }
        }

        // Validações específicas para Abrigo
        if (perfil === 'abrigo') {
            if (!formData.tipo_abrigo) {
                errosTemporarios.tipo_abrigo = 'Selecione o tipo do abrigo';
            }

            const tipoIndependente = formData.tipo_abrigo === 'independente' || 
                                   formData.tipo_abrigo === 'larTemporario' || 
                                   formData.tipo_abrigo === 'protetorAutonomo';

            if (tipoIndependente) {
                // Para independentes: CPF obrigatório, CNPJ opcional
                if (!formData.cpf.trim()) {
                    errosTemporarios.cpf = 'O CPF é obrigatório para protetores independentes';
                } else if (!cpfRegex.test(formData.cpf.replace(/\D/g, ''))) {
                    errosTemporarios.cpf = 'Insira um CPF válido';
                }
            } else {
                // Para organizações: CNPJ obrigatório
                if (!formData.cnpj.trim()) {
                    errosTemporarios.cnpj = 'O CNPJ é obrigatório';
                } else if (!cnpjRegex.test(formData.cnpj.replace(/\D/g, ''))) {
                    errosTemporarios.cnpj = 'Insira um CNPJ válido';
                }
            }
            

            if (!formData.capacidade_total.trim()) {
                errosTemporarios.capacidade_total = 'A capacidade total é obrigatória';
            } else if (isNaN(Number(formData.capacidade_total)) || Number(formData.capacidade_total) <= 0) {
                errosTemporarios.capacidade_total = 'Insira um número válido';
            }
        }


        setErrors(errosTemporarios);        
        return Object.keys(errosTemporarios).length === 0;
    };

    // Envia o formulario e valida os campos.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validarFormulario()) {
            console.log('Formulário enviado com sucesso!', { perfil, ...formData });
            // navigate('/')
        }
    };

    return (

        <div className='min-h-screen w-full flex justify-center bg-gray-50 p-4 items-start pt-12 lg:pt-20'>


            <div className='border border-gray-200 bg-white pt-6 px-8 pb-8 rounded-xl shadow-sm w-full max-w-3xl transition-all duration-500 ease-in-out'>
                <div>
                    <p className='text-2xl font-semibold mb-4'>Criar conta</p>
                </div>
                <div>
                    <p className='mb-4 text-gray-600'>Eu sou:</p>
                </div>

                <form onSubmit={handleSubmit}>

                    {/* ================================================================================================== */}
                                                    {/* SELEÇÃO DE PERFIL: ABRIGO / ADOTANTE */}


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



                                                            {/*  CAMPOS COMUNS (ADOTANTE E ABRIGO) */}


                    <div className={`grid transition-all duration-500 ease-in-out ${perfil !== '' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                            <div className="animate-fade-in space-y-5">

                                
                                {/* ================================================================================================== */}
                                                                {/* INPUT DE NOME COMPLETO */}

                                <div className='flex flex-col'>
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

                                {/* ================================================================================================== */}
                                                                        {/* INPUT DE EMAIL */}


                                <div className='flex flex-col'>
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

                                {/* ================================================================================================== */}
                                                                        {/* INPUT DE SENHA */}

                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
                                                className={`border rounded-md  h-10 pr-2 pl-10 w-full outline-none transition-colors
                                                    ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                            />
                                        </div>
                                        {errors.confirmPassword && <span className="text-xs text-red-500 mt-1">{errors.confirmPassword}</span>}
                                    </div>
                                </div>

                                {/* ================================================================================================== */}
                                                                {/* DOCUMENTO E CONTATO/DATA */}

                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <div className={`flex flex-col ${perfil === 'abrigo' ? 'sm:col-span-2' : ''}`}>
                                        <label htmlFor="telefone" className="text-sm font-medium text-gray-700">Telefone</label>
                                        <div className='relative mt-2'>
                                            <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.telefone ? 'text-red-400' : 'text-gray-400'}`} />
                                            <input 
                                                type="text" 
                                                name="telefone" 
                                                id="telefone" 
                                                maxLength={15}
                                                value={formData.telefone}
                                                onChange={handleChange}
                                                className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                                    ${errors.telefone ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                placeholder="(00) 00000-0000"
                                            />
                                        </div>
                                        {errors.telefone && <span className="text-xs text-red-500 mt-1">{errors.telefone}</span>}
                                    </div>
                                    {perfil === 'adotante' && (
                                        <div className='flex flex-col'>
                                            <label htmlFor="data_nascimento" className="text-sm font-medium text-gray-700">Data de Nascimento</label>
                                            <div className='relative mt-2'>
                                                <Calendar className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.data_nascimento ? 'text-red-400' : 'text-gray-400'}`} />
                                                <input 
                                                    type="date" 
                                                    name="data_nascimento" 
                                                    id="data_nascimento" 
                                                    value={formData.data_nascimento}
                                                    onChange={handleChange}
                                                    className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                                        ${errors.data_nascimento ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                />
                                            </div>
                                            {errors.data_nascimento && <span className="text-xs text-red-500 mt-1">{errors.data_nascimento}</span>}
                                        </div>
                                    )}
                                </div>

                                {perfil === 'adotante' && (
                                    <div className='flex flex-col'>
                                        <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF</label>
                                        <div className='relative mt-2'>
                                            <Hash className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.cpf ? 'text-red-400' : 'text-gray-400'}`} />
                                            <input 
                                                type="text" 
                                                name="cpf" 
                                                id="cpf" 
                                                value={formData.cpf}
                                                onChange={handleChange}
                                                className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                                    ${errors.cpf ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                placeholder="000.000.000-00"
                                            />
                                        </div>
                                        {errors.cpf && <span className="text-xs text-red-500 mt-1">{errors.cpf}</span>}
                                    </div>
                                )}

                                {/* ================================================================================================== */}
                                                                            {/* ENDEREÇO*/}

                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="cep" className="text-sm font-medium text-gray-700">CEP</label>
                                        <div className='relative mt-2'>
                                            <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.cep ? 'text-red-400' : 'text-gray-400'}`} />
                                            <input 
                                                type="text" 
                                                name="cep" 
                                                id="cep" 
                                                value={formData.cep}
                                                onChange={(e) => {
                                                    handleChange(e);
    
                                                    if (e.target.value.length === 8) { fetchViaCep(e.target.value) }
                                                }}
                                                className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                                    ${errors.cep ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                placeholder="00000-000"
                                            />
                                        </div>
                                        {errors.cep && <span className="text-xs text-red-500 mt-1">{errors.cep}</span>}
                                    </div>
                                    <div className='flex flex-col sm:col-span-2'>
                                        <label htmlFor="rua" className="text-sm font-medium text-gray-700">Rua</label>
                                        <div className='relative mt-2'>
                                            <input 
                                                type="text" 
                                                name="rua" 
                                                id="rua" 
                                                value={formData.rua}
                                                onChange={handleChange}
                                                className={`border rounded-md px-3 h-10 w-full outline-none transition-colors
                                                    ${errors.rua ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                placeholder="Nome da rua"
                                            />
                                        </div>
                                        {errors.rua && <span className="text-xs text-red-500 mt-1">{errors.rua}</span>}
                                    </div>
                                </div>

                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="bairro" className="text-sm font-medium text-gray-700">Bairro</label>
                                        <input 
                                            type="text" 
                                            name="bairro" 
                                            id="bairro" 
                                            value={formData.bairro}
                                            onChange={handleChange}
                                            className={`border rounded-md px-3 h-10 w-full outline-none mt-2 transition-colors
                                                ${errors.bairro ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                        />
                                        {errors.bairro && <span className="text-xs text-red-500 mt-1">{errors.bairro}</span>}
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="cidade" className="text-sm font-medium text-gray-700">Cidade</label>
                                        <input 
                                            type="text" 
                                            name="cidade" 
                                            id="cidade" 
                                            value={formData.cidade}
                                            onChange={handleChange}
                                            className={`border rounded-md px-3 h-10 w-full outline-none mt-2 transition-colors
                                                ${errors.cidade ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                        />
                                        {errors.cidade && <span className="text-xs text-red-500 mt-1">{errors.cidade}</span>}
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="estado" className="text-sm font-medium text-gray-700">Estado</label>
                                        <input 
                                            type="text" 
                                            name="estado" 
                                            id="estado" 
                                            maxLength={2}
                                            value={formData.estado}
                                            onChange={handleChange}
                                            className={`border rounded-md px-3 h-10 w-full outline-none mt-2 transition-colors
                                                ${errors.estado ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                            placeholder="UF"
                                        />
                                        {errors.estado && <span className="text-xs text-red-500 mt-1">{errors.estado}</span>}
                                    </div>
                                </div>

                                {/* ================================================================================================== */}
                                                                {/* SEÇÃO DE ABRIGO */}

                                <div className={`grid transition-all duration-500 ease-in-out ${perfil === 'abrigo' ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="border-t border-gray-100 pt-6 space-y-5">
                                            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">Informações do Abrigo</p>
                                            
                                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                                <div className='flex flex-col'>
                                                    <label htmlFor="tipo_abrigo" className="text-sm font-medium text-gray-700">Tipo de Abrigo</label>
                                                    <div className='relative mt-2'>
                                                        <Building2 className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.tipo_abrigo ? 'text-red-400' : 'text-gray-400'}`} />
                                                        <select 
                                                            
                                                            name="tipo_abrigo" 
                                                            id="tipo-abrigo"
                                                            value={formData.tipo_abrigo}
                                                            onChange={handleChange}
                                                            className="px-10 p-2 w-[99.7%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        >
                                                            <option value="">Selecionar</option>
                                                            <option value="Ong">ONG</option>
                                                            <option value="independente">Independente</option>
                                                            <option value="abrigoMunicipal">Abrigo Municipal</option>
                                                            <option value="empresaSocial">Empresa Social</option>
                                                            <option value="Publico">Publico</option>
                                                            <option value="coletivoProtecao">Coletivos de Proteção</option>
                                                            <option value="larTemporario">Lar temporário</option>
                                                            <option value="protetorAutonomo">Protetor Autônomo</option>
                                                        </select>
                                                    </div>
                                                    {errors.tipo_abrigo && <span className="text-xs text-red-500 mt-1">{errors.tipo_abrigo}</span>}
                                                </div>

                                                <div className='flex flex-col'>
                                                    {/* DOCUMENTO DINÂMICO BASEADO NO TIPO */}
                                                    {(formData.tipo_abrigo === 'independente' || formData.tipo_abrigo === 'larTemporario' || formData.tipo_abrigo === 'protetorAutonomo') ? (
                                                        <>
                                                            <label htmlFor="cpf" className="text-sm font-medium text-gray-700">CPF do Responsável</label>
                                                            <div className='relative mt-2'>
                                                                <Hash className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.cpf ? 'text-red-400' : 'text-gray-400'}`} />
                                                                <input 
                                                                    type="text" 
                                                                    name="cpf" 
                                                                    id="cpf" 
                                                                    value={formData.cpf}
                                                                    onChange={handleChange}
                                                                    className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                                                        ${errors.cpf ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                                    placeholder="000.000.000-00"
                                                                />
                                                            </div>
                                                            {errors.cpf && <span className="text-xs text-red-500 mt-1">{errors.cpf}</span>}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <label htmlFor="cnpj" className="text-sm font-medium text-gray-700">CNPJ</label>
                                                            <div className='relative mt-2'>
                                                                <Hash className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.cnpj ? 'text-red-400' : 'text-gray-400'}`} />
                                                                <input 
                                                                    type="text" 
                                                                    name="cnpj" 
                                                                    id="cnpj" 
                                                                    value={formData.cnpj}
                                                                    onChange={handleChange}
                                                                    className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                                                        ${errors.cnpj ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                                    placeholder="00.000.000/0000-00"
                                                                />
                                                            </div>
                                                            {errors.cnpj && <span className="text-xs text-red-500 mt-1">{errors.cnpj}</span>}
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className='flex flex-col'>
                                                <label htmlFor="capacidade_total" className="text-sm font-medium text-gray-700">Capacidade Total de Animais</label>
                                                <div className='relative mt-2'>
                                                    <Hash className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.capacidade_total ? 'text-red-400' : 'text-gray-400'}`} />
                                                    <input 
                                                        type="number" 
                                                        name="capacidade_total" 
                                                        id="capacidade_total" 
                                                        value={formData.capacidade_total}
                                                        onChange={handleChange}
                                                        className={`border rounded-md pr-2 pl-10 h-10 w-full outline-none transition-colors
                                                            ${errors.capacidade_total ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-500'}`}
                                                        placeholder="Quantidade máxima de pets"
                                                    />
                                                </div>
                                                {errors.capacidade_total && <span className="text-xs text-red-500 mt-1">{errors.capacidade_total}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ================================================================================================== */}
                                                            {/* BOTAO PARA ENVIAR FORMULARIO */}

                                <div className='mt-8 text-center space-y-4 pt-4'>
                                    <button type="submit" className='w-full bg-[#ff6b35] hover:bg-[#ff8254] text-white font-semibold py-2.5 rounded-md transition-colors shadow-sm cursor-pointer'>
                                        Criar conta
                                    </button>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </form>
                <p className=' mt-2 text-center text-sm text-gray-600'>
                    Já tem uma conta? <a href="/" className='text-[#ff6b35] hover:text-[#e4460d] font-semibold transition-colors duration-200'>Entrar</a>
                </p>
            </div>
            
        </div>
    );
}
