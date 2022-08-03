import { Component } from 'react';
import axios from 'axios';
import logo2rp from '../Imagens/LogoEscura.svg'
import '../Login/Login.css'
import { parseJwt} from '../../Services/auth';
import { Link, Navigate } from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            erroMensagem: '',
            isLoading: false
        };
    };

    efetuaLogin = (event) => {
        event.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios.post('http://localhost:5222/api/Login', {
            email: this.state.email,
            senha: this.state.senha,
        })

            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-login', resposta.data.token);
                    this.setState({ isLoading: false });
                    this.props.history.push('/ListarUsuarios');
                }
            })
            .catch(() => {
                this.setState({ erroMensagem: 'E-mail e/ou senha inválidos!', isLoading: false })
            })
    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value })
    };

    render() {
        return (
            <div className='all'>
                    <section className="container-login">
                            <div className="row">
                                <div className="item">
                                    <img src={logo2rp} alt="" srcset="" />
                                </div>
                                <div className="item" id="item__title">
                                    <p className="text__login" id="item__description">
                                        Bem-vindo! Faça login para acessar sua conta.
                                    </p>
                                </div>
                                <form onSubmit={this.efetuaLogin}>
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
                                    <div className="item">

                                        <p style={{ color : 'red' }} >{this.state.erroMensagem}</p>

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
                                                type="submit"
                                                disabled={ this.state.email === '' || this.state.senha === '' ? 'none' : '' }>
                                                Login
                                            </button>
                                        }
                                    </div>
                                </form>
                            </div>
                    </section>
            </div>
        )
    }
};