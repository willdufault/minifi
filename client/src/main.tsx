import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from './components/NotFound/NotFound.tsx'
import Home from './components/Home/Home.tsx'
import ArticlePage from './components/ArticlePage/ArticlePage.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='article' element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
