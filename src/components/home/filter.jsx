import { Funnel } from 'lucide-react'

export default function Filter() {

    return (

        <div id="container" className="w-full h-full">
            {/* DIV ABAIXO É TEMPORARIO, quantidade de filtros por animal deve alterar tamanho do container. */}
            <div id="filterContainer" className="h-[60%] bg-[#ffff] border border-gray-200 rounded-2xl">
                <div className="h-[15%] flex gap-3 items-center pl-4">
                <Funnel className='color-orange text-[#ff6b35]'/>
                <h2>Filtros</h2>
            </div>
            </div>
            
            
        </div>


    )
}