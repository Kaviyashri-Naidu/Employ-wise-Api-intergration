import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Edit from './components/Edit'
import Userlist from './components/UserList'
import Delete from './components/Delete'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/user" element={<Userlist />} />
      <Route path="/delete" element={<Delete />} />
    </Routes>
    </>
  )
}

export default App