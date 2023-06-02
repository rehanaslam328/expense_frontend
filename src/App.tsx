/** @format */

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { ErrorBoundary } from "react-error-boundary";
import { store, persistor } from "./store/store";
import { AppRoute } from "./Router";

const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => null}>
          <AppRoute />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
