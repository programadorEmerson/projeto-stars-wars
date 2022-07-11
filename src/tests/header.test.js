import { act } from "react-dom/test-utils";
import App from "../App";
import testData from "../../cypress/mocks/testData";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockFetch = () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData),
    })
  );
};

describe("Teste do componente Header", () => {
  beforeEach(() => {
    mockFetch();
  });

  afterEach(() => {
    cleanup();
  });

  it("Testa os filtros do Header", async () => {
    await act(async () => {
      render(<App />);
    });

    const clickFilter = () => {
      const buttonFilterEl = screen.getByTestId("button-filter");
      expect(buttonFilterEl).toBeInTheDocument();
      userEvent.click(buttonFilterEl);
    };

    const setComparissonFilter = (comparisson) => {
      const selectComparisonEqual = screen.getByTestId("comparison-filter");
      expect(selectComparisonEqual).toBeInTheDocument();
      userEvent.selectOptions(selectComparisonEqual, comparisson);
    };

    const setInputValueNumeric = (value) => {
      const inputValueEl = screen.getByTestId("value-filter");
      expect(inputValueEl).toBeInTheDocument();
      userEvent.type(inputValueEl, value);
    };
    // testa o input
    const inputEl = screen.getByTestId("name-filter");
    expect(inputEl).toBeInTheDocument();
    userEvent.type(inputEl, "tat");
    expect(inputEl.value).toBe("tat");

    // testa o select
    const selectEl = screen.getByTestId("column-filter");
    expect(selectEl).toBeInTheDocument();
    userEvent.selectOptions(selectEl, "population");

    setComparissonFilter("igual a");
    setInputValueNumeric("20000");
    clickFilter();

    // testa o column-sort
    const columnSortEl = screen.getByTestId("column-sort");
    expect(columnSortEl).toBeInTheDocument();
    userEvent.selectOptions(columnSortEl, "diameter");

    // clica no radio button column-sort-input-desc
    const columnSortInputDescEl = screen.getByTestId("column-sort-input-desc");
    expect(columnSortInputDescEl).toBeInTheDocument();
    userEvent.click(columnSortInputDescEl);

    // testa o botao column-sort-button
    const columnSortButtonE = screen.getByTestId("column-sort-button");
    expect(columnSortButtonE).toBeInTheDocument();
    userEvent.click(columnSortButtonE);

    // clica no radio button column-sort-input-asc
    const columnSortInputAscEl = screen.getByTestId("column-sort-input-asc");
    expect(columnSortInputAscEl).toBeInTheDocument();
    userEvent.click(columnSortInputAscEl);

    // testa o botao column-sort-button
    const columnSortButtonEl = screen.getByTestId("column-sort-button");
    expect(columnSortButtonEl).toBeInTheDocument();
    userEvent.click(columnSortButtonEl);

    // testa o botao excluir filtro incluido
    const buttonDeleteFilterIclude = screen.getByRole("button", { name: /x/i });
    expect(buttonDeleteFilterIclude).toBeInTheDocument();
    userEvent.click(buttonDeleteFilterIclude);

    // testa o botao button-remove-filters
    const buttonRemoveFiltersEl = screen.getByTestId("button-remove-filters");
    expect(buttonRemoveFiltersEl).toBeInTheDocument();
    userEvent.click(buttonRemoveFiltersEl);

    setComparissonFilter("maior que");
    setInputValueNumeric("20000");
    clickFilter();

    setComparissonFilter("menor que");
    setInputValueNumeric("20000");
    clickFilter();

    setInputValueNumeric("20000");
    clickFilter();

  }, 20000);
});
