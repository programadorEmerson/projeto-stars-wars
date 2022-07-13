import React, { createContext, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestApi } from '../services';

const StarWarsContext = createContext();

const INITIAL_VALUES_FILTERS = {
  planet: '',
  operators: ['maior que', 'menor que', 'igual a'],
  operatorSelected: '',
  columnSelected: '',
  column: [],
  numberReference: '0',
  orderBy: [],
};

const INITIAL_VALUES_ORDER = {
  column: '',
  sort: 'ASC',
};

const EXCLUDE_FILTER = [
  'name', 'climate', 'gravity', 'terrain', 'films',
  'created', 'edited', 'url',
];

export const StarWarsProvider = ({ children }) => {
  const [order, setOrder] = useState(INITIAL_VALUES_ORDER);
  const [data, setData] = useState([]); // Dados da tabela
  const [filters, setFilters] = useState(INITIAL_VALUES_FILTERS); // Filtros disponíveis
  const [loading, setLoading] = useState(false); // loading da tabela
  const [keysColumns, setKeysColumns] = useState([]); // dados para o header da tabela
  const [keysFilter, setKeysFilter] = useState([]); // dados para o filtro da tabela
  const [rawData, setRawData] = useState([]); // dados originais da requisição
  const [filtersApplied, setFiltersApplied] = useState([]); // dados de filtro aplicados

  const handleOrderDataByColumn = useCallback(() => {
    setLoading(true);
    const { sort, column } = order;
    let newData = [];
    const unknownItem = rawData.filter((item) => item[column] === 'unknown');
    const noUnknownItem = rawData.filter((item) => item[column] !== 'unknown');

    if (sort === 'ASC') {
      newData = noUnknownItem.sort((a, b) => a[column] - b[column]);
    } else {
      newData = noUnknownItem.sort((a, b) => b[column] - a[column]);
    }newData = [...newData, ...unknownItem];
    setData(newData);
    setLoading(false);
  }, [order, rawData]);

  const handleValuesOrdanation = ({ name, value }) => {
    setOrder((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClearAllFilters = () => {
    setLoading(true);
    const {
      planet: planetSearch,
      orderBy, column,
      ...rest
    } = INITIAL_VALUES_FILTERS;
    setFilters((prevState) => ({ ...prevState, column: prevState.orderBy, ...rest }));
    setOrder(INITIAL_VALUES_ORDER);
    setData(rawData);
    setFiltersApplied([]);
    setLoading(false);
  };

  const handleAddFilterDeleted = useCallback(
    (filter) => {
      const currentFilters = filters.column;
      setFilters((prevState) => ({ ...prevState,
        column: [...currentFilters, filter] }));
    }, [filters],
  );

  const handleDeleteItemByIndex = useCallback(
    (index) => {
      const newData = [...filtersApplied];
      const columnAdd = newData[index].column;
      handleAddFilterDeleted(columnAdd);
      newData.splice(index, 1);
      setFiltersApplied(newData);
    },
    [filtersApplied, handleAddFilterDeleted],
  );

  const removeUsedFilters = useCallback(
    (filter) => {
      const currentFilters = filters.column;
      const newFilters = currentFilters.filter((column) => column !== filter);
      setFilters((prevState) => ({
        ...prevState, column: newFilters, columnSelected: '',
      }));
    },
    [filters],
  );

  const handleAplyFilters = useCallback(() => {
    const { columnSelected, numberReference, operatorSelected, planet } = filters;
    const {
      planet: planetSearch,
      orderBy,
      column,
      ...rest
    } = INITIAL_VALUES_FILTERS;

    setFiltersApplied((prevState) => [
      ...prevState,
      {
        planet,
        numberReference,
        operator: operatorSelected,
        column: columnSelected,
      },
    ]);

    removeUsedFilters(columnSelected);
    setFilters((prevState) => ({
      ...prevState,
      ...rest,
      columnSelected: '',
    }));
  }, [filters, removeUsedFilters]);

  const handleSetFilter = () => handleAplyFilters();
  const handleFilterPlanets = useCallback(() => {
    if (filters.planet) {
      const { planet } = filters;
      const filteredData = rawData.filter((planetSearch) => {
        const planetName = planetSearch.name.toLowerCase();
        const textFilter = planet.toLowerCase();
        const hasPlanet = planetName.includes(textFilter);
        return hasPlanet ? planetSearch : false;
      });
      return filteredData;
    }
    return rawData;
  }, [filters, rawData]);

  const handleAplyFiltersApplied = useCallback(() => {
    let dataFiltered = handleFilterPlanets();
    filtersApplied.forEach((filter) => {
      const operatorFilter = filter.operator;
      const planetsFiltered = dataFiltered.filter((planet) => {
        if (operatorFilter === 'menor que') {
          return Number(planet[filter.column]) < Number(filter.numberReference);
        } if (operatorFilter === 'maior que') {
          return Number(planet[filter.column]) > Number(filter.numberReference);
        }
        return Number(planet[filter.column]) === Number(filter.numberReference);
      });
      dataFiltered = planetsFiltered;
    });
    setData(dataFiltered);
    setLoading(false);
  }, [filtersApplied, handleFilterPlanets]);

  const handleRequestDataApi = useCallback(async () => {
    setLoading(true);
    const response = await requestApi();
    const dataOrderByName = response.sort((a, b) => a.name.localeCompare(b.name));
    setData(dataOrderByName);
    setRawData(dataOrderByName);
    const keys = Object.keys(response[0]);
    const keysFiltersColumns = keys.filter(
      (key) => !EXCLUDE_FILTER.includes(key),
    );
    setFilters({
      ...filters,
      column: keysFiltersColumns,
      orderBy: keysFiltersColumns,
    });
    setKeysColumns(keys);
    setKeysFilter(keysFiltersColumns);
    setLoading(false);
  }, [filters]);

  const handleInsertValueInFilter = ({ name, value }) => setFilters(
    { ...filters, [name]: value },
  );

  useEffect(() => {
    if (!rawData.length) {
      handleRequestDataApi();
    }
  }, [handleRequestDataApi, rawData.length]);

  useEffect(() => {
    handleAplyFiltersApplied();
  }, [filtersApplied, handleAplyFiltersApplied]);

  const shared = {
    data,
    order,
    filters,
    rawData,
    loading,
    keysColumns,
    keysFilter,
    filtersApplied,
    handleValuesOrdanation,
    handleOrderDataByColumn,
    handleClearAllFilters,
    handleSetFilter,
    handleInsertValueInFilter,
    handleDeleteItemByIndex,
  };

  return (
    <StarWarsContext.Provider value={ { ...shared } }>
      {children}
    </StarWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StarWarsContext;
