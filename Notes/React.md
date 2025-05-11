# React

`npm create vite@latest my-react-app --template react`

- Para inserir uma variável (JS) dentro de um HTML, usa-se chaves {}
    - Expression: 3+4
    - Statement: if…else
    - {`${fname} ${lname}`}! ou {fname + “ ” + lname}!
- Atributos em html devem ser escritos em camel case (ex.: className, contentEditable, spellCheck)
    - [Atributos em HTML](https://www.w3schools.com/tags/ref_standardattributes.asp)
- Inline styling

```jsx
const customStyle ={
	color
	fontSize
	border
}

<h1 style={customStyle}>
//OU
<h1 style={{color:"red"}}>
```

- Componentes sempre começam com letra maiúscula.
- [Boas praticas React](https://github.com/airbnb/javascript/tree/master/react)

## Export/Import

- É possível exportar mais de uma função de um mesmo componente.

```jsx
export default App; // exporta como DEFAULT (o statement que será usado no import)

export {doubleApp, tripleApp}; // exporta as demais funções;

//no import ficaria:

import App, {doubleApp, tripleApp} from './pi';

//o import default pode ser nomeado de qualquer forma no import pois só existe
//um único default, porém os demais devem estar com seus devidos nomes

import * as pi from './pi'; //importa TUDO do arquivo pi, com nome de pi
//seria usado como: 
//pi.default, pi.doublePi(), pi.triplePi();
//não é recomendado, recomenda-se importar individualmente apenas o necessário
```

```jsx
import React from "react";    //import do React usando ES6
let react = require("react"); //import do Node
```

## Props

- Parâmetros
- O mesmo que atributos, em HTML. *Custom atributes.*

```jsx
<Card name="teste"/>

// No componente:
function Card(props){
	<h1>Your Name is: {props.name}</h1> 
```

## React devtools

- Ótimo para debugar os componentes, mostra os props do componente.

## Data to Componentes (.map)

Caso eu tenha um array, por exemplo, de dados mockados, com `id`, `imgURL`, `phone`, `email` e queira mapear eles dentro de outro componente, eu posso criar uma função para isso.

- Eu tenho a classe Card.
- Na classe App eu quero chamar o Card, e criar vários com base no que eu mockei em um arquivo JSON a parte.
    - Crio uma função chamada `createCard(contact)` no App, onde:
    
    ```jsx
    function createCard(contact) {
    	return <Card
    	key={contact.id}       //Importante -> Key é obrigatorio 
    	name={contact.name}
    	img={contact.imgURL}
    	phone={contact.phone}
    	email={contact.email}
    	/>
    }
    ```
    
- Para cada componente renderizado por loop, precisa ter um valor `key`.
    - Essa `key` pode ser uma id definida diretamente pelo JSON.
    - `key` não é uma property, ela retorna undefinied.
    - `key` é uma propriedade especial, um identificador.
    - Se eu quisesse acessar a property `key`, devo acessar diretamente o `id` (ou o valor definido para `key`).
- Depois eu mapeio na função principal.
    
    ```jsx
    {contacts.map(createCard)}
    ```
    

## Algoritmos de busca

- [Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- `Map`: Loop no array, cria um novo array fazendo algo com cada item do array original.

```jsx
let numbers = [1, 2, 3, 4, 5];

function double(x) {
	return x * 2;
}

const newNumbers = numbers.map(double);
console.log(newNumbers);

// ou usando funções anonimas:
const newNumbers = numbers.map(function (x) {
	return x * 2;
});
```

- `Filter`: Loop no array, cria um novo array mantendo os itens que retornem true.

```jsx
const newNumbers = numbers.filter(function (num) {
	return num > 10
});
```

- `Reduce` é usado para reduzir um array a um único valor. Percorre os elementos do array aplicando uma função acumuladora.

```jsx
let newNumber = numbers.reduce(function accumulator, currentNumber) {
	return accumulator + currentNumber;
});
```

- `Find` retorna o primeiro elemento do array com o filtro desejado.
    - Se usar `findIndex`, retorna o index.

```jsx
const newNumber = numbers.find(function (num) {
	return num > 10;
})
```

## Arrow Functions

- Introduzido no ES6.
- Torna o código um pouco mais ilegível.

```jsx
// Usando função anonima
const newNumbers = numbers.map(function (x) {
	return x * x;
});

// Usando arrow function
const newNumbers = numbers.map( (x) => {
	return x * x;
});

// Se tiver apenas 1 parametro, não precisa de ()
// Se a função retorna apenas 1 linha, pode-se tirar o return e as {}
const newNumbers = numbers.map(x => x * x);
```

- A regra da 1 linha também aplica quando se é componente, então:

```jsx
{emojipeadia.map(emojiTerm => (
	<Entry
		key={emojiTerm.id}
		emoji={emojiTerm.emoji}
	/>
))}
```

## AND Operator em React

- No código a seguir:

```jsx
currentTime > 12 && <h1>Hi</h1>
// Não checa se ambos são true,
// Ele checa o primeiro, e renderiza o segundo
```

# State (Importante!)

Código imperativo: FUNCIONA!

- Por que? Porque no React os componentes são renderizados e não podem ser alterados.
    - Então quando é necessário alterar algo no componente, ele deve ser renderizado novamente.

```jsx
function strike() {
	document.getElementById("root").style.textDecoration = "line-through");
}

function unStrike() {
	document.getElementById("root")..style.textDecoration = null);
}

//function app...
<button onClick={strike}> change to strike through</button>
<button onClick={unStrike}> change back</button>
```

Código declarativo: NÃO funciona

```jsx
let isDone = false;
function strike() {
	isDone = true;
}

function unStrike() {
	isDone = false;
}

//function app...
<button onClick={strike}> change to strike through</button>
<button onClick={unStrike}> change back</button>
```

## Hooks

> Hooks são funções especiais do React que permitem o uso de estado e outras funcionalidades em componentes funcionais.
> 

### useState + Array destructuring

Uma forma de gerenciar estados em componentes funcionais do React sem escrever lógica de renderização manual é usando o hook `useState`.

- O `useState` faz com que o componente seja re-renderizado sempre que o estado muda.
- O `useState` retorna um array com dois elementos: o valor atual do estado e uma função para atualizá-lo.

A desestruturação de arrays permite extrair elementos individuais de um array e atribuí-los diretamente a variáveis, facilitando o acesso e manipulação de dados.

```jsx
let myArray = [10, 20, 30];
console.log(myArray[0])
//This console log will return 10.

const [counter, setCounter] = useState(100);
console.log(counter)
//Will return 100 since this is the current state. 
//(We use the initial state in this case since the setCounter function 
//has not yet been invoked to alter the initial state.)

function App() {
	const [count, setCount] = useState(0);
	
	function increase() { setCount(count+1) }
	
	return (
		<div className="container">
			<h1>{count}</h1>
			<button> onClick={increase}</button>
		</div>
	);
}
```

### onChange

- Triga uma função sempre que o valor de um input muda

```jsx
function MyComponent(){
	const [name, setName] = useState("Guest");
	 function handleNameChange(event){
		 setName(event.target.value);
	 }

return (<div>
					<input value={name} onChange={handleNameChange}/>
					<p>Name: {name}</p>
				</div>
				)
```

### Updater function

- Função passada como argumento no setState(), permite safe updates baseado no estado anterior.
    - Usado com múltiplos state updates e funções assíncronas

```jsx
function increment() {
	// pega o estado pendente e cálcula o proximo passo
	// React põe a updater function em uma fila
	// durante a proxima renderização, vai chamar elas na mesma ordem
	setCount (c => c+1);
	setCount (c => c+1);
	
	// boa pratica usar mesmo quando vá se fazer 1 única vez
	setCount (c => c+1); //ou prevCount
	
	// no exemplo em sequencia não precisa de updater function porque
	// o estado anterior é irrelevante
	setCount(0)
}
```

### Updater function (Objects, array, array of objects)

- Usamos spread operator para mudar um atributo de objeto sem perder as demais propriedades

```jsx
// UPDATE OBJECTS IN STATE ==========================================================
const [car, setCar] = useState({year: 2024, make: "ford", model: "mustang"});

function handleYearChange(event){
	setCar({...car, year: 2025});
}

// Melhor prática: Updater Function
// Não queremos mudar o estado atual do carro, mas sim a referencia do estado anterior
// (safe updates)
function handleYearChange(event){
	setCar(c => ({...car, year: event.target.value}));
}

// UPDATE ARRAYS IN STATE ===========================================================
// Para array é a mesma coisa
const [foods, setFoods] = useState(["Apple", "Orange", "Banana"]);

function handleAddFood(){
	const newFood = document.getElementById("foodInput").value;
	document.getElementById("foodInput").value = "";
	
	setFoods(f => [...f, newFood]);
}

function handleRemoveFood(){
	setFoods(foods.filter((_, i) => i !== index));
}

// UPDATE ARRAY OF OBJECTS IN STATE =================================================
function handleAddCar(){
	const newCar = {year: carYear,
									make: carMake,
									model: carModel};
									
	setCars(c => [...c, newCar]);
	setCarYear(new Date().getFullYear());
	setCarMake("");
	setCarModel("");
}
```

### useEffect

- Faça algo quando
    - O componente re-renderiza.
    - O componente é montado (cria e dá append ao DOM)
    - O estado do valor muda
- useEffect(function, [dependencies]);
    1. useEffect(() ⇒ {}) → roda a cada re-renderização
    2. useEffect(() ⇒ {}, []) → roda quando é montado
    3. useEffect(() ⇒ {}, [value]) → roda quando é montado + quando o valor muda

```jsx
const [count, setCount] = useState(0);

// 1. roda a cada re-renderização
useEffect(() => {
	document.title = `count: ${count}`;
});

//2. roda quando é montado
useEffect(() => {
	document.title = `count: ${count}`;
}, []);

//3. roda quando é montado + quando o valor muda
useEffect(() => {
	document.title = `count: ${count}`;
}, [count]); //<- dependencia

function addCount(){//...}
//... onClick{addCount}
```

### useContext

- Permite compartilhar valores entre vários níveis de componentes sem passar props para cada nível.
    - Você cria um contexto usando **`React.createContext`**.
    - Em seguida, usa o **`Provider`** do contexto para envolver os componentes que precisam acessar esses dados.
    - Os componentes filhos podem acessar os dados do contexto utilizando o **`useContext`**.

```jsx
//Provider -> Componente A
//Cria a variavel a ser usada pelo filho distante (Consumer)
import {createContext} from 'react';

export const userContext = createContext();

function ComponentA(){
	const [user, setUser] = useState("Edu");
	
	return(
		<div className="box">
			<h1>ComponentA</h1>
			<h2>{`Hello ${user}`}</h2>
			<UserContext.Provider value={user}>
				<ComponentB user={user}/>
			<UserContext.Provider/>
		</div>
```

```jsx
//Consumer-> Componente D
import {createContext} from 'react';
import {UserContext} from './ComponentA.jsx';

export const userContext = createContext();

function ComponentD(){
	const user = useContext(UserContext);
	
	return(
		<div className="box">
			<h1>ComponentD</h1>
			<h2>{`Bye${user}`}</h2>
		</div>
```

### useRef

O **`useRef`** é um hook que retorna um objeto mutável, que pode ser utilizado para armazenar valores mutáveis que **não causam re-renderização** do componente quando alterados. **`useRef`** é comumente usado para:

- Acessar **referências de DOM** diretamente (sem precisar passar por props ou estados).
- Armazenar valores persistentes entre renderizações, mas sem causar uma re-renderização do componente.

```jsx
const inputRef = useRef(null);

function handleClick(){
	inputRef.current.focus(); //highlight sem re-renderizar
}
```

# Callback function (importante!)

> Uma **callback** é uma função que é **passada como argumento** para outra função, e que será **executada posteriormente**, em algum ponto dentro da função receptora.
> 

No React, isso é muito comum com eventos como `onClick`, onde **você não quer chamar a função imediatamente**, mas **esperar até que o evento aconteça** (por exemplo, o usuário clicar).

- Por que usar uma função anônima no `onClick`?

No trecho:

```jsx
onClick={() => handleRemoveFood(index)}
```

Você está **passando uma função anônima** (uma função sem nome) que **invoca `handleRemoveFood(index)` somente quando o clique acontecer**.

- E se você fizesse assim direto?

```jsx
onClick={handleRemoveFood(index)}
```

Esse código **executaria `handleRemoveFood` imediatamente**, durante o *render* do componente — porque você está chamando a função com `()`, e o resultado dela (que normalmente é `undefined`) seria passado para o `onClick`.

| Situação | Pode passar direto? | Exemplo |
| --- | --- | --- |
| Função que só usa o `event` | ✅ Sim | `onChange={handleX}` |
| Função que precisa de argumento personalizado | ❌ Não | `onClick={() => handleX(param)}` |