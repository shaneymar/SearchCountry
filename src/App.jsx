
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async() => {
      try{
        const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      const data = await response.json();
      setCountries(data);
      console.log(data);
      }
      catch(e){
        console.error("Error Fetching data", e);
      }
    }
    fetchCountries();
  },[]);

  const filteredCountries = countries.filter((country) => 
  {
    return country.common.toLowerCase().includes(searchTerm.toLowerCase())
  }
  )
  return (

    <div className='container'>
      <input type="text" 
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder='Search for a Country'
      value={searchTerm}
      className='searchBar'
      />
   
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
  {filteredCountries.length > 0
    ? filteredCountries.map((country) => (
        <div key={country.common} className="countryCard">
          <img
            src={country.png}
            alt={country.common}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <h3>{country.common}</h3>
        </div>
      ))
    : countries.length === 0
    ? <p>Loading...</p>   
    : <p>No Countries Found</p>
  }
</div>
    </div>
  )
}

export default App
