'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './search.scss'

const Search = () => {
    const [search,setSearch]=useState("")
    const router=useRouter()

    const handleSearch=(e:any)=>{
       e.preventDefault();
       setSearch('');
       router.push(`/search/${search}`)
    }
    return (
        <form  onSubmit={handleSearch}>
        <input className='search__input-field' name="inputData" onChange={(e)=>setSearch(e.target.value)} type="text"/>
        <button className='search__btn' type='submit'>search</button>
        </form>
    );
};

export default Search;