import { act } from "react-dom/test-utils";
import App from "../App";
import testData from "../../cypress/mocks/testData";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

const mockFetch = () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData),
    })
  );
};

describe("Teste do componente Tabela", () => {
  beforeEach(() => {
    mockFetch();
  });

  afterEach(() => {
    cleanup();
  });

  it("Testa se a requisição inicial é feita 1 vez e o header é renderizado", async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId("header-name")).toBeInTheDocument();
    });

  }, 20000);

});
