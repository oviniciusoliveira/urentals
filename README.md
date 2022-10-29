# uRentCars

## Cadastro de carro

### Requisitos funcionais

- [x] Deve ser possível cadastrar um novo carro.

### Regras de negócio

- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [x] O carro deve ser cadastrado por padrão como disponível.
- [x] O usuário responsável pelo cadastro deve ser um administrador.
- [ ] Não deve ser possível cadastrar carro em uma categoria inexistente

## Categorias de carro

### Requisitos funcionais

- [x] Deve ser possível listar todas as categorias de carros
- [x] Deve ser possível cadastrar uma nova categoria

### Regras de Negócio

- [x] O usuário responsável pelo cadastro deve ser um usuário administrador
- [x] Não deve ser possível cadastrar mais de uma categoria com o mesmo nome

## Listagem de carro

### Requisitos funcionais

- [x] Deve ser possível listar todos os carros.
- [x] Deve ser possível listar todos os carros pelo nome da categoria
- [x] Deve ser possível listar todos os carros pelo nome da marca
- [x] Deve ser possível listar todos os carros pelo nome do carro

### Regras de negócio

- [x] Não deve ser possível listar carros indisponíveis.
- [x] O usuário não precisa estar autenticado para visualizar a lista de carros.

## Especificação de carro

### Requisitos funcionais

- [x] Deve ser possível cadastrar uma especificação para um carro.

## Regras de negócio

- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma mesma especificação para um mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador.

## Cadastro de imagens do carro

### Requisitos funcionais

- [x] Deve ser possível cadastrar a imagem do carro

### Regras de negócio

- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- [x] O usuário responsável pelo cadastro deve ser um usuário administrador

### Requisitos não funcionais

- [x] Utilizar o multer para o upload dos arquivos

## Aluguel de carro

### Requisitos funcionais

- [x] Deve ser possível cadastrar um aluguel para um carro e um usuário.

### Regras de negócio

- [x] O aluguel deve ter duração mínima de 24 horas
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel corrente para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel corrente para o mesmo carro.
- [x] O usuário deve estar logado na aplicação
- [ ] Quando um carro for alugado, seu status deve ser alterado para indisponível

## Atualizar carro

### Requisitos funcionais

- [ ] Deve ser possível alterar o nome do carro

### Regras de negócio

- [ ] Somente usuário administrador pode atualizar informações de um carro.
- [ ] Não deve ser possível alterar a placa de um carro já cadastrado.

## TODO

- [ ] Tipar os erros
- [ ] create a file to config env vars in a unique place

## Devolução de um carro

### Requisitos Funcionais

- [ ] Deve ser possível realizar a devolução de um carro

### Regras de negócio

- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
- [ ] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
- [x] Só deve ser possível devolver um aluguel se este ainda estiver em aberto
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel
- [x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso
- [x] Caso haja multa, deverá ser somado ao total do aluguel
- [ ] Ao realizar a devolução, o campo updated_at do aluguel deve ser atualizado
- [ ] Um usuário somente pode devolver um aluguel que é responsável

## Listagem de Aluguéis para Usuário

### Requisitos Funcionais

- [ ] Deve ser possível realizar a busca de todos os aluguéis para o usuário

### Regras de negócio

- [ ] O usuário deve estar logado na aplicação

## Recuperar Senha

### Requisitos Funcionais

- [x] Deve ser possível o usuáriio recuperar a senha informando o e-mail
- [x] O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- [x] O usuário deve conseguir inserir uma nova senha

### Regras de Negócio

- [x] O usuário precisa informar uma nova senha
- [] O link enviado para a recuperação de senha deve expirar em 3 horas
