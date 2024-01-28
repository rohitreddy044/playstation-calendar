import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import MonthlyCalendar from "./components/MonthlyCalendar";

import "./App.css";

const App = () => {
  const today = new Date();
  const defaultPath = `/${today.getFullYear()}/${today.getMonth() + 1}`;

  const appRouter = createBrowserRouter([
    {
      path: "/:year/:month",
      loader: ({ params }) => {
        const { year, month } = params;
        if (isNaN(month) || isNaN(year)) {
          return redirect(defaultPath);
        } else if (month < 1 || month > 12) {
          return redirect(defaultPath);
        }
        return params;
      },
      element: <MonthlyCalendar />,
    },
    {
      path: "*",
      element: <></>,
      loader: () => {
        return redirect(defaultPath);
      },
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default App;
