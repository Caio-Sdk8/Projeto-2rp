using Projeto2rp_WebApi.Domains;

namespace Projeto2rp_WebApi.Interfaces
{
    public interface IUsuarioRepository
    {
        List<Usuario> Listar();

        public Usuario Login(string email, string senha);

        Usuario BuscarPorId(int idUsuario);

        void Cadastrar(Usuario novoUsuario);

        void Atualizar(int idUsuario, Usuario UsuarioAtualizado);

        void Deletar(int idUsuario);
    }
}
