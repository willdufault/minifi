import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import NotFound from './components/NotFound/NotFound.tsx'
import ArticleEdit from './pages/ArticleEdit/ArticleEdit.tsx'
import ArticleRead from './pages/ArticleRead/ArticleRead.tsx'
import ArticleSearch from './pages/ArticleSearch/ArticleSearch.tsx'
import ArticleWrite from './pages/ArticleWrite/ArticleWrite.tsx'
import Home from './pages/Home/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="read" element={<ArticleRead />} />
        <Route path="write" element={<ArticleWrite />} />
        <Route path="edit" element={<ArticleEdit />} />
        <Route path="search" element={<ArticleSearch />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
