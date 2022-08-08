# <p align="center"> Processo Seletivo - 2RP Net </p>
&nbsp;

## <p align="center">Sobre a etapa 4 </p>
<p align="center">
Problema 1 Criar um sistema que possibilite o cadastro e login de usuários,
com as seguintes funções:
- Cadastrar um novo usuário;
- Listar informações de um usuário;
- Alterar o nome e o tipo de um usuário;
- Excluir um usuário;
- Alterar o Status de um usuário (ativo ou inativo)
- Tipos de usuário.
Regras de Negócio
- A tabela usuários deve conter os campos nome, senha, tipo, email e
status;
- A tabela de tipos deve ter o tipo do usuário (geral, admin, root)
- Um usuário pode ter apenas um único tipo;
- Apenas usuários do tipo root e admin podem cadastrar novos usuários;

- Apenas usuários do tipo root e admin podem alterar qualquer informa-
ção do usuário (inclusive status);

- Apenas usuários root podem excluir usuários;

- Usuários do tipo geral só têm acesso a funcionalidade de listar infor-
mações de seu próprio usuário, bem como alterar suas próprias infor-
mações;

- O login deve ser feito com email e senha.
</p>

