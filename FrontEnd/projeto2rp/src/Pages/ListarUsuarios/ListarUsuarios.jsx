import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import lixo from '../Imagens/icons8-lixo.svg'
import "../ListarUsuarios/ListarUsuario.css"
import Header from "../../Components/Header/Header.jsx";
import { parseJwt } from '../../Services/auth'


export default class ListarUsuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaUsuarios: [],
            geral: '',
            nome: '',
            email: '',
            idTipoUsuario: 0,
            status: false,
            Usuario: '',
            Usuario2: '',
            Role: 0,
            root: false,
            geral: false,
        };
    }

    ListarUsers = () => {
        this.state.Usuario = parseJwt();
        this.state.Role = this.state.Usuario.role;
        var role = this.state.Role;
        console.log(this.state.Usuario)
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
            console.log(this.state.Usuario2)
        };
    }

    DeletarUsuario = (Usuario) => {
        fetch('http://localhost:5222/api/Usuarios/' + Usuario.idUsuario, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                if (resposta.status === 204) {
                    console.log(
                        'O usuario' + Usuario.nome + ' foi excluído!');
                    this.ListarUsers()
                }
            })
    }

    componentDidMount() {
        this.ListarUsers();
    }


    render() {
        return (
            <div>
                <Header></Header>
                <section className='fkmain'>
                    <div className='item'>
                        <p className='cds'>Listar Usuários</p>
                    </div>
                    <table className='tabela'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Tipo</th>
                                <th>Status</th>
                                {this.state.root ? <th>Excluir</th> : ''}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Role == 4 ?

                                <tr key={this.state.Usuario2.idUsuario}>
                                    <td>{this.state.Usuario2.nome}</td>
                                    <td>{this.state.Usuario2.email}</td>
                                    <td>Geral</td>
                                    <td>{this.state.Usuario2.status ? "Ativo" : "Inativo"}</td>
                                </tr>
                                : this.state.listaUsuarios.map((Usuario) => {
                                    return (
                                        <tr key={Usuario.idUsuario}>
                                            <td>{Usuario.nome}</td>
                                            <td>{Usuario.email}</td>
                                            <td>{Usuario.idTipoUsuarioNavigation.tipoUsuario1}</td>
                                            <td>{Usuario.status ? "Ativo" : "Inativo"}</td>

                                            {this.state.root ?
                                                <td>
                                                    <button id='btnExc'
                                                        onClick={() => this.DeletarUsuario(Usuario)}
                                                    >
                                                        <img src={lixo} alt="" srcset="" />
                                                    </button>
                                                </td>
                                                : ''}

                                        </tr>
                                    );
                                })}

                        </tbody>
                    </table>
                </section>
            </div >
        )
    }
}
