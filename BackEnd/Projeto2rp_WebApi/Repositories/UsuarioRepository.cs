using Projeto2rp_WebApi.Contexts;
using Projeto2rp_WebApi.Domains;

using Projeto2rp_WebApi.Interfaces;
using Projeto2rp_WebApi.ViewModels;

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
                        string pwd = BCrypt.Net.BCrypt.HashPassword(senha).ToString();
                        usuario2.Senha = pwd;

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

        public void Atualizar(int idUsuario, UserViewModel UsuarioAtualizado)
        {
            Usuario usuarioBusc = BuscarPorId(idUsuario);

            if (UsuarioAtualizado.Nome != null)
            {
                usuarioBusc.Nome = UsuarioAtualizado.Nome;
            }
            if (UsuarioAtualizado.Senha != null)
            {
                usuarioBusc.Senha = BCrypt.Net.BCrypt.HashPassword(UsuarioAtualizado.Senha).ToString();
            }
            if (UsuarioAtualizado.Email != null)
            {
                usuarioBusc.Email = UsuarioAtualizado.Email;
            }
            if (UsuarioAtualizado.Nome != null)
            {
                usuarioBusc.Nome = UsuarioAtualizado.Nome;
            }
            if (UsuarioAtualizado.IdTipoUsuario != 0)
            {
                usuarioBusc.IdTipoUsuario = UsuarioAtualizado.IdTipoUsuario;
            }
            if(UsuarioAtualizado.Status == true || UsuarioAtualizado.Status == false)
            {
                usuarioBusc.Status = UsuarioAtualizado.Status;
            }

            ctx.Usuarios.Update(usuarioBusc);

            ctx.SaveChanges();
        }

        public Usuario BuscarPorId(int idUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(ab => ab.IdUsuario == idUsuario);
        }

        public void Cadastrar(UserViewModel novoUsuario)
        {
            Usuario u = new Usuario();
            u.Nome = novoUsuario.Nome;
            u.Email = novoUsuario.Email;
            u.Senha = novoUsuario.Senha;
            u.Status = novoUsuario.Status;
            u.IdTipoUsuario = novoUsuario.IdTipoUsuario;

            ctx.Usuarios.Add(u);

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
            return ctx.Usuarios.Select(x => new Usuario
            {
                IdUsuario = x.IdUsuario,
                IdTipoUsuarioNavigation = new TipoUsuario
                {
                    TipoUsuario1 = x.IdTipoUsuarioNavigation.TipoUsuario1
                },
                Nome = x.Nome,
                Email = x.Email,
                Status = x.Status
            }).ToList();
        }
    }
}
