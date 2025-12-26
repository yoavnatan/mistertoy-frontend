
import './assets/style/main.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { useEffect, useState } from 'react'
import { loadToys } from './store/actions/toy.actions.js'
import { AboutUs } from './cmps/AboutUs.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { authService } from './services/auth.service.js'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { ReviewExplore } from './pages/ReviewExplore.jsx'

export default function App() {

  useEffect(() => {
    loadToys()
  })

  return (

    <Provider store={store}>
      <Router>
        <section className=" main-layout">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<ToyIndex />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<LoginSignup />} path="/auth" />
              <Route element={<UserDetails />} path="/user/:userId" />
              <Route element={<ReviewExplore />} path="/review" />
            </Routes>
          </main>
        </section>
      </Router>
      <UserMsg />
    </Provider>

  )
}

