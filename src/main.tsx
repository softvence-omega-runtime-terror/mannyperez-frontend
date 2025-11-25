// main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import './index.css';
import routes from "./routes";
import { persistor, store } from "./store";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <RouterProvider router={routes} />
       
         <Toaster
           position="top-right"
           theme="light"
           richColors
           closeButton
           duration={3000}
           toastOptions={{
             classNames: {
               toast:
                 "rounded-2xl border-2 border-white bg-[var(--background-secondary)] text-[var(--foreground)] shadow-xl",
               title: "font-semibold ",
               description: "text-muted-foreground text-base",
               actionButton:
                 "bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg px-3 py-1 hover:bg-[var(--primary-hover)]",
               cancelButton:
                 "bg-transparent text-[var(--foreground)] border border-[var(--border)] rounded-lg px-3 py-1 hover:bg-[var(--secondary-hover)]",
               icon: "text-[var(--accent)]",
               success:
                 "!border-l-4 !border-green-500 !bg-green-50 !text-green-700",
               error:
                 "!border-l-4 !border-red-500 !bg-red-50 !text-red-700",
               warning:
                 "!border-l-4 !border-amber-500 !bg-amber-50 !text-amber-700",
               info:
                 "!border-l-4 !border-blue-500 !bg-blue-50 !text-blue-700",
             },
           }}
         />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
