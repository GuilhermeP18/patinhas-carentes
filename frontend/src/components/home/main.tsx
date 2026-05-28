import SearchBar from "./searchBar"
import Filter from "./filter";
import Content from "./content"

export default function Main(){
    return(
        <div id="container" className="w-full flex-1 bg-[#f6f5fa]">
            <div className=" h-25">
                <SearchBar/>
            </div>
            <div id="main-content" className="flex flex-col md:flex-row h-auto md:h-[80vh] w-[85%] md:w-[85%] mx-auto gap-4">
                <div className="w-full md:w-[20%] h-fit md:h-full">
                    <Filter/>
                </div>
                <div id="content" className="flex-1 border border-gray-300 bg-white rounded-lg">
                    <Content/>
                </div>
            </div>
        </div>
    )
}