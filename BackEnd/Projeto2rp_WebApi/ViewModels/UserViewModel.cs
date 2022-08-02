using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projeto2rp_WebApi.ViewModels
{
    public class UserViewModel
    {
        //essa classe só foi criada para suprir um erro e pretendo substituir até a entrega, mas se você está lendo isso eu não corrigi o erro por focar em outras coisas

        [Required(ErrorMessage = "É necessário informar o tipo de usuario!")]
        public short IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        [Required(ErrorMessage = "É necessário informar o status do usuario!")]
        public bool Status { get; set; }
    }
}
