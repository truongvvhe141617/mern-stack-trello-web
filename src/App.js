import React from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'

// custom components
import AppBar from 'components/AppBar/AppBar'
import BoardBar from 'components/BoardBar/BoardBar'
import BoardContent from 'components/BoardContent/BoardContent'
import Auth from 'components/Auth/Auth'
function App() {
  return (
    <Routes>
      <Route path='/' element={
            <div className="trello-trungquandev-master">
            <AppBar />
            <BoardBar />
            <BoardContent />
          </div>
      }/>
        <Route path='/signUp' element={
            <Auth/>
      }/>
        <Route path='/signIn' element={
            <Auth/>
      }/>
        <Route path='*' element={
            <div className="not-found">
              <h3>404 Not found</h3>
             </div>
      }/>
    </Routes>

  )
}

export default App
