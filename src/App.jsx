import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import BreweryTypeBarChart from './Components/BreweryTypeBarChart';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [micro, setMicro] = useState(0);
  const [brewpub, setBrewpub] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?per_page=20`);
      const breweries = await response.json();
      setData(breweries);
      setFilteredData(breweries);

      let num_micro = 0;
      let num_brewpub = 0;
      breweries.forEach(brewery => {
        if(brewery.brewery_type === "micro") num_micro++;
        else if(brewery.brewery_type === "brewpub") num_brewpub++;
      });

      setMicro((num_micro / breweries.length) * 100);
      setBrewpub((num_brewpub / breweries.length) * 100);
    }

    fetchData();
  }, []);

  const filterByType = (type) => {
    if(type) {
      const newData = data.filter(brewery => brewery.brewery_type === type);
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }

  return (
    <div className="App">
    <h1> Cool Breweries in America</h1>
    <div className="container">
      <nav className="sidebar">
        <h2> Filter by: </h2>
        <button onClick={() => filterByType("micro")}> Micro Only </button>
        <button onClick={() => filterByType("brewpub")}> Brewpub Only </button>
        <button onClick={() => filterByType(null)}> All </button>
      </nav>
      </div>
      <div className="main-content">
        <ul className="brewery-list">
            {filteredData.map(brewery => (
                <li key={brewery.id} className="brewery-item">
                    <span className="brewery-name">{brewery.name}</span>
                    <span className="brewery-type">Type: {brewery.brewery_type}</span>
                    <Link className="brewery-detail" to={`/detail/${brewery.id}`}>More Details</Link>
                </li>
            ))}
        </ul>
        <BreweryTypeBarChart data={filteredData} />
      </div>

    </div>
  );
}

export default App;
