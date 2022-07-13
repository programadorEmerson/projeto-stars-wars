import React from 'react';
import useStarWarsContext from '../hooks/useStarWarsContext';

const Header = () => {
  const {
    order,
    filters,
    filtersApplied,
    handleSetFilter,
    handleClearAllFilters,
    handleValuesOrdanation,
    handleOrderDataByColumn,
    handleDeleteItemByIndex,
    handleInsertValueInFilter,
  } = useStarWarsContext();

  return (
    <header>
      <div>
        <input
          type="text"
          name="planet"
          data-testid="name-filter"
          value={ filters.planet }
          onChange={ (e) => handleInsertValueInFilter(e.target) }
          placeholder="Search"
        />
        <div>
          <select
            data-testid="column-filter"
            name="columnSelected"
            value={ filters.columnSelected }
            onChange={ (e) => handleInsertValueInFilter(e.target) }
          >
            {filters.column.map((key) => (
              <option id="columnSelected" key={ key } value={ key }>
                {key}
              </option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            name="operatorSelected"
            value={ filters.operatorSelected }
            onChange={ (e) => handleInsertValueInFilter(e.target) }
          >
            {filters.operators.map((key) => (
              <option id="operatorSelected" key={ key } value={ key }>
                {key}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="numberReference"
            data-testid="value-filter"
            value={ filters.numberReference }
            onChange={ (e) => handleInsertValueInFilter(e.target) }
            placeholder="Value"
          />
          <button
            data-testid="button-filter"
            type="button"
            onClick={ handleSetFilter }
          >
            Filtrar
          </button>
        </div>
        <div>
          {filtersApplied.map((filter, index) => (
            <div data-testid="filter" key={ index }>
              <span>{filter.column}</span>
              <span>{filter.numberReference}</span>
              <button
                type="button"
                onClick={ () => handleDeleteItemByIndex(index) }
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleClearAllFilters }
        >
          Limpar Filtros
        </button>
      </div>
      <div>
        <select
          data-testid="column-sort"
          name="column"
          value={ order.column }
          onChange={ (e) => handleValuesOrdanation(e.target) }
        >
          {filters.orderBy.map((key) => (
            <option id="column" key={ key } value={ key }>
              {key}
            </option>
          ))}
        </select>
        <div>
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sort"
            value="desc"
            checked={ order.sort === 'DESC' }
            onChange={ () => handleValuesOrdanation({
              name: 'sort',
              value: 'DESC',
            }) }
          />
          {' '}
          Desc
          <br />
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="sort"
            value="asc"
            checked={ order.sort === 'ASC' }
            onChange={ () => handleValuesOrdanation({
              name: 'sort',
              value: 'ASC',
            }) }
          />
          {' '}
          Asc
          <br />
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ handleOrderDataByColumn }
          >
            Ordenar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
