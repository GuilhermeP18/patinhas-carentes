import { use, useState } from "react";
import { User, Mail, Lock } from "lucide-react"; // Removido o 'Home' que não estava sendo usado

export default function Register() {
  const [perfil, setPerfil] = useState("");
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {/* Container principal ajustado */}
      <div className="border border-gray-200 bg-white pt-5 px-8 rounded-xl shadow-sm w-full max-w-xl">
        <div>
          <p className="text-2xl font-semibold mb-4">Criar conta</p>
        </div>
        <div>
          <p className="mb-4 text-gray-600">Eu sou:</p>
        </div>
        {/*  FORMULARIO DE CADASTRO */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* CADASTRO ADOTANTE */}
            <label
              className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 
                            ${
                              perfil === "adotante"
                                ? "border-orange-500 bg-blue-50/30 text-blue-600"
                                : "border-gray-200 hover:border-gray-300 text-gray-500"
                            }`}
            >
              <input
                type="radio"
                name="tipo_perfil"
                value="adotante"
                checked={perfil === "adotante"}
                onChange={(e) => setPerfil(e.target.value)}
                className="sr-only"
              />
              <User
                className={`w-8 h-8 mb-2 ${perfil === "adotante" ? "text-orange-500" : "text-gray-400"}`}
              />
              <span className="font-bold text-gray-800 text-base">
                Adotante
              </span>
              <span className="text-sm text-gray-400 text-center mt-1">
                Quero adotar um pet
              </span>
            </label>

            {/* CADASTRO ABRIGO */}
            <label
              className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-200
                            ${
                              perfil === "abrigo"
                                ? "border-orange-500 bg-blue-50/30 text-blue-600"
                                : "border-gray-200 hover:border-gray-300 text-gray-500"
                            }`}
            >
              <input
                type="radio"
                name="tipo_perfil"
                value="abrigo"
                checked={perfil === "abrigo"}
                onChange={(e) => setPerfil(e.target.value)}
                className="sr-only"
              />
              <User
                className={`w-8 h-8 mb-2 ${perfil === "abrigo" ? "text-orange-500" : "text-gray-400"}`}
              />
              <span className="font-bold text-gray-800 text-base">Abrigo</span>
              <span className="text-sm text-gray-400 text-center mt-1">
                Tenho pets para adoção
              </span>
            </label>
          </div>

          {/* INPUT DE NOME COMPLETO */}
          <div className="flex flex-col mb-5">
            <label htmlFor="nome" className="text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="nome"
                name="nomeCompleto"
                className="border border-gray-300 rounded-md pr-2 pl-10 h-10 w-full outline-none focus:border-orange-500 transition-colors"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          {/* INPUT DE EMAIL */}
          <div className="flex flex-col mb-5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                required
                className="border border-gray-300 rounded-md pr-2 pl-10 h-10 w-full outline-none focus:border-orange-500 transition-colors"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          {/* INPUT DE SENHAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  autoComplete="new-password"
                  className="border border-gray-300 rounded-md h-10 pr-2 pl-10 w-full outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirmar senha
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  autoComplete="new-password"
                  className="border border-gray-300 rounded-md h-10 pr-2 pl-10 w-full outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 text-center space-y-4 mb-4">
            <button
              type="submit"
              className="w-full h-[48px] cursor-pointer bg-orange-500 text-white font-semibold py-2 rounded-md hover:bg-[#ff8254] transition-colors rounded-lg"
            >
              Criar conta
            </button>
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <a
                href="/Login"
                className="text-[#ff6b35] hover:text-[#e4460d] font-semibold transition-colors duration-200"
              >
                Entrar
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
