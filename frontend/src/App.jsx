import React from 'react'
import { Routes,Route } from 'react-router-dom'
import HomeBooks from './pages/HomeBooks'
import CreateBooks from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBooks from './pages/EditBooks'
import DeleteBooks from './pages/DeleteBooks'

const App = () => {
  return (
    <Routes>
     
     <Route path='/' element= {<HomeBooks />}  />
     <Route path='/books/create'  element={<CreateBooks />} />
     <Route path='/books/details/:id'  element={<ShowBook />} />
     <Route path='/books/edit/:id'  element={<EditBooks />} />
     <Route path='/books/delete/:id'  element={<DeleteBooks />} />
      
    </Routes>
  )
}

export default App
