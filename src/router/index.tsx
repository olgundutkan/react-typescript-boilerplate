

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemListPage from '@pages/item/index';
import ItemCreatePage from '@pages/item/create';
import ItemShowPage from '@pages/item/show';
import ItemEditPage from '@pages/item/update';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ItemListPage />} />
      <Route path="/create" element={<ItemCreatePage />} />
      <Route path="/:id" element={<ItemShowPage />} />
      <Route path="/:id/edit" element={<ItemEditPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;