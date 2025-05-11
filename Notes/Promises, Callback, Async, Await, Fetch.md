# Promises, Callback, Async, Await, Fetch

# Síncrono x Assíncrono

- **Código Síncrono**: Em um código **síncrono**, as operações são executadas uma após a outra, ou seja, o próximo comando só é executado quando o comando anterior terminar. Isso significa que se você tiver uma operação demorada (como uma requisição de rede ou leitura de arquivo), o programa vai "parar" até que essa operação seja concluída.
    
    **Exemplo de código síncrono:**
    
    ```jsx
    console.log("Primeiro");
    console.log("Segundo");
    console.log("Terceiro");
    ```
    
- **Código Assíncrono**: Em um código **assíncrono**, as operações podem ser executadas "em paralelo" ou de maneira não bloqueante. Isso significa que o código não fica esperando que uma operação, como uma requisição de rede, termine antes de executar outras tarefas. O código pode seguir enquanto a operação ainda está em andamento, retornando o resultado no futuro, quando estiver pronto.
    
    **Exemplo de código assíncrono com `setTimeout`:**
    
    ```jsx
    console.log("Primeiro");
    setTimeout(() => console.log("Segundo"), 2000);  // Executa depois de 2 segundos
    console.log("Terceiro");
    ```
    

<aside>
🎯

JavaScript is single-threaded, meaning it executes one task at a time. However, asynchronous operations allow JavaScript to handle multiple tasks **without blocking the main thread**. This is crucial for fetching data, handling user inputs, and running background tasks smoothly.

</aside>

## Step 1: Callbacks

- A **callback function** is a function passed as an argument to another function and executed later.

Example: Using a Callback

```jsx
function fetchData(callback) {
    setTimeout(() => {
        console.log("Data fetched!");
        callback(); // Calling the callback function
    }, 2000);
}

function processData() {
    console.log("Processing data...");
}

fetchData(processData);
```

**📌 How It Works?**

- **fetchData()** simulates an asynchronous task (fetching data).
- It takes **callback** as an argument and calls it after fetching data.
- **processData()** runs only after the data is fetched.

✅ **Issue with Callbacks**: **Callback Hell** (nested callbacks make code hard to read).

## Step 2: Promises — A Better Way to Handle Asynchronous Tasks

A Promise represents a value that might be available in the future. It has three states:

- **Pending** — The operation is still in progress
- **Resolved (Fulfilled)** — The operation completed successfully
- **Rejected** — The operation failed

Example: Creating and Using a Promise

```jsx
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true; // Simulating success or failure
            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject("Error fetching data.");
            }
        }, 2000);
    });
}

fetchData()
    .then(response => console.log(response)) // Handling success
    .catch(error => console.log(error)); // Handling error
```

**📌 How It Works?**

- The function returns a Promise that either resolves (success) or rejects (error).
- We use **.then()** to handle success and **.catch()** to handle errors.

✅ Promises solve callback hell by providing a cleaner syntax.

## Step 3: Async/Await — The Best Approach for Asynchronous JavaScript

The **async** and **await** keywords provide a more readable way to work with Promises.

Example: Using Async/Await for Fetching Data

```jsx
async function fetchData() {
    try {
        let response = await new Promise((resolve) => {
            setTimeout(() => resolve("Data fetched successfully!"), 2000);
        });
        console.log(response);
    } catch (error) {
        console.log("Error:", error);
    }
}

fetchData();
```

**📌 How It Works?**

- **async** makes the function return a Promise.
- **await** waits for the promise to resolve before moving to the next line.
- The **try…catch** block handles errors smoothly.

✅ **Async/Await** makes asynchronous code as readable as synchronous code.

<aside>
🎯

- **`async`**: transforma uma função em assíncrona. Ou seja, ela sempre retorna uma **Promise**.
- **`await`**: faz a execução do código "esperar" a **Promise** ser resolvida antes de seguir para a próxima linha de código.
</aside>

## Step 4: Real-World Example — Fetching Data from an API

Let’s fetch data from a public API using **fetch()** with Promises and **Async/Await**.

Example: Using Fetch with Promises

```jsx
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json()) // Convert to JSON
    .then(data => console.log("Fetched Data:", data))
    .catch(error => console.log("Error fetching data:", error));
```

**📌 How It Works?**

- **fetch()** sends an HTTP request.
- The first **.then()** converts the response into JSON.
- The second **.then()** logs the data.
- The **.catch()** handles any errors.

## Example: Fetching API Data Using Async/Await

```jsx
async function fetchPost() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        let data = await response.json();
        console.log("Fetched Data:", data);
    } catch (error) {
        console.log("Error:", error);
    }
}

fetchPost();
```

**📌 Why is Async/Await Better?**

- No need for multiple **.then()**
- Easier to read and maintain
- Better error handling with **try…catch**

## Step 5: Handling Multiple API Calls with Async/Await

- To fetch multiple API requests in parallel, use **Promise.all()**.

Example: Fetching Multiple APIs Simultaneously

```jsx
async function fetchMultipleData() {
    try {
        let [user, posts] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users/1").then(res => res.json()),
            fetch("https://jsonplaceholder.typicode.com/posts?userId=1").then(res => res.json())
        ]);
        console.log("User Data:", user);
        console.log("User Posts:", posts);
    } catch (error) {
        console.log("Error:", error);
    }
}

fetchMultipleData();
```

**📌 How It Works?**

- **Promise.all()** runs both requests simultaneously.
- The response is stored in an array **[user, posts]**.
- Saves time compared to making sequential requests.

✅ Best for optimizing performance when making multiple API calls.

Artigo usado e excelente referencia: [https://medium.com/@kaklotarrahul79/how-to-use-javascript-async-await-fetch-api-like-a-pro-1c2cb266145b](https://medium.com/@kaklotarrahul79/how-to-use-javascript-async-await-fetch-api-like-a-pro-1c2cb266145b)