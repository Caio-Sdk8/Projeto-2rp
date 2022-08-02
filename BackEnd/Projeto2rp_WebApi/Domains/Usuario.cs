using System;
using System.Collections.Generic;

namespace Projeto2rp_WebApi.Domains
{
    public partial class Usuario
    {
        public short IdUsuario { get; set; }

        [Required(ErrorMessage = "É necessário informar o tipo de usuario!")]
        public short IdTipoUsuario { get; set; }
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Senha { get; set; } = null!;
        [Required(ErrorMessage = "É necessário informar o status do usuario!")]
        public bool Status { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; };
    }
}
