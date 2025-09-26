"use strict";

/*
ЗАДАЧА
Створіть програму, яка буде перетворювати змінні слова, в яких розділені нижнім тире, в змінні, які будуть записані в camelCase нотації.
/////////
*/

document.querySelector(".btn").addEventListener("click", function () {
  const text = document.querySelector(".text").value;
  const rows = text.split("\n");
  console.log(rows);
  let output = [];

  for (let row of rows) {
    const [first, second] = row.trim().toLowerCase().split("_");
    // console.log(first);
    // console.log(second);
    output.push(
      `${first}${second.replace(second[0], second[0].toUpperCase())}`
    );
    console.log(output);
  }
  document.querySelector(".output").innerText = output.join("\n");
});
