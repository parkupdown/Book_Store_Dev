import LayOut from "./components/layout/Layout";
import Home from "./pages/Home";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { BookStoreThemeProvider } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayOut>
        <Home />
      </LayOut>
    ),
    errorElement: (
      <LayOut>
        <Error />
      </LayOut>
    ),
  },
  {
    path: "/books",
    element: (
      <LayOut>
        <div>도서목록</div>
      </LayOut>
    ),
  },
  {
    path: "signup",
    element: (
      <LayOut>
        <Signup />
      </LayOut>
    ),
  },
]);

function App() {
  return (
    <>
      <BookStoreThemeProvider>
        <ThemeSwitcher />
        <RouterProvider router={router}></RouterProvider>
      </BookStoreThemeProvider>
    </>
  );
}

export default App;
