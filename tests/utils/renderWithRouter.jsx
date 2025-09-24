import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

export function renderWithRouter(ui, { route = "/", routes } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {routes ? (
        <Routes>
          {routes.map(({ path, element, children, errorElement }) => (
            <Route
              key={path}
              path={path}
              element={element}
              errorElement={errorElement}
            >
              {children &&
                children.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
            </Route>
          ))}
        </Routes>
      ) : (
        ui
      )}
    </MemoryRouter>
  );
}
