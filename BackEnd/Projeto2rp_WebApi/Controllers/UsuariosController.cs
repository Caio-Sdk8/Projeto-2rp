using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Projeto2rp_WebApi.Domains;
using Projeto2rp_WebApi.Interfaces;
using Projeto2rp_WebApi.Repositories;
using Projeto2rp_WebApi.ViewModels;

namespace Projeto2rp_WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository _UsuarioRepository { get; set; }

        public UsuariosController()
        {
            _UsuarioRepository = new UsuarioRepository();
        }

        [Authorize(Roles = "1,2")]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_UsuarioRepository.Listar());
        }

        [Authorize(Roles = "1,2,4")]
        [HttpGet("{idUsuario}")]
        public IActionResult BuscarPorId(int idUsuario)
        {
            return Ok(_UsuarioRepository.BuscarPorId(idUsuario));
        }

        [Authorize(Roles = "1,2")]
        [HttpPost]
        public IActionResult Cadastrar(UserViewModel novoUsuario)
        {
            _UsuarioRepository.Cadastrar(novoUsuario);

            return StatusCode(201);
        }

        [Authorize(Roles = "1,2,4")]
        [HttpPut("{idUsuario}")]
        public IActionResult Atualizar(int idUsuario, UserViewModel UsuarioAtualizada)
        {
            _UsuarioRepository.Atualizar(idUsuario, UsuarioAtualizada);

            return StatusCode(204);
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{idUsuario}")]
        public IActionResult Deletar(int idUsuario)
        {
            _UsuarioRepository.Deletar(idUsuario);

            return StatusCode(204);
        }
    }
}