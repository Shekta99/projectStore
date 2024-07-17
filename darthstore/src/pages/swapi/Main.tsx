/* eslint-disable @typescript-eslint/no-explicit-any */
// MainComponent.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterList from './CharacterList';
import PlanetList from './PlanetList';
import Loader from '../../components/Loader';
import '../../styles/pages/swapi/main.css';


const MainComponent: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCharacterPage, setCurrentCharacterPage] = useState<number>(1);
  const [currentPlanetPage, setCurrentPlanetPage] = useState<number>(1);
  const [totalCharacterPages, setTotalCharacterPages] = useState<number>(1);
  const [totalPlanetPages, setTotalPlanetPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [charactersResponse, planetsResponse] = await Promise.all([
          axios.get(`https://swapi.dev/api/people/?page=${currentCharacterPage}`),
          axios.get(`https://swapi.dev/api/planets/?page=${currentPlanetPage}`)
        ]);
        setCharacters(charactersResponse.data.results);
        setPlanets(planetsResponse.data.results);
        setTotalCharacterPages(Math.ceil(charactersResponse.data.count / 10)); // Assuming 10 characters per page
        setTotalPlanetPages(Math.ceil(planetsResponse.data.count / 10)); // Assuming 10 planets per page
        setLoading(false);
      } catch (error) {
        setError('Error fetching data from SWAPI');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCharacterPage, currentPlanetPage]);

  const handleNextCharacterPage = () => {
    setCurrentCharacterPage((prevPage) => prevPage + 1);
  };

  const handlePrevCharacterPage = () => {
    setCurrentCharacterPage((prevPage) => prevPage - 1);
  };

  const handleNextPlanetPage = () => {
    setCurrentPlanetPage((prevPage) => prevPage + 1);
  };

  const handlePrevPlanetPage = () => {
    setCurrentPlanetPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className='swtittle'>STAR WARS</h1>
      <h2 className='text-center mb-5'>Characters</h2>
      <CharacterList characters={characters} />
      <div className='mainButtonsCont'>
      <button className='myMainButton' onClick={handlePrevCharacterPage} disabled={currentCharacterPage === 1}>Previous Character Page</button>
      <button className='myMainButton' onClick={handleNextCharacterPage} disabled={currentCharacterPage === totalCharacterPages}>Next Character Page</button>
      </div>
      <h2>......</h2>
      <PlanetList planets={planets} />
      <div className='mainButtonsCont'>
      <button className='myMainButton' onClick={handlePrevPlanetPage} disabled={currentPlanetPage === 1}>Previous Planet Page</button>
      <button className='myMainButton' onClick={handleNextPlanetPage} disabled={currentPlanetPage === totalPlanetPages}>Next Planet Page</button>
      </div>
    </div>
  );
};

export default MainComponent;
