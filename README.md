# uRentCars


## Cadastro de carro
### Requisitos funcionais
- [ ] Deve ser possível cadastrar um novo carro.

### Regras de negócio
- [x] Não deve ser possível cadastrar um carro com uma placa já existente.
- [ ] O carro deve ser cadastrado por padrão como disponível.
* [ ] O usuário responsável pelo cadastro deve ser um administrador.

## Categorias de carro

### Requisitos funcionais
- [ ] Deve ser possível listar todas as categorias de carros

### Regras de negócio

## Listagem de carro
### Requisitos funcionais
- [ ] Deve ser possível listar todos os carros.
- [ ] Deve ser possível listar todos os carros pelo nome da categoria
- [ ] Deve ser possível listar todos os carros pelo nome da marca
- [ ] Deve ser possível listar todos os carros pelo nome do carro
### Regras de negócio
- [ ] Não deve ser possível listar carros indisponíveis.
- [ ] O usuário não precisa estar autenticado para visualizar a lista de carros.

## Especificação de carro
### Requisitos funcionais
- [ ] Deve ser possível cadastrar uma especificação para um carro.
- [ ] Deve ser possível listar todas as especificações
- [ ] Deve ser possível listar todos os carros
## Regras de negócio
- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador.

## Cadastro de imagens do carro
### Requisitos funcionais
- [ ] Deve ser possível cadastrar a imagem do carro
- [ ] Deve ser possível listar todos os carros

### Regras de negócio
- [ ] O usuário responsável pelo cadastro deve ser um usuário administrador

## Aluguel de carro
### Requisitos funcionais
- [ ] Deve ser possível cadastrar um aluguel para um carro e um usuário.

### Regras de negócio
- [ ] O aluguel deve ter duração mínima de 24 horas
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel corrente para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aluguel corrente para o mesmo carro.

## Atualizar carro

### Requisitos funcionais
- [ ] Deve ser possível alterar o nome do carro

### Regras de negócio
- [ ] Somente usuário administrador pode atualizar informações de um carro.
- [ ] Não deve ser possível alterar a placa de um carro já cadastrado.

## TODO
- [ ] Tipar os erros
- [ ] create a file to config env vars in a unique place
