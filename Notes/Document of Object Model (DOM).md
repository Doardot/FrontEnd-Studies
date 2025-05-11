# Document of Object Model (DOM)

![DOM.png](images/DOM.png)

- Permite que scripts e linguagens de programação tenham acesso e manipulem páginas web.
- É representado como uma árvore lógica em memória.
- Pode ser acessado para mudar a estrutura do documento, estilo ou conteúdo.

### GetElements

```jsx
document.firstElementChild           //pega o primeiro elemento
document.lastElementChild
document.firstElementChild.innerHtml //altera o conteúdo do html
document.getElementsByTagName("li")  //pega por TODOS elementos do tipo il (array)
document.getElementsByTagName("li")[2].style.color = "purple"; 
document.getElementByClassName()     //pega o elemento pela class do html (retorna array)
document.getElementById()            //retorna o elemento único pelo id
document.querySelector()             //pega por elemento/tipo/classe/id (individual)

// exemplo de query
document.querySelector("li a");      //pega pelo elemento a dentro de li
document.querySelector("li.item");   //pega pela classe item dentro de li

//usa-se ponto para especificar um item da mesma classe
//sem ponto para encontrar o filho daquele objeto

document.querySelector(#list .item);    //pega o primeiro elemento
document.querySelectorAll(#list .item); //pega todos os elementos

//enquanto no CSS se usa apenas
// visibility : hidden
//no DOM seria:
document.querySelector("h1").style.visibility = "hidden";

document.querySelector("button").classList;  //retorna os elementos dentro da classe 
                                             //e seu valor
                                             
//innerHTML pode adicionar tags também
document.querySelector("h1").innerHTML = "<em> hi </em>";

// O que vem junto da tag são atributos <a href>
document.querySelector("a").attributes; //retorna todos os atributos
document.querySelector("a").getAttribute("href"); //retorna atributo href
document.querySelector("a").setAttribute("href", "google.com"); //altera o valor do 
                                                                //atributo
```

- [HTML DOM Style Object](https://www.w3schools.com/jsref/dom_obj_style.asp)

### Criação de classe por script

```jsx
document.querySelector("button").classList.add("invisible");
document.querySelector("button").classList.remove("invisible");
document.querySelector("button").classList.toggle("invisible"); // altera a visibilidade
```

### Event Listeners

[Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

- Faz algo de acordo com o evento capturado para o elemento

Parâmetros:

- Tipo do evento
- O objeto que recebe o notify de quando o evento acontece

```jsx
document.querySelector("button").addEventListener("click", handleClick);

function handleClick() {
    alert("test")
}
```

### Anonymous Function

```jsx
document.querySelector("button").addEventListener("click", function () {
    alert("test");
});
```

### Debugger

- Existe debug em JS, apenas escrever debugger, e a função em seguida.

### Higher Order Functions/ Callback function

- Funções que podem ter outras funções como parâmetros.
    - Quando o document detectar o keydown, ele executa a função passando o evento que triggou essa função

```jsx
document.addEventListener("keydown", function(event) {
    makeSound(event.key);
});
```

- Event pode ser um mouseEvent, keyboardEvent. Pode ser nomeado “e” também