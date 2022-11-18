import React from 'react'
import Header from '../components/header/Header'
import SideBar from '../components/sideBar/SideBar'
import '../assets/scss/Layout/Layout.scss'

const Layout = ({ children }) => (
  <div>
    <Header />
    <div className="layout-mainDiv">
      <SideBar />
      <main className="children-Div">{children}</main>
    </div>
  </div>
)

export default Layout
