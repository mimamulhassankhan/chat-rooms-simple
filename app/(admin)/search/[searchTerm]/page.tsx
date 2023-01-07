import React from "react";
import './searchItem.scss'
const key = "8b8b7e6a06f328ae3003b3aba755c8b55f14e145d812d1504b2c48c6ef62b816";
const searchItem = async (text: string) => {
    const res = await fetch(
        `https://serpapi.com/search.json?q=${text}&api_key=${key}`
    );
    const results = await res.json();
    return results;
};

const SearchResults = async ({ params }: any) => {
    const searchText = params?.searchTerm;
    const results = await searchItem(searchText);
    
    return (
        <div className="search-div">
            {results.organic_results.map((item: any) => 
               <div className="search-div__card"> <p className="search-div__title">{item.title}</p>
               <p className="search-div__details">{item.snippet}</p> </div>
            )}
        </div>
    );
};

export default SearchResults;
