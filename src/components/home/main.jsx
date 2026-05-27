import SearchBar from "./searchBar"
import Filter from "../components/home/filter";

export default function Main(){

    return(
        <div id="container" className="w-full flex-1 bg-[#f6f5fa]">
            <div className=" h-25">
                <SearchBar/>
            </div>
            <div>
                <div>
                    <Filter/>
                </div>
            </div>
        </div>
    )

}