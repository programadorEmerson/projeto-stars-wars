import React, { useEffect } from 'react';
import useStarWarsContext from '../hooks/useStarWarsContext';

function Table() {
  const { data, keysColumns } = useStarWarsContext();

  useEffect(() => {
    console.log(keysColumns, keysColumns.length);
  }, [keysColumns]);

  return (
    <table>
      <thead>
        <tr>
          {keysColumns.map((item) => (
            <th data-testid={ `header-${item}` } key={ item }>
              {item.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr data-testid={ `planet-${item.name}` } key={ item.name }>
              {keysColumns.map((key, index) => (
                <td
                  key={ item[key] }
                  data-testid={ `planet-${keysColumns[index]}` }
                >
                  <span>{item[key]}</span>
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <span>No data</span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
export default Table;
