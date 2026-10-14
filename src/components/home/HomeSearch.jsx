import { useNavigate } from "react-router-dom";
import { useState } from "react";


function HomeSearch() {

    const[query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit= (event) =>{
        event.preventDefault();

        const trimmedQuerry = query.trim();

        if(!trimmedQuerry){
            return;
        }

        navigate(
            `/search?q=${encodeURIComponent(trimmedQuerry)}`
        );
    };

    return (
        <section className="home-search-section" >
            <form className="home-search"
            onSubmit={handleSubmit}>
                <span className="search-icon">🔍</span>
                <input
                type="text"
                placeholder="Search what you want..."
                value={query}
                onChange={(event) => setQuery(event.target.value)} />
                <button type = "submit">search..</button>
            </form>
        </section>
    );
}

export default HomeSearch;