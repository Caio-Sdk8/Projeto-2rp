import React from 'react';
import logo2rp from '../../Pages/Imagens/LogoEscura.svg';
import { Link } from "react-router-dom";
import './Header.css';
import { parseJwt, usuarioAutenticado } from '../../Services/auth'


export default function Header() {

    var role
    function botaodomenu() {
        var menu = document.getElementById("mn");
        if (menu.style.display === "flex") {
            //Esconda o menu
            menu.style.display = "none"
        } else {
            //Mostre o menu
            menu.style.display = "flex"
        }
    }
    function Sair(){
        localStorage. clear();
    }
    
    function DefinirTipo(){
        var Usuario = parseJwt();
        role = Usuario.role;
    }

    DefinirTipo();
    return (
        <div>
            <header>
                <div className="TamanhoHeader">
                    <div className='inputPart'>
                        <input className="input-header" id="menu-hamburguer" type="checkbox" />
                        <label className="input" htmlFor="menu-hamburguer" onClick={botaodomenu}>
                            <div className="menu">
                                <span className="hamburguer"></span>
                            </div>
                        </label>
                    </div>
                    <div className="LogoHeader">
                        <img src={logo2rp} alt="" srcSet="" />
                    </div>
                </div>
            </header>
            <section className='navg' id='mn'>
                <nav className='links'>
                    {role == 1 ?  <Link className='decn' to="/CadastrarUsuarios">
                        <p>Cadastrar Usuário</p>
                    </Link> : ''}
                    <Link className='decn' to="/AtualizarUsuarios">
                        <p>Atualizar Usuário</p>
                    </Link>
                    <Link className='decn' to="/ListarUsuarios">
                        <p>Listar Usuário</p>
                    </Link>
                    <Link className='decn' to="/"
                    onClick={Sair}>
                        <p>Sair</p>
                    </Link>
                </nav>
            </section>
        </div>
    );

}