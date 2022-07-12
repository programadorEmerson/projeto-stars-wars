import { styled, TableBody, Table as TableMaterial,
  TableContainer, TableHead, TableRow, TableCell, Paper,
  tableCellClasses,
  Box } from '@mui/material';
import React, { useEffect } from 'react';
import useStarWarsContext from '../hooks/useStarWarsContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Table() {
  const { data, keysColumns } = useStarWarsContext();

  useEffect(() => {
    console.log(keysColumns, keysColumns.length);
  }, [keysColumns]);

  return (
    <TableContainer component={ Paper }>
      <TableMaterial aria-label="customized table">
        <TableHead>
          <TableRow>
            {keysColumns.map((item) => (
              <StyledTableCell data-testid={ `header-${item}` } key={ item }>
                {item.toUpperCase()}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <StyledTableRow key={ item.name }>
                {keysColumns.map((key, index) => (
                  <StyledTableCell
                    key={ item[key] }
                    data-testid={ `planet-${keysColumns[index]}` }
                    component="th"
                    scope="row"
                  >
                    {item[key]}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <Box sx={ { height: '100%' } }>No data</Box>
          )}
        </TableBody>
      </TableMaterial>
    </TableContainer>
  );
}
export default Table;
