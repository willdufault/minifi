import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from './pages/NotFound/NotFound.tsx'
import Home from './pages/Home/Home.tsx'
import ArticleRead from './pages/ArticleRead/ArticleRead.tsx'
import ArticleWrite from './pages/ArticleWrite/ArticleWrite.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='read' element={<ArticleRead />} />
        <Route path='write' element={<ArticleWrite />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
