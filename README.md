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

## Tecnologias usadas 
- ![Node js]("https://nodejs.org/en/") - versão 14.17
- ![Typescript]("https://www.typescriptlang.org/") - versão 4.5
- ![Express]("https://expressjs.com/") - versão 4.17.1
- ![TypeORM]("https://typeorm.io/#/") - versão 0.2.41
- ![Postgres]("https://www.postgresql.org/") - versão 12.8

## API disponível
https://jr-topic.herokuapp.com/

## EndPoints

<p>GET: https://jr-topic.herokuapp.com/topic?page=1&full=true&limit=10</p>
<p>GET: https://jr-topic.herokuapp.com/topic/my-topics/e008e1d0-0c86-4177-9424-0b3a27a8cf3c</p>
<p>GET: https://jr-topic.herokuapp.com/topic/d09af02b-23a3-4c52-b437-172f6b652111</p>
<p>POST: https://jr-topic.herokuapp.com/topic</p>
<p>POST: https://jr-topic.herokuapp.com/vote</p>
<p>POST: https://jr-topic.herokuapp.com/comment</p>
<p>POST: https://jr-topic.herokuapp.com/user</p>
<p>GET: https://jr-topic.herokuapp.com/user/login</p>
<p>PATCH: https://jr-topic.herokuapp.com/topic/close</p>

## Requests
<p>POST: https://jr-topic.herokuapp.com/topic</p>

```

{
	"userId": "e008e1d0-0c86-4177-9424-0b3a27a8cf3c",
	"title": "Aqui tem o titulo do meu topico",
	"body":  "Aqui vem o corpo to meu topico"
}

```

<p>POST: https://jr-topic.herokuapp.com/comment</p>

```

{
	"topicId": "d09af02b-23a3-4c52-b437-172f6b652111",
	"userId": "e008e1d0-0c86-4177-9424-0b3a27a8cf3c",
	"body":  "Comentario sobre o topico"
}

```

<p>POST: https://jr-topic.herokuapp.com/user</p>

```

{
	"name": "Super Mario",
	"email": "super.mario@stail.com",
	"password": "sp123456"	
}

```

<p>POST: https://jr-topic.herokuapp.com/topic/vote</p>

```

{
	"userId": "e008e1d0-0c86-4177-9424-0b3a27a8cf3c",
	"topicId": "d09af02b-23a3-4c52-b437-172f6b652111",
	"typeVote": true
}

```

<p>PATCH: https://jr-topic.herokuapp.com/topic/close</p>

```

{
	"topicId": "d09af02b-23a3-4c52-b437-172f6b652111",
	"userId": "e008e1d0-0c86-4177-9424-0b3a27a8cf3c"
}

```

<p>GET: https://jr-topic.herokuapp.com/user/login</p>

```

{
	"email": "jardesson01@gmail.com",
	"password": "jr123456" 
}

```


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
![RetornoFindTopics](https://user-images.githubusercontent.com/45296422/147099193-9d36b628-6381-475e-a8c9-07bc6219f776.png)

#### Criação de um tópico
![RetronoCreateTopic](https://user-images.githubusercontent.com/45296422/147099462-432e45ab-28ce-4165-83ff-af63a529c4a6.png)

#### Criação de um usuário
![CreateUserSuccess](https://user-images.githubusercontent.com/45296422/146811079-8331f13b-11e9-43ab-b291-41bdee31789a.png)

#### Validações na criação de usuário
![createUserJoin](https://user-images.githubusercontent.com/45296422/146812376-6eb28c01-1f3a-47e0-b84e-74b335328f87.png)

## Como usar o projeto

```

$ cd suapasta
$suapasta> git clone https://github.com/jardessonribeiroTI/topic.git
$cd topic
$topic> yarn add ou npm install
$topic> yarn | npm typeorm migration:run
$topic> yarn | npm dev

```

### Autor: Járdesson Ribeiro
