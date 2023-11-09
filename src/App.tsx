import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import PageLayout from './components/PageLayout';
import CharacterWindow from './components/CharacterWindow';
import PageNotFound from './components/PageNotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PageLayout />} />
        <Route path="page=:page_number" element={<PageLayout />}>
          <Route path="details=:id" element={<CharacterWindow />}></Route>R
        </Route>
        <Route
          path="search=:search_pattern/page=:page_number"
          element={<PageLayout />}
        >
          <Route path="details=:id" element={<CharacterWindow />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
