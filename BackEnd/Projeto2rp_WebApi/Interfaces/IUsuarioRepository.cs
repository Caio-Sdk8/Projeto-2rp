using Projeto2rp_WebApi.Domains;
using Projeto2rp_WebApi.ViewModels;

namespace Projeto2rp_WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuario> Listar();

        public Usuario Login(string email, string senha);

        Usuario BuscarPorId(int idUsuario);

        void Cadastrar(UserViewModel novoUsuario);

        void Atualizar(int idUsuario, UserViewModel UsuarioAtualizado);

        void Deletar(int idUsuario);
    }
}
