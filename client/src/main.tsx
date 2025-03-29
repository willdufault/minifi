import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import NotFound from './components/NotFound/NotFound.tsx'
import Home from './components/Home/Home.tsx'
import ArticleRead from './components/ArticleRead/ArticleRead.tsx'
import ArticleWrite from './components/ArticleWrite/ArticleWrite.tsx'

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
