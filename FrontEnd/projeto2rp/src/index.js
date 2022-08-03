import React from 'react';
import ReactDOM from 'react-dom';
import {
    Route,
    BrowserRouter,
    Routes,
    Navigate
} from 'react-router-dom';

import './index.css';

import Login from '../src/Pages/Login/Login.jsx';
import ListarUsuarios from './Pages/ListarUsuarios/ListarUsuarios.jsx';
import CadastrarUsuarios from './Pages/Cadastrar Usuarios/CadastrarUsuarios.jsx';
import AtualizarUsuarios from './Pages/AtualizarUsuarios/AtualizarUsuario.jsx';
import reportWebVitals from './reportWebVitals';

const routing = (
<BrowserRouter >
    <div>
        <Routes >
            <Route exact path="/"
                element={< Login />}
            /> 
            <Route path="/ListarUsuarios"
                element={< ListarUsuarios />}
            /> 
            <Route path="/CadastrarUsuarios"
                element={< CadastrarUsuarios />}
            />
            <Route path="/AtualizarUsuarios"
                element={< AtualizarUsuarios />}
            />
            </Routes> 
    </div> 
</BrowserRouter>
            );

            ReactDOM.render(routing, document.getElementById('root'))

            // If you want to start measuring performance in your app, pass a function
            // to log results (for example: reportWebVitals(console.log))
            // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
            reportWebVitals();