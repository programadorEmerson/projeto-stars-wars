import { Clear, FilterList, ListTwoTone } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import useStarWarsContext from '../hooks/useStarWarsContext';
import logo from '../assets/starwars.png';

const Header = () => {
  const {
    order,
    filters,
    filtersApplied,
    // handleSetFilter,
    // handleClearAllFilters,
    handleValuesOrdanation,
    handleOrderDataByColumn,
    handleDeleteItemByIndex,
    handleInsertValueInFilter,
  } = useStarWarsContext();

  const validationSchema = Yup.object({
    columnSelected: Yup.string().required('Informe uma coluna'),
    operatorSelected: Yup.string().required('Informe um operador'),
    numberReference: Yup.string()
      .min(0, 'Informe um número maior ou igual a 0')
      .required('Informe um número válido'),
    planet: Yup.string(),
  });

  const initialValues = {
    columnSelected: '',
    operatorSelected: '',
    numberReference: '',
    planet: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: (data) => {
      console.log(data);
      const keysFormik = Object.keys(data);

      keysFormik.forEach((key) => {
        handleInsertValueInFilter({ name: key, value: data[key] });
      });
    },
  });

  return (
    <form onSubmit={ formik.handleSubmit } onBlur={ formik.handleBlur }>
      <Stack
        spacing={ 1 }
        direction="row"
        sx={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.5rem',
        } }
      >
        <TextField
          type="text"
          name="planet"
          data-testid="name-filter"
          value={ formik.values.planet }
          onChange={ formik.handleChange }
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          error={ formik.touched.planet && Boolean(formik.errors.planet) }
          helperText={ formik.touched.planet && formik.errors.planet }
        />
        <Autocomplete
          data-testid="column-filter"
          name="columnSelected"
          value={ formik.values.columnSelected }
          disablePortal
          id="column"
          options={ filters.column.map((key) => key) }
          sx={ { width: 300 } }
          size="small"
          renderInput={ (params) => (
            <TextField
              { ...params }
              label="Column"
              name="columnSelected"
              error={
                formik.touched.columnSelected
                && Boolean(formik.errors.columnSelected)
              }
              helperText={
                formik.touched.columnSelected && formik.errors.columnSelected
              }
            />
          ) }
          onInputChange={ (_, value, reason) => {
            if (reason === 'clear') {
              // handleInsertValueInFilter({
              //   name: 'columnSelected',
              //   value: filters.column[0],
              // });
              formik.setFieldValue('columnSelected', '');
            }
            if (reason === 'reset') {
              // handleInsertValueInFilter({ name: 'columnSelected', value });
              formik.setFieldValue('columnSelected', value);
            }
          } }
        />
        <Autocomplete
          data-testid="comparison-filter"
          name="operatorSelected"
          value={ formik.values.operatorSelected }
          disablePortal
          id="column"
          options={ filters.operators.map((key) => key) }
          sx={ { width: 200 } }
          size="small"
          renderInput={ (params) => (
            <TextField
              { ...params }
              label="Operator"
              error={
                formik.touched.operatorSelected
                && Boolean(formik.errors.operatorSelected)
              }
              helperText={
                formik.touched.operatorSelected
                && formik.errors.operatorSelected
              }
            />
          ) }
          onInputChange={ (_, value, reason) => {
            if (reason === 'clear') {
              // handleInsertValueInFilter({
              //   name: 'operatorSelected',
              //   value: 'maior que',
              // });
              formik.setFieldValue('operatorSelected', '');
            }
            if (reason === 'reset') {
              // handleInsertValueInFilter({ name: 'operatorSelected', value });
              formik.setFieldValue('operatorSelected', value);
            }
          } }
        />
        <TextField
          type="number"
          name="numberReference"
          data-testid="value-filter"
          value={ formik.values.numberReference }
          onChange={ formik.handleChange }
          id="outlined-basic"
          label="Value"
          variant="outlined"
          size="small"
          error={
            formik.touched.numberReference
            && Boolean(formik.errors.numberReference)
          }
          helperText={
            formik.touched.numberReference && formik.errors.numberReference
          }
        />
        <Button
          data-testid="button-filter"
          variant="contained"
          type="submit"
          endIcon={ <FilterList /> }
        >
          Filtrar
        </Button>

        <Button
          variant="contained"
          data-testid="button-remove-filters"
          type="button"
          // onClick={ handleClearAllFilters }
          sx={ { margin: '0 0.3rem' } }
          endIcon={ <Clear /> }
        >
          Limpar
        </Button>
      </Stack>
      <Divider />
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
        margin="0.5rem"
      >
        <img
          src={ logo }
          alt="Star Wars"
          width={ 100 }
          style={ { marginRight: '1rem' } }
        />
        <RadioGroup
          aria-labelledby="radio-buttons-group-ordenation"
          defaultValue="sort"
          name="radio-buttons-group"
        >
          <Box
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Autocomplete
              data-testid="column-sort"
              name="column"
              value={ order.column }
              disablePortal
              id="column"
              options={ filters.orderBy.map((key) => key) }
              sx={ { width: 300 } }
              size="small"
              renderInput={ (params) => <TextField { ...params } label="Column" /> }
              onInputChange={ (_, value, reason) => {
                if (reason === 'clear') {
                  handleValuesOrdanation({
                    name: 'column',
                    value: filters.orderBy[0],
                  });
                }
                if (reason === 'reset') {
                  handleValuesOrdanation({ name: 'column', value });
                }
              } }
            />
            <FormControlLabel
              data-testid="column-sort-input-asc"
              type="radio"
              name="sort"
              value="asc"
              checked={ order.sort === 'ASC' }
              control={ <Radio /> }
              label="ASC"
              sx={ { marginLeft: '0.5rem' } }
              onChange={ () => handleValuesOrdanation({
                name: 'sort',
                value: 'ASC',
              }) }
            />
            <FormControlLabel
              data-testid="column-sort-input-desc"
              type="radio"
              name="sort"
              value="desc"
              checked={ order.sort === 'DESC' }
              control={ <Radio /> }
              label="DESC"
              onChange={ () => handleValuesOrdanation({
                name: 'sort',
                value: 'DESC',
              }) }
            />
          </Box>
        </RadioGroup>
        <Button
          variant="contained"
          data-testid="column-sort-button"
          type="button"
          onClick={ handleOrderDataByColumn }
          endIcon={ <ListTwoTone /> }
        >
          Ordenar
        </Button>
      </Box>
      <Divider />
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        {filtersApplied.map((filter, index) => (
          <Chip
            key={ filter.column }
            label={ `${filter.column} | ${filter.operator} | ${filter.numberReference}` }
            onDelete={ () => handleDeleteItemByIndex(index) }
            type="button"
            color="primary"
            onClick={ () => handleDeleteItemByIndex(index) }
            sx={ { display: 'flex', maxWidth: '35rem', margin: '0 0.3rem' } }
          />
        ))}
      </Box>
    </form>
  );
};

export default Header;
