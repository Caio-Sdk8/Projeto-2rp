import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import axios from 'axios';
import "./AtualizarUsuario.css"
import Header from "../../Components/Header/Header.jsx";
import { parseJwt, usuarioAutenticado } from '../../Services/auth'


export default class AtualizarUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaUsuarios: [],
            userBnc: null,
            idUsuario: null,
            nome: null,
            email: null,
            email: null,
            idTipoUsuario: null,
            status: null,
            Usuario: null,
            isLoading: false,
            Role: 0,
            root: false,
            geral: false,
        };
    }

    AtualizaUser = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });
        axios.put('http://localhost:5222/api/Usuarios/' + this.state.Usuario.id, {
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
                if (resposta.status != 204) {
                    this.setState({ erroMensagem: 'Algo deu errado, tente novamente', isLoading: false })
                    console.log(resposta)
                } else {
                    this.setState({ isLoading: false });
                }
            })
    };
    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    };

    ListarUsers = () => {
        this.state.Usuario = parseJwt();
        this.state.Role = this.state.Usuario.role;
        var role = this.state.Role;
        if (role != 4) {
            this.state.root = true;
            fetch('http://localhost:5222/api/Usuarios', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
                .then((resposta) => resposta.json())
                .then((dados) => this.setState({ listaUsuarios: dados }))
                .catch((erro) => console.log(erro));
            console.log(this.state.listaUsuarios)
        } else {
            fetch('http://localhost:5222/api/Usuarios/' + this.state.Usuario.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
                },
            })
                .then((resposta) => resposta.json())
                .then((dados) => this.setState({ Usuario2: dados }))
                .catch((erro) => console.log(erro));
        };
    }

    componentDidMount() {
        this.ListarUsers();
    }

    render() {
        return (

            <div>
                <div>
                    <Header></Header>
                    <div className="fkmain">
                        <div className="secForm">
                            <div className='item'>
                                <div className='Texto'>
                                    <p1>Atualizar Usuários</p1>
                                    <p>Não se esqueça de selecionar o usuário e seu status</p>
                                </div>
                            </div>
                            <form onSubmit={this.AtualizaUser}>
                                <div className="item">
                                    <input
                                        className="input__login"
                                        type="text"
                                        name="nome"
                                        value={this.state.nome}
                                        onChange={this.atualizaStateCampo}
                                        placeholder={this.state.nome == null ? "Nome" : this.s}
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
                                    <label for="idTipoUsuario">Tipo Usuário</label>
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
                                    <label for="status">Status</label>
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
                                {this.state.root ?
                                    <div className='item' id="align">
                                        <label for="idUsuario" className="TTcampo">Usuário</label>
                                        <select
                                            id="idUsuario"
                                            name="idUsuario"
                                            value={this.state.idUsuario}
                                            onChange={this.atualizaStateCampo

                                            }
                                        >
                                            <option value="0" selected disabled>
                                                Selecione o Usuário
                                            </option>

                                            {this.state.listaUsuarios.map((user) => {
                                                return (
                                                    <option key={user.idUsuario} value={user.idUsuario}>
                                                        {user.nome}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div> : 
                                    ''}
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
                                            Atualizar
                                        </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
