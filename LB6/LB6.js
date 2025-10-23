// Завдання 1
/*Створити функцію, яка використовує проміс для реалізації паузи в
виконанні коду, передбачити параметр для задання тривалості паузи.*/

// function delay(ms) {
//     return new Promise(resolve => {
//         setTimeout(resolve, ms);
//     });
// }

// console.log("Початок");
// delay(2000).then(() => console.log("Пауза 2 секунди закінчилася"));

// Завдання 2
/*Симуляція запитів до бази даних з використанням Promise, setTimeout.
– Створити масив, що містить інформацію про користувачів:
const users = [
{ id: 1, name: "Mykola" },
{ id: 2, name: "Olena" },
{ id: 3, name: "Stepan" }
];
– Створити функцію getUser(userID), яка повертає проміс. В роботі
реалізувати імітацію роботи з базою даних:
o Якщо userID присутній в базі даних (масиві користувачів),
повернути об’єкт користувача з затримкою 5 секунд. Для
затримки відповіді використати функцію setTimeout в Promise.
o Якщо користувач з userID відсутній в базі даних, проміс повинен
бути відхилений (reject) з повідомленням "User not found".
– Реалізувати підписку на проміс в двох версіях:
o then/catch
.then() — викликається, якщо проміс успішно виконався.
.catch() — викликається, якщо сталася помилка.
.finally() — викликається завжди після завершення проміса,
незалежно від результату.
o async/await
async/await — це синтаксичний цукор над промісами, який
дозволяє писати асинхронний код так, ніби він синхронний.*/


const users = [
    { id: 1, name: "Mykola" },
    { id: 2, name: "Olena" },
    { id: 3, name: "Stepan" }
];

function getUser(userID) {
    return new Promise((resolve, reject) => {
        const delayMS = 5000;
        setTimeout(() => {
            const user = users.find(u => u.id === userID);
            if (user) {
                resolve(user);
            } else {
                reject(new Error(`User not found: ID ${userID}`));
            }
        }, delayMS);
    });
}

// 2.1. Підписка на проміс: then/catch/finally

// Успішний запит (ID 1)
// getUser(1)
//     .then(user => {
//         console.log(`Успіх then: Отримано користувача: ${user.name}`);
//     })
//     .catch(error => {
//         console.error(`Помилка catch: ${error.message}`);
//     })
//     .finally(() => {
//         console.log("Блок finally: Запит на ID 1 завершено.\n");
//     });

// // Невдалий запит (ID 99)
// getUser(99)
//     .then(user => {
//         console.log(`Успіх then: Отримано користувача: ${user.name}`);
//     })
//     .catch(error => {
//         console.error(`Помилка catch: ${error.message}`);
//     })
//     .finally(() => {
//         console.log("Блок finally: Запит на ID 99 завершено.");
//     });


// 2.2. Підписка на проміс: async/await

// async function fetchUser(id) {
//     try {
//         console.log(`Початок запиту для ID ${id}...`);
//         const user = await getUser(id);
//         console.log(`async/await Успіх: Отримано користувача: ${user.name}`);
//     } catch (error) {
//         console.error(`async/await Помилка: ${error.message}`);
//     }
// }

// fetchUser(2);
// fetchUser(100);

// Завдання 3 & 4. Функція fetchAllUsers() та обробка помилок
/* 3. Розробити функцію fetchAllUsers(), яка повертає всіх користувачів через 3 секунди після надходження запиту. 
4. Додати обробку помилки, якщо база даних пуста. 
*/
// function fetchAllUsers() {
//     return new Promise((resolve, reject) => {
//         const delayMS = 3000;
//         setTimeout(() => {
//             if (users.length === 0) {
//                 reject(new Error("Database is empty. No users found."));
//             } else {
//                 resolve(users);
//             }
//         }, delayMS);
//     });
// }

// fetchAllUsers()
//     .then(allUsers => {
//         console.log("Успіх: Отримано всіх користувачів:");
//         console.log(allUsers); 
//     })
//     .catch(error => {
//         console.error(`Помилка fetchAllUsers: ${error.message}`);
//     });

// Приклад для тестування помилки пустої бази даних 

// const tempUsers = users.splice(0, users.length); 

// fetchAllUsers()
//     .catch(error => console.error(`Тест пустої БД: ${error.message}`))
//     .finally(() => users.push(...tempUsers)); 


// Завдання 5. Послідовні запити (Ланцюг then)
/*Зроби серію запитів вибірки користувачів з userID = 1, 2 та 3, 
оформити  послідовність викликів запитів у вигляді ланцюга 
з використанням  then/catch (особливість рішення: 
запити виконуються послідовно, що  збільшує загальний час). */ 

// const sequentialStart = Date.now();

// getUser(1)
//     .then(user1 => {
//         console.log(`[Послідовно 1] Отримано ${user1.name}. Час: ${Date.now() - sequentialStart}мс`);
//         return getUser(2); 
//     })
//     .then(user2 => {
//         console.log(`[Послідовно 2] Отримано ${user2.name}. Час: ${Date.now() - sequentialStart}мс`);
//         return getUser(3); 
//     })
//     .then(user3 => {
//         console.log(`[Послідовно 3] Отримано ${user3.name}. Час: ${Date.now() - sequentialStart}мс`);
//         console.log(`Усі послідовні запити завершено. Загальний час: ${Date.now() - sequentialStart}мс.`);
//     })
//     .catch(error => {
//         console.error(`Помилка в ланцюгу then: ${error.message}`);
//     });


// Завдання 6. Паралельні запити (Promise.all)
/*Реалізувати серію запитів вибірки користувачів з userID = 1, 2 та 3  паралельно 
(виконання запитів одночасне, де загальний час — це максимум  з усіх затримок). */ 

// const parallelStart = Date.now();

// const userPromises = [
//     getUser(1),
//     getUser(2),
//     getUser(3)
// ];

// Promise.all(userPromises)
//     .then(results => {
//         console.log("Паралельно: Усі запити завершено.");
//         console.log("Отримані користувачі:", results.map(u => u.name));
//         console.log(`Загальний час виконання: ${Date.now() - parallelStart}мс`);
//     })
//     .catch(error => {
//         console.error(`Помилка під час паралельних запитів: ${error.message}`);
//     });

