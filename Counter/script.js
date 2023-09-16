let count = 0;

const dec = document.querySelector(".dec");
const reset = document.querySelector(".reset");
const inc = document.querySelector(".inc");
const value = document.querySelector(".count");


dec.addEventListener("click", function () {
  count--;
  update(count);
});

inc.addEventListener("click", function () {
  count++;
  update(count);
});

reset.addEventListener("click", function () {
  count = 0;
  update(count);
});


function update(count) {
  value.textContent = count;
}
