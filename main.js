function openModal() {
  document.getElementById(`modal`).classList.remove(`hidden`);
}

function closeModal() {
  document.getElementById(`modal`).classList.add(`hidden`);
}

document
  .getElementById(`button-operations`)
  .addEventListener(`click`, function () {
    openModal();
  });

