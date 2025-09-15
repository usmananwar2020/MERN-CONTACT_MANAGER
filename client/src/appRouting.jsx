import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import OnBoarding from './pages/onBoarding';
import AuthGuard from './shared/guards/authGuard';
import ShellContainer from './components/container/shellContainer';
import Contacts from './pages/contacts';
import AddUpdateContact from './pages/contacts/addUpdateContact';
import Category from './pages/category';
import AddUpdateCategory from './pages/category/addUpdateCategory';
import Favourite from './pages/favourite';

const routes = [
  { path: "/", element: <OnBoarding />, protectedPath: false },
  {
    path: "/",
    element: <ShellContainer />,
    protectedPath: true,
    children: [
      { path: "contacts", element: <Contacts /> },
      { path: "contacts/addupdate", element: <AddUpdateContact /> },
      { path: "contacts/addupdate/:id", element: <AddUpdateContact /> },
      { path: "categories", element: <Category /> },
      { path: "categories/addupdate", element: <AddUpdateCategory /> },
      { path: "categories/addupdate/:id", element: <AddUpdateCategory /> },
      { path: "favourite", element: <Favourite /> },
    ],
  },
];

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element, protectedPath, children }) => (
          <Route
            key={path}
            path={path}
            element={<AuthGuard protectedPath={protectedPath}>{element}</AuthGuard>}
          >
            {children?.map(({ path: childPath, element: childElement }) => (
              <Route
                key={childPath}
                path={childPath}
                element={<AuthGuard protectedPath={protectedPath}>{childElement}</AuthGuard>}
              />
            ))}
          </Route>
        ))}
        <Route path="*" element={<p className="text-primary-dark text-5xl">Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;