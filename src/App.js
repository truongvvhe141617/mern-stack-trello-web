import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';

// custom components
import AppBar from 'components/AppBar/AppBar';
import BoardBar from 'components/BoardBar/BoardBar';
import BoardContent from 'components/BoardContent/BoardContent';
import Auth from 'components/Auth/Auth';
import AccountVerification from 'components/Auth/AccountVerification/AccountVerification';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className="trello-trungquandev-master">
            <AppBar />
            <BoardBar />
            <BoardContent />
          </div>
        }
      />

      <Route path='/signIn' element={<Auth />} />
      <Route path='/signUp' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      <Route
        path="*"
        element={
          <div className="not-found">
            <h3>404 not found</h3>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
