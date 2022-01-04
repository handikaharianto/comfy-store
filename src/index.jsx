import React from 'react'
import ReactDOM from 'react-dom'
import './scss/style.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { ProductProvider } from './context/ProductContext'
import { SidebarProvider } from './context/SidebarContext'
import { ProductFilterProvider } from './context/ProductFilter'

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <ShoppingCartProvider>
        <SidebarProvider>
          <ProductFilterProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProductFilterProvider>
        </SidebarProvider>
      </ShoppingCartProvider>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
