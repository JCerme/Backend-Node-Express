import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { HomePage } from '../components/HomePage'
import { Product } from '../components/Product/Product'
import { Cart } from '../components/Cart/Cart'
import { Account } from '../components/Account/Account'
import { Login } from '../components/Login/Login'
import { Logout } from '../components/Login/Logout'
import { LoginProvider } from '../contexts/LoginContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Register } from '../components/Login/Register'
import { Checkout } from '../components/Checkout/Checkout'

export const MainRouter = () => {
    return (
        <BrowserRouter>
            <LoginProvider>
                <Routes>
                    <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
                    <Route path="/products" element={<PrivateRoute><HomePage/></PrivateRoute>}/>
                    <Route path="/product/:id" element={<PrivateRoute><Product/></PrivateRoute>}/>
                    <Route path="/cart" element={<PrivateRoute><Cart/></PrivateRoute>}/>
                    <Route path="/account" element={<PrivateRoute><Account/></PrivateRoute>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>}/>
                    <Route path="*">"404 Not Found"</Route>
                </Routes>
            </LoginProvider>
            <ToastContainer 
                position="top-center"
                autoClose={10000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                progress={undefined}
                theme="light"
            />
        </BrowserRouter>
    )
}