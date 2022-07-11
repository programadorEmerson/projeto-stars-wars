import { useContext } from 'react';
import starWarsContext from '../context/starsWarsContext';

const useStarWarsContext = () => useContext(starWarsContext);

export default useStarWarsContext;
