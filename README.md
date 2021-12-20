![Topic](https://user-images.githubusercontent.com/45296422/146786527-065e26e3-5acf-447d-a3bc-e35e2f9061f8.jpg)

## Sobre o projeto
Esse projeto faz parte de um teste técnico. O desafio é desenvolver uma aplicação para que seja possível cadastrar e votar 
contra ou a favor em tópicos, semelhante a alguns fóruns de discussão sobre algum assunto.

## Funcionalidades implementadas
- [x] Cadastrar Usuário(Como o tópico vai ser criado e votado, é interessante ter usuário)
- [x] Login de usuário(Para ter sempre o controle das ações, já que o usuário só pode votar uma vez em cada tópico)
- [x] Cadastrar Tópico
- [x] Listar tópicos(Lista semelhante a feed que mosta os ultimos tópicos criados e em aberto, com a possibilidade de fazer listagem full, tópicos abertos e fechados)
- [x] Listar os tópicos criados por um usuário determinado
- [x] Possibilidade de buscar por um tópico em específico
- [x] Fechar um tópico(Apenas o usuário que criou o tópico poderá fecha-lo)
- [x] Adicionar um comentário ao tópico.
- [x] Salvar o registro de votação(Um método interno que auxilia na recuperção para o usuário não votar novamente)
- [x] Todas as listagens possuem paginação de resultados

## Tecnologias Usadas 
- ![Node js]("https://nodejs.org/en/") - versão 14.17
- ![Typescript]("https://www.typescriptlang.org/") - versão 4.5
- ![Express]("https://expressjs.com/") - versão 4.17.1
- ![TypeORM]("https://typeorm.io/#/") - versão 0.2.41
- ![Postgres]("https://www.postgresql.org/") - versão 12.8

## Formato de responses
``` 
{ // Success
	"message": "Usuario cadastrado com sucesso", //Mensagem da resposta
	"type": "success",//Tipo da resposta
	"body": {//Corpo da resposta, pode ser um objeto ou um array de objetos
		"id": "7f52d637-8d21-418a-a5eb-bcf9100c3ce6",
		"name": "Jose Sucesso"
	}
}

```

``` 
{ //Error
	"message": "Usuario não cadastrado",//Mensagem da resposta
	"type": "error validation",//Tipo da resposta
	"errors": [ //Array com os erros da requisição
		"email invalido",
		"Senha deve ter no minimo 6 caracteres" //Informação sobre os erros
	]
}

```


## Exemplos de requisição
#### Listagem de tópicos
![Print listTopics](https://user-images.githubusercontent.com/45296422/146808562-76aacad4-20cf-44eb-9aa2-7f29d5e4dcc5.png)

#### Criação de um tópico
![CreateTopic](https://user-images.githubusercontent.com/45296422/146809465-88adc776-3ab2-4d35-b624-f1ee405370f2.png)

#### Criação de um usuário
![CreateUserSuccess](https://user-images.githubusercontent.com/45296422/146811079-8331f13b-11e9-43ab-b291-41bdee31789a.png)

#### Validações na criação de usuário
![createUserJoin](https://user-images.githubusercontent.com/45296422/146812376-6eb28c01-1f3a-47e0-b84e-74b335328f87.png)
