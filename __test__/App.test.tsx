import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { App } from "../src/App";

// @ts-ignore
test("App Render", () => {
  const { baseElement } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(baseElement).toBeTruthy();
});
