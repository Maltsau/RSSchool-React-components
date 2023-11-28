import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import Layout from './components/pages/Layout';
import MainPage from './components/pages/MainPage';
import UncontrolledForm from './components/pages/UncontrolledForm';
import ReactHookForm from './components/pages/ReactHookForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/uncontroled-form" element={<UncontrolledForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
