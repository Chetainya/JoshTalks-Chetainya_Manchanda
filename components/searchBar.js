import React, { useState } from 'react'

function SearchBar({OnSearch}) {
    const [searchOuery , setSearchQuery] = useState("");
    function changeHandeler(e){
      e.preventDefault();
      console.log(e.target.value)
      setSearchQuery(e.target.value)
      OnSearch(e.target.value);
    }
    
   
  return (

    
      <nav>
        <input type='text' value={searchOuery} onChange={changeHandeler} placeholder='Seach Tasks' />

      </nav>
    
  )
}

export default SearchBar
