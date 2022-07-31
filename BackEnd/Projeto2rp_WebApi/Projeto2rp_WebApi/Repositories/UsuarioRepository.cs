using Projeto2rp_WebApi.Contexts;
using Projeto2rp_WebApi.Domains;

using Projeto2rp_WebApi.Interfaces;

namespace Projeto2rp_WebApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        Proj2rp_Context ctx = new Proj2rp_Context();

        public Usuario Login(string email, string senha)
        {
            {
                var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);
                var usuario2 = ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);


                if (usuario2 != null)
                {
                    if (usuario2.Senha.Length != 60)
                    {
                        usuario2.Senha = BCrypt.Net.BCrypt.HashPassword(senha);

                        ctx.Usuarios.Update(usuario2);

                        ctx.SaveChanges();

                        return usuario2;
                    }
                }

                if (usuario != null)
                {
                    bool comparado = BCrypt.Net.BCrypt.Verify(senha, usuario.Senha);
                    if (comparado)
                    {
                        return usuario;
                    }
                }
                return null;
            }
        }

        public void Atualizar(int idUsuario, Usuario UsuarioAtualizado)
        {
            Usuario usuarioBusc = BuscarPorId(idUsuario);

            if (UsuarioAtualizado.Nome != null)
            {
                usuarioBusc.Nome = UsuarioAtualizado.Nome;
            }
            if (UsuarioAtualizado.Senha != null)
            {
                usuarioBusc.Senha = UsuarioAtualizado.Senha;
            }
            if (UsuarioAtualizado.Email != null)
            {
                usuarioBusc.Email = UsuarioAtualizado.Email;
            }
            if (UsuarioAtualizado.Nome != null)
            {
                usuarioBusc.Nome = UsuarioAtualizado.Nome;
            }
            usuarioBusc.Status = UsuarioAtualizado.Status;
            usuarioBusc.IdTipoUsuario = UsuarioAtualizado.IdTipoUsuario;

            ctx.Usuarios.Update(usuarioBusc);

            ctx.SaveChanges();
        }

        public Usuario BuscarPorId(int idUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(ab => ab.IdUsuario == idUsuario);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public void Deletar(int idUsuario)
        {
            Usuario userBuscado = BuscarPorId(idUsuario);

            ctx.Usuarios.Remove(userBuscado);

            ctx.SaveChanges();
        }

        public List<Usuario> Listar()
        {
            return ctx.Usuarios.ToList();
        }
    }
}
