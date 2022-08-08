import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import axios from 'axios';
import "./CadastrarUsuario.css"
import Header from "../../Components/Header/Header.jsx";
import { parseJwt, usuarioAutenticado } from '../../Services/auth'


export default class CadastrarUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            idTipoUsuario: 0,
            status: false,
            Usuario: '',
            isLoading: false,
            Role: 0,
            root: false,
            geral: false,
        };
    }

    CadastraUser = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios.post('http://localhost:5222/api/Usuarios', {
            idTipoUsuario: this.state.idTipoUsuario,
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            status: this.state.status
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            }
        })

            .then(resposta => {
                if (resposta.status != 201) {
                    this.setState({ erroMensagem: 'Algo deu errado, tente novamente', isLoading: false })
                    console.log(resposta)
                }else{
                    this.setState({ isLoading: false });
                }
            })
    };
    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    };

    DefinirTipo = () => {
        this.state.Usuario = parseJwt();
        this.state.Role = this.state.Usuario.role;
    }

    componentDidMount() {
        this.DefinirTipo();
        console.log(this.state.Role)
    }

    render() {
        return (

            <div>
                {
                    this.state.Role == 3 ? <p>401</p> :
                        <div>
                            <Header></Header>
                            <div className="fkmain">
                                <div className="secForm">
                                    <div className='item'>
                                        <p className='cds'>Cadastrar Usuários</p>
                                    </div>
                                    <form onSubmit={this.CadastraUser}>
                                        <div className="item">
                                            <input
                                                className="input__login"
                                                type="text"
                                                name="nome"
                                                value={this.state.nome}
                                                onChange={this.atualizaStateCampo}
                                                placeholder="Nome"
                                            />
                                        </div>
                                        <div className="item">
                                            <input
                                                className="input__login"
                                                type="text"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.atualizaStateCampo}
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="item">
                                            <input
                                                className="input__login"
                                                type="password"
                                                name="senha"
                                                value={this.state.senha}
                                                onChange={this.atualizaStateCampo}
                                                placeholder="Senha"
                                            />
                                        </div>
                                        <div className="item" id="align">
                                            <label for="idTipoUsuario">Tipo Usuário:</label>
                                            <select
                                                id="idTipoUsuario"
                                                name="idTipoUsuario"
                                                value={this.state.idTipoUsuario}
                                                onChange={this.atualizaStateCampo}
                                            >
                                                <option value="0" selected disabled>
                                                    Selecione o tipo do Usuário
                                                </option>

                                                <option key='1' value='1'>
                                                    Root
                                                </option>
                                                <option key='2' value='2'>
                                                    Admin
                                                </option>
                                                <option key='3' value='4'>
                                                    Geral
                                                </option>
                                            </select>
                                        </div>
                                        <div className="item" id="align">
                                            <label for="status">Status:</label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={this.state.status}
                                                onChange={this.atualizaStateCampo}
                                            >
                                                <option value="0" selected disabled>
                                                    Selecione o status
                                                </option>

                                                <option key='1' value='false'>
                                                    Inativo
                                                </option>
                                                <option key='2' value='true'>
                                                    Ativo
                                                </option>
                                            </select>
                                        </div>
                                        <div className="item">

                                            <p style={{ color: 'red' }} >{this.state.erroMensagem}</p>

                                            {
                                                this.state.isLoading === true &&
                                                <button type="submit" disabled className="btn btn__login" id="btn__login">
                                                    Loading...
                                                </button>
                                            }

                                            {
                                                this.state.isLoading === false &&
                                                <button
                                                    className="btn__login" id="btn__login"
                                                    type="submit">
                                                    Cadastrar
                                                </button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                }
            </div >
        )
    }
}
