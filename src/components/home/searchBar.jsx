import { Search } from 'lucide-react'

export default function SearchBar() {
    return (
       
        <div className="flex items-center w-full h-full justify-center relative">
            
            <div className="pointer-events-none absolute inset-y-0 left-[7.5%] flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
            </div>


            <input 
                type="text" 
                name="" 
                id="" 
                placeholder="Buscar por nome ou localização" 
                className="w-[85%] h-12 pl-11 pr-4 border border-gray-200 rounded-lg outline-gray-300 bg-white"
            />
        </div>
    )
}