//      INITIALIZE APP

const initializeApp = () => {
    const savedCategories = getCategories(); 
    createCategoriesTable(savedCategories);
    const savedOperations = getOperations();
    createOperationsTable(savedOperations);
    createTableForReports(getReports());
    getBalance(getOperations());
};

//      RESPONSIVE DESIGN

const setStyleNone = (element) => {
    document.getElementById(element).classList.add('hidden');
};

const setStyleFlex = (element) => {
    document.getElementById(element).classList.remove('hidden');
    document.getElementById(element).classList.add('flex');
};

const toggleMobileNav = () => {
    document.getElementById('nav-items').classList.toggle('hidden');
    if (document.getElementById('nav-items').classList.contains('hidden')) {
        document.getElementById('nav-btn').innerHTML = '<i class="fa-solid fa-bars"></i>';
    } else {
        document.getElementById('nav-btn').innerHTML = '<i class="fa-solid fa-xmark"></i>';
    };
};

const getBalance = (data) => {

    let income = 0;
    let expense = 0;

    if (data && data.length > 0) {
    for (let operation of data) {
        if (operation.type === 'Ganancia') {
            income += parseInt(operation.amount);
        }
        if (operation.type === 'Gasto') {
            expense += parseInt(operation.amount);
        }
    }
  }

    let balance = income - expense;

    const balanceType = income >= expense ? "text-green-600" : "text-red-600";
    const balanceAmount = income >= expense ? "+$" : "-$";
    const formattedBalance = balance < 0 ? balance.toString().replace('-', '') : balance;

    const piggyBankDiv = document.createElement('div');

    if (data && data.length > 0) {
        setStyleNone('no-balance');
        document.getElementById('balance-display').innerHTML = `
        <div class="flex columns-2 justify-between">
          <div>
            <h3>Ganancias</h3>
          </div>
          <div class="text-green-600">
            <span>+$</span>
            <span>${income}</span>
          </div>
        </div>
        <div class="flex columns-2 justify-between">
          <div>
            <h3>Gastos</h3>
          </div>
          <div class="text-red-600">
            <span>-$</span>
            <span>${expense}</span>
          </div>
        </div>
        <div class="flex columns-2 justify-between text-2xl border-solid border-t border-light pt-2 dark:border-dark">
          <div>
            <h3>Total</h3>
          </div>
          <div class="${balanceType}">
            <span>${balanceAmount}</span>
            <span>${formattedBalance}</span>
          </div>
        </div>`;
          if (balance < 0) {
              piggyBankDiv.innerHTML = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><path d="m229.67 163.57a56.21 56.21 0 0 1 -12.46 1.87c-4.11.32-5.9-1.67-6.19-5.75-.88-12.51-.35-24.87-8.72-35.16a112 112 0 0 0 17.25-7.81c2.07 2.55 4.76 4.5 7.13 6.76a37 37 0 0 1 11 31c-.29 2.32-.88 4.74-2.53 6.4-1.45 1.44-3.51 2.12-5.48 2.69z" fill="#6cbdb5"/><path d="m216.39 166a5.72 5.72 0 0 1 -3.87-1.23c-1.18-1-1.83-2.67-2-5-.12-1.68-.21-3.35-.3-5-.6-10.83-1.16-21.07-8.31-29.86a.48.48 0 0 1 -.09-.45.49.49 0 0 1 .31-.33 111.51 111.51 0 0 0 17.18-7.78.51.51 0 0 1 .63.12 36.49 36.49 0 0 0 4.58 4.47c.83.73 1.69 1.47 2.51 2.25a37.61 37.61 0 0 1 11.15 31.4c-.27 2.14-.83 4.83-2.68 6.69-1.57 1.59-3.85 2.28-5.68 2.84a54.9 54.9 0 0 1 -12.21 1.86h-.36c-.25.02-.59.02-.86.02zm-13.26-41.22c6.93 8.92 7.49 19.11 8.09 29.88.09 1.67.18 3.34.3 5 .15 2.08.69 3.5 1.66 4.34a5.24 5.24 0 0 0 4 .95h.36a54.06 54.06 0 0 0 12-1.83c1.82-.55 3.87-1.18 5.27-2.58 1.64-1.65 2.14-4.14 2.4-6.12a36.57 36.57 0 0 0 -10.85-30.55c-.8-.76-1.65-1.5-2.48-2.21a41.44 41.44 0 0 1 -4.43-4.27 111.73 111.73 0 0 1 -16.32 7.37z" fill="#231f20"/><path d="m201.88 147.75s-11.21-13.15-10.69-22.51l-18.42 9.52s5.76 30.53 13.65 37.46 15.46-24.47 15.46-24.47z" fill="#6cbdb5"/><path d="m188.75 173.72a4 4 0 0 1 -2.66-1.12c-7.93-7-13.58-36.49-13.82-37.74a.5.5 0 0 1 .27-.54l18.46-9.53a.5.5 0 0 1 .5 0 .51.51 0 0 1 .23.45c-.51 9 10.46 22 10.57 22.16a.49.49 0 0 1 .1.44c-.23 1-5.74 23.53-12.52 25.67a3.5 3.5 0 0 1 -1.13.21zm-15.42-38.72c.68 3.46 6.21 30.47 13.42 36.8a2.74 2.74 0 0 0 2.79.75c5.89-1.87 11.17-22.24 11.79-24.71-1.41-1.69-10.53-13-10.66-21.81z" fill="#231f20"/><path d="m230.39 128.08a24.16 24.16 0 0 0 -2.31 19.92c-4.06.14-8.32.68-11.58 3.11s-5 7.3-2.78 10.71a16.66 16.66 0 0 0 -15.1 5.9 15.6 15.6 0 0 0 -16.43-8.3c1.8-3.59-.84-8.18-4.56-9.71s-8-.75-11.77.54a48.15 48.15 0 0 0 -17.35 10.35c-3.76-1.82-8.51.1-11 3.41s-3.31 7.63-3.58 11.8c-.24 3.65-.1 7.51 1.74 10.67a18.62 18.62 0 0 0 6.16 5.84 60.29 60.29 0 0 0 38.88 9.48c.23 4.26 5.55 6 9.81 6.35a104 104 0 0 0 34.48-2.97 20.79 20.79 0 0 1 5.15-.91c2.31 0 4.52.85 6.76 1.37 9.11 2.1 18.61-1.25 26.83-5.72 8.59-4.67 16.94-11.28 19.77-20.64 1.74-5.78 1.18-12 0-17.92-3.86-20.17-32.72-66.64-53.12-33.28z" fill="none"/><path d="m199.19 209c-2.91 0-5.84-.13-8.76-.37-4.62-.39-9.62-2.25-10.22-6.3a60.41 60.41 0 0 1 -38.71-9.62 19.14 19.14 0 0 1 -6.31-6c-2-3.45-2-7.67-1.81-11 .24-3.69.87-8.41 3.68-12.07 2.44-3.17 7.19-5.48 11.35-3.69a48.77 48.77 0 0 1 17.29-10.23c5-1.68 8.92-1.85 12.12-.53a9.19 9.19 0 0 1 5 5.16 6.7 6.7 0 0 1 .19 4.38 16.18 16.18 0 0 1 15.74 8 17.23 17.23 0 0 1 14.11-5.62c-1.63-3.61.29-8.19 3.38-10.5 3.27-2.44 7.44-3 11.2-3.19a24.6 24.6 0 0 1 2.56-19.6c5.57-9.1 12.17-13 19.62-11.7 7.21 1.3 15.13 7.8 22.3 18.3 5.91 8.64 10.69 19.17 12.18 26.84 1 5.11 1.89 11.78 0 18.17-2.41 8-9.14 15-20 20.93-10.46 5.69-19.34 7.57-27.18 5.76-.64-.14-1.27-.32-1.9-.49a18.17 18.17 0 0 0 -4.75-.86 18.72 18.72 0 0 0 -4.6.79l-.4.11a104.2 104.2 0 0 1 -26.08 3.33zm-18.53-7.72a.47.47 0 0 1 .32.12.5.5 0 0 1 .18.36c.2 3.76 5 5.5 9.35 5.87a102.81 102.81 0 0 0 34.41-2.9l.4-.11a19.78 19.78 0 0 1 4.85-.82 19.1 19.1 0 0 1 5 .9c.62.17 1.24.34 1.86.48 7.6 1.75 16.25-.1 26.48-5.67 10.63-5.78 17.2-12.63 19.53-20.34 1.45-4.82 1.46-10.27 0-17.69-2.65-13.62-17.83-41.49-33.68-44.34-7-1.26-13.25 2.52-18.59 11.23a23.61 23.61 0 0 0 -2.25 19.45.49.49 0 0 1 -.07.44.47.47 0 0 1 -.39.21c-3.77.14-8 .6-11.3 3-3 2.23-4.76 6.8-2.66 10a.49.49 0 0 1 -.49.77 16.12 16.12 0 0 0 -14.61 5.76.5.5 0 0 1 -.45.18.5.5 0 0 1 -.39-.28 15.06 15.06 0 0 0 -15.89-8 .51.51 0 0 1 -.49-.19.49.49 0 0 1 0-.52 5.51 5.51 0 0 0 .12-4.44 8.23 8.23 0 0 0 -4.42-4.59c-3-1.22-6.7-1-11.42.55a47.78 47.78 0 0 0 -17.17 10.25.5.5 0 0 1 -.56.08c-3.62-1.75-8.15.28-10.44 3.26-2.64 3.45-3.24 8-3.47 11.53-.21 3.15-.2 7.17 1.68 10.39a18.17 18.17 0 0 0 6 5.67 59.39 59.39 0 0 0 38.56 9.4z" fill="#231f20"/><path d="m250.29 150.05s-16.37 20.14-33.49 23.58l15.86 18.62s23.74-4.12 31.61-20.44z" fill="#6cbdb5"/><path d="m232.66 192.75a.46.46 0 0 1 -.38-.18l-15.86-18.57a.49.49 0 0 1 -.09-.49.5.5 0 0 1 .37-.33c16.75-3.37 33-23.21 33.2-23.41a.49.49 0 0 1 .41-.18.51.51 0 0 1 .4.23l14 21.76a.48.48 0 0 1 0 .49c-7.89 16.36-31.74 20.67-32 20.71zm-14.94-18.75 15.13 17.76c2.66-.53 23.52-5.11 30.85-19.86l-13.47-21c-2.69 3.1-17.23 19.51-32.51 23.1z" fill="#231f20"/><path d="m161.27 160.77c1.82 1 10.85 11.1 30 13l-9 18.13s-18.5-2.6-30.27-16.12z" fill="#6cbdb5"/><path d="m182.21 192.43h-.07c-.19 0-18.76-2.8-30.57-16.32a.51.51 0 0 1 0-.59l9.33-15a.5.5 0 0 1 .67-.17 13.08 13.08 0 0 1 1.47 1.13 50 50 0 0 0 28.26 11.82.52.52 0 0 1 .39.26.47.47 0 0 1 0 .46l-9 18.13a.51.51 0 0 1 -.48.28zm-29.64-16.71c10.67 12 26.78 15.21 29.36 15.66l8.56-17.16a50.93 50.93 0 0 1 -28.14-12l-.93-.76z" fill="#231f20"/><path d="m231.7 177.49c-4.4 4.84-3.11 17.78-3.11 17.78l4.2 4.52a15.79 15.79 0 1 0 21.21-23.39l-4.91-3.74s-13-.02-17.39 4.83z" fill="#231f20"/><path d="m243.38 204.39a16.18 16.18 0 0 1 -10.93-4.22l-4.23-4.56a.55.55 0 0 1 -.13-.29c-.05-.54-1.26-13.22 3.24-18.17 4.48-5 17.17-5 17.76-5a.54.54 0 0 1 .3.1l4.92 3.74a16.3 16.3 0 0 1 -10.12 28.37zm-14.31-9.34 4.08 4.41a15.3 15.3 0 0 0 20.52-22.69l-4.75-3.61c-1.51 0-12.92.33-16.85 4.66-3.94 4.34-3.07 15.72-3 17.23z" fill="#231f20"/><circle cx="240.42" cy="185.4" fill="#ffbc0e" r="15.79"/><path d="m240.41 201.7a16.31 16.31 0 1 1 .81 0zm0-31.59c-.25 0-.51 0-.76 0a15.22 15.22 0 1 0 .76 0z" fill="#231f20"/><path d="m185.31 159.29.18 6c0 4 7.5 7.32 16.84 7.42s16.94-3.07 17-7.07l-.18-6z" fill="#ffbc0e"/><path d="m202.76 173.18h-.44a32 32 0 0 1 -12.13-2.29c-3.37-1.49-5.22-3.49-5.19-5.64l-.19-5.95a.48.48 0 0 1 .14-.36.48.48 0 0 1 .36-.15l33.82.35a.5.5 0 0 1 .5.48l.18 6c-.04 4.27-7.5 7.56-17.05 7.56zm-16.94-13.39.18 5.45c0 1.72 1.65 3.44 4.6 4.73a30.7 30.7 0 0 0 11.73 2.21c8.92.11 16.45-2.92 16.48-6.58l-.17-5.47z" fill="#231f20"/><ellipse cx="202.22" cy="159.46" fill="#231f20" rx="7.25" ry="16.91" transform="matrix(.01029726 -.99994698 .99994698 .01029726 40.67 360.01)"/><path d="m202.56 167.21h-.42c-9.76-.11-17.38-3.59-17.33-7.93s7.72-7.67 17.49-7.56a31.83 31.83 0 0 1 12.13 2.28c3.37 1.49 5.22 3.49 5.2 5.64s-1.91 4.11-5.32 5.53a31.43 31.43 0 0 1 -11.75 2.04zm-.67-14.5c-8.72 0-16 3-16.08 6.58s7.44 6.82 16.34 6.92a30.7 30.7 0 0 0 11.78-2c3-1.24 4.68-2.92 4.7-4.62 0-1.7-1.66-3.41-4.6-4.71a30.61 30.61 0 0 0 -11.74-2.2z" fill="#231f20"/><path d="m161.68 190.19-1.58 6c-1.22 4 5.35 9.54 14.67 12.39s17.88 1.93 19.1-2.07l1.57-6z" fill="#231f20"/><path d="m185 210.78a36 36 0 0 1 -10.35-1.69c-9.74-3-16.33-8.69-15-13l1.56-6a.57.57 0 0 1 .24-.31.48.48 0 0 1 .39 0l33.75 10.22a.5.5 0 0 1 .33.6l-1.57 6c-.82 2.75-4.43 4.18-9.35 4.18zm-22.95-20-1.44 5.53c-1.13 3.68 5.44 9.07 14.33 11.79s17.35 1.92 18.47-1.74l1.45-5.55z" fill="#231f20"/><ellipse cx="178.56" cy="195.35" fill="#ffbc0e" rx="7.56" ry="17.65" transform="matrix(.2923717 -.95630476 .95630476 .2923717 -60.46 308.99)"/><path d="m186.56 204.75a36.17 36.17 0 0 1 -10.36-1.69c-9.73-3-16.32-8.7-15-13s10-5.38 19.72-2.4 16.32 8.69 15 13c-.82 2.66-4.43 4.09-9.36 4.09zm-16-17.77c-4.45 0-7.74 1.16-8.41 3.35-1.12 3.66 5.44 9 14.33 11.77s17.36 1.9 18.52-1.74c1.12-3.66-5.44-9.05-14.34-11.77a35.21 35.21 0 0 0 -10.09-1.59z" fill="#231f20"/><path d="m328.44 170.68 2.69 6.28-58.5-11.52 16.06-19.94 47.88 15.06z" fill="#231f20"/><path d="m331.13 177.46h-.13l-58.51-11.52a.52.52 0 0 1 -.37-.32.51.51 0 0 1 .08-.49l16.06-19.93a.5.5 0 0 1 .54-.16l47.88 15.05a.51.51 0 0 1 .33.34.52.52 0 0 1 -.09.45l-7.92 9.87 2.58 6a.5.5 0 0 1 -.07.51.51.51 0 0 1 -.38.2zm-57.59-12.36 56.76 11.19-2.3-5.42a.52.52 0 0 1 .07-.51l7.68-9.54-46.86-14.74z" fill="#231f20"/><path d="m233 86.84s-8.62-25.92-.2-35.3c13.57 2.37 29.74 29.66 29.74 29.66s-6.19 18.91-29.54 5.64z" fill="#231f20"/><path d="m247.92 92.07c-4.46 0-9.53-1.6-15.13-4.79a.49.49 0 0 1 -.23-.28c-.36-1.07-8.62-26.31-.1-35.8a.53.53 0 0 1 .45-.16c13.65 2.39 29.43 28.78 30.09 29.9a.46.46 0 0 1 .05.41 16.72 16.72 0 0 1 -9.28 9.65 16.16 16.16 0 0 1 -5.85 1.07zm-14.47-5.56c7.88 4.44 14.59 5.65 20 3.58a15.9 15.9 0 0 0 8.55-8.84c-1.5-2.47-16.48-26.67-29-29.17-7.45 8.83-.28 32.13.45 34.43z" fill="#231f20"/><path d="m207.63 94.74s26.05-17.38 51-21.84 41.37 15.65 55.89 13.29l18.22 35.52a36.19 36.19 0 0 0 -11.39 22.29c-1.52 14-20.88 43.09-57.25 58.69l-2.88-15.69-15.35-6.74 6.06-17.59-18-6.55 6-13.43-24.33-4 15.4-20.69-23.73-11z" fill="#6cbdb5"/><path d="m264.1 203.16a.46.46 0 0 1 -.23-.06.49.49 0 0 1 -.26-.35l-2.83-15.37-15.11-6.64a.49.49 0 0 1 -.27-.62l5.9-17.12-17.49-6.38a.48.48 0 0 1 -.29-.27.55.55 0 0 1 0-.4l5.69-12.84-23.69-3.94a.49.49 0 0 1 -.38-.3.53.53 0 0 1 .06-.49l15.05-20.16-23.19-10.8a.5.5 0 0 1 -.29-.47l.35-12.21a.51.51 0 0 1 .23-.4c.26-.18 26.43-17.5 51.18-21.92 14.39-2.57 25.82 2.86 35.91 7.66 7.47 3.55 13.92 6.61 20 5.63a.49.49 0 0 1 .56.29l18.22 35.52a.5.5 0 0 1 -.12.62 35.94 35.94 0 0 0 -11.25 21.86c-1.58 14.55-21 43.4-57.55 59.1a.45.45 0 0 1 -.2.06zm-17.61-23.16 14.94 6.56a.49.49 0 0 1 .29.36l2.76 15c22.24-9.74 53.89-35.07 56.38-58a37.06 37.06 0 0 1 11.26-22.32l-17.88-34.86c-6.24.86-12.76-2.22-20.24-5.74-9.95-4.73-21.23-10.09-35.3-7.58-23.37 4.18-48 20-50.59 21.63l-.34 11.62 23.45 10.92a.5.5 0 0 1 .27.33.48.48 0 0 1 -.08.42l-14.92 20 23.51 3.88a.52.52 0 0 1 .36.25.49.49 0 0 1 0 .44l-5.72 13 17.45 6.36a.5.5 0 0 1 .3.63z" fill="#231f20"/><path d="m324.78 124a7.85 7.85 0 0 0 2.4 2.62c2.09 1.2 4.71.31 6.94-.59a6.55 6.55 0 0 0 2.73-1.7c1.24-1.52.87-3.75.38-5.65-2-7.5-12.07-39.06-23.33-35.63-12.64 3.8 6.95 34.95 10.88 40.95z" fill="#6cbdb5"/><path d="m329.49 127.65a5 5 0 0 1 -2.56-.65 8 8 0 0 1 -2.56-2.77c-3.06-4.64-18.12-28.27-14.64-37.93a5.9 5.9 0 0 1 4-3.78 6.91 6.91 0 0 1 5.51.75c10.52 5.89 18.36 34.94 18.44 35.23.54 2.07.91 4.41-.47 6.1a7 7 0 0 1 -2.94 1.84 13.37 13.37 0 0 1 -4.78 1.21zm-13.88-44.4a5.17 5.17 0 0 0 -1.56.23 4.86 4.86 0 0 0 -3.38 3.16c-3.39 9.41 12.69 34.24 14.53 37a7.34 7.34 0 0 0 2.23 2.46c1.9 1.09 4.35.25 6.5-.63a6.13 6.13 0 0 0 2.54-1.54c1.09-1.35.75-3.39.27-5.21-1.95-7.47-9.43-29.85-18-34.61a6.46 6.46 0 0 0 -3.13-.86z" fill="#231f20"/><path d="m246.44 92.91s-.12-36.29 4.39-40.85c7.4.22 13.09 8.28 18.49 17.82s5.77 14 5.77 14" fill="#6cbdb5"/><path d="m246.44 93.41a.5.5 0 0 1 -.5-.5c0-1.49-.07-36.55 4.54-41.2a.5.5 0 0 1 .37-.15c7.75.23 13.67 8.82 18.91 18.07 5.39 9.53 5.81 14 5.82 14.2a.5.5 0 1 1 -1 .08s-.44-4.49-5.7-13.78c-5-8.91-10.69-17.18-17.84-17.56-3.34 4-4.15 28-4.11 40.34a.5.5 0 0 1 -.5.5z" fill="#231f20"/><path d="m253 86.44s-1.19-28.92.84-28.67 12.83 17 13.06 21.85-8.72 8.45-13.9 6.82z" fill="#231f20"/><path d="m255.85 87.33a10 10 0 0 1 -3-.41.52.52 0 0 1 -.35-.46c-.19-4.54-1-27.3.8-29a.79.79 0 0 1 .6-.2c2.68.32 13.29 17.85 13.5 22.33.08 1.72-.85 3.38-2.7 4.81a15.4 15.4 0 0 1 -8.85 2.93zm-2.32-1.27c3.09.8 7.75-.25 10.59-2.44 1.11-.85 2.4-2.23 2.32-4-.23-4.77-10.44-20.25-12.44-21.31-1 1.69-1 15.15-.47 27.75z" fill="#231f20"/><path d="m291.87 101.4a.51.51 0 0 1 -.36-.15.51.51 0 0 1 0-.71l8.13-7.81a.5.5 0 1 1 .69.72l-8.12 7.81a.52.52 0 0 1 -.34.14z" fill="#231f20"/><path d="m300.75 101.66a.54.54 0 0 1 -.35-.14l-8.64-8.3a.5.5 0 0 1 .69-.72l8.65 8.3a.49.49 0 0 1 0 .7.48.48 0 0 1 -.35.16z" fill="#231f20"/><path d="m290.02 164.52 34.44 21-10.85 16.79-43.83-20.77" fill="#6cbdb5"/><g fill="#231f20"><path d="m313.61 202.82a.59.59 0 0 1 -.22 0l-43.83-20.82a.5.5 0 0 1 -.23-.67.49.49 0 0 1 .66-.23l43.44 20.59 10.34-16-34-20.73a.5.5 0 0 1 .52-.86l34.44 21a.48.48 0 0 1 .23.32.47.47 0 0 1 -.07.38l-10.89 16.79a.53.53 0 0 1 -.39.23z"/><path d="m310.5 147.88a3.37 3.37 0 0 0 .74 2.64 2.28 2.28 0 0 0 2.65 0 5.55 5.55 0 0 0 1.79-2.16c1.39-2.59 5.09-12 .13-13-4.81-.98-5.28 9.64-5.31 12.52z"/><path d="m312.51 151.47a2.34 2.34 0 0 1 -1.6-.58 3.75 3.75 0 0 1 -.91-3c0-3 .43-10.1 3.24-12.34a3.07 3.07 0 0 1 2.68-.63 3.28 3.28 0 0 1 2.42 1.9c1.6 3.43-1.35 10.21-2.22 11.84a6.13 6.13 0 0 1 -2 2.36 3.2 3.2 0 0 1 -1.61.45zm-1.51-3.59a3 3 0 0 0 .58 2.26 1.81 1.81 0 0 0 2.05 0 5.15 5.15 0 0 0 1.6-2c1.23-2.28 3.49-8.2 2.21-10.95a2.3 2.3 0 0 0 -1.73-1.34 2.08 2.08 0 0 0 -1.85.43c-2 1.62-2.8 7-2.86 11.57z"/><path d="m324.46 185.52-10.85 16.79 10.21 5.28.62-10.43 9.82-4.82z"/><path d="m323.82 208.09a.59.59 0 0 1 -.23-.05l-10.21-5.28a.49.49 0 0 1 -.19-.72l10.81-16.79a.51.51 0 0 1 .71-.14l9.8 6.82a.53.53 0 0 1 .21.45.49.49 0 0 1 -.28.41l-9.56 4.69-.6 10.14a.51.51 0 0 1 -.25.41.54.54 0 0 1 -.21.06zm-9.49-6 9 4.68.57-9.68a.53.53 0 0 1 .28-.41l9.06-4.44-8.68-6.05z"/><path d="m113.39 139.9-38.83 29.07-9.43 6.57 8.94 5.42-.33 10.93 10.61-5.48 34.65-20.66z"/><path d="m73.74 192.39a.53.53 0 0 1 -.27-.08.5.5 0 0 1 -.23-.44l.32-10.63-8.69-5.24a.51.51 0 0 1 0-.84l9.43-6.57 38.82-29.06a.52.52 0 0 1 .48-.07.53.53 0 0 1 .31.36l5.6 25.85a.48.48 0 0 1 -.23.53l-34.67 20.64-10.61 5.49a.46.46 0 0 1 -.26.06zm-7.74-16.88 8.29 5a.51.51 0 0 1 .24.44l-.3 10.09 9.85-5.1 34.31-20.46-5.36-24.73-38.21 28.6z"/></g><path d="m182.12 92.59s-41.52-20.66-71.74 1.59c-26.62 19.6-33.88 57.57-20.39 86s83.15 30.77 83.15 30.77l-6.09-11.31 15.88-19.64-21.4-15.23 21.06-7.2-16-18.67 8-11.39-11.13-11.8 11.87-5-7.56-11.83z" fill="#6cbdb5"/><path d="m173.14 211.43a234.46 234.46 0 0 1 -36.6-4.74c-25.51-5.53-41.31-14.39-47-26.32a72.38 72.38 0 0 1 -4.88-46.61c3.65-16.41 12.68-30.6 25.42-40 30.13-22.18 71.84-1.85 72.26-1.64a.53.53 0 0 1 .28.46.54.54 0 0 1 -.3.45l-13.82 6.08 7.24 11.33a.51.51 0 0 1 -.23.73l-11.2 4.68 10.69 11.28a.5.5 0 0 1 0 .63l-7.76 11.07 15.76 18.37a.49.49 0 0 1 -.21.8l-20.15 6.89 20.61 14.66a.51.51 0 0 1 .1.72l-15.67 19.4 5.93 11a.5.5 0 0 1 0 .5.52.52 0 0 1 -.47.26zm-29.21-127c-11 0-22.84 2.49-33.25 10.16-25.25 18.59-34.14 56.09-20.24 85.36 12.4 26.11 73.76 30 81.84 30.45l-5.67-10.54a.52.52 0 0 1 0-.55l15.55-19.24-21-14.92a.49.49 0 0 1 -.21-.48.54.54 0 0 1 .33-.41l20.38-7-15.52-18.1a.5.5 0 0 1 0-.61l7.75-11.06-10.81-11.49a.49.49 0 0 1 -.12-.45.47.47 0 0 1 .29-.35l11.33-4.73-7.24-11.33a.49.49 0 0 1 -.06-.41.51.51 0 0 1 .28-.31l13.34-5.86c-3.98-1.77-19.39-8.14-36.97-8.14z" fill="#231f20"/><path d="m76.58 124.2a4.84 4.84 0 0 1 -3.58-1.64 6 6 0 0 1 -.6-6.44 7.2 7.2 0 0 1 1.23-1.75 13 13 0 0 0 -7.07.89c-1 .44-3.41 1.7-3.71 4a.49.49 0 0 1 -.56.43.5.5 0 0 1 -.43-.56c.37-2.76 3.14-4.24 4.31-4.74a14 14 0 0 1 8.15-.88h.24a9.84 9.84 0 0 1 2.77-1.51c6.42-2.25 13.12 1.73 16.64 6.38a.51.51 0 0 1 -.09.7.52.52 0 0 1 -.71-.1c-3.3-4.37-9.56-8.12-15.51-6a9.17 9.17 0 0 0 -1.91.94 7.86 7.86 0 0 1 4.14 3c1.19 1.84 1.29 4.82-.63 6.42a4.13 4.13 0 0 1 -2.68.86zm-1.82-9.59a6.73 6.73 0 0 0 -1.52 2 5 5 0 0 0 .47 5.34 3.67 3.67 0 0 0 4.9.6c1.46-1.22 1.41-3.63.44-5.11a7.28 7.28 0 0 0 -4.29-2.83z" fill="#231f20"/><path d="m127.59 188.05-33.05 23.13-11.03-16.68 36.61-31.82" fill="#6cbdb5"/><path d="m94.54 211.68h-.09a.47.47 0 0 1 -.32-.21l-11-16.69a.49.49 0 0 1 .09-.65l36.61-31.82a.5.5 0 0 1 .66.76l-36.32 31.52 10.51 15.89 32.62-22.84a.5.5 0 0 1 .7.12.51.51 0 0 1 -.12.7l-33 23.13a.48.48 0 0 1 -.34.09z" fill="#231f20"/><path d="m94.54 211.18-11.03-16.68-8.93 7.24 9.31 4.75.47 10.93z" fill="#231f20"/><path d="m84.36 217.92a.53.53 0 0 1 -.24-.06.51.51 0 0 1 -.26-.42l-.46-10.63-9.05-4.63a.49.49 0 0 1 -.27-.39.5.5 0 0 1 .18-.44l8.94-7.24a.49.49 0 0 1 .73.11l11.07 16.68a.5.5 0 0 1 .07.39.53.53 0 0 1 -.23.32l-10.18 6.23a.5.5 0 0 1 -.3.08zm-8.87-16.28 8.63 4.41a.49.49 0 0 1 .27.42l.43 10.08 9-5.53-10.42-15.79z" fill="#231f20"/><path d="m224.83 204.71c1.23-2.17-13.93-11.45-13.93-11.45s-18 23.17-35.86 28.61l16.3 16.43s22.1-13.3 33.49-33.59z" fill="#6cbdb5"/><path d="m191.34 238.8a.52.52 0 0 1 -.35-.14l-16.3-16.44a.5.5 0 0 1 -.13-.47.5.5 0 0 1 .34-.36c17.5-5.33 35.43-28.21 35.61-28.44a.51.51 0 0 1 .66-.12c14 8.61 14.54 11.35 14.1 12.13-11.33 20.15-33.44 33.64-33.67 33.77a.48.48 0 0 1 -.26.07zm-15.34-16.7 15.44 15.57c2.8-1.76 22.54-14.63 33-33.2.4-.71-4.14-4.86-13.38-10.55-2.36 2.89-18.75 22.73-35.06 28.18z" fill="#231f20"/><path d="m255.47 211.35-15.92 4.05-.19 6.53 23.28 5.86z" fill="#6cbdb5"/><path d="m262.64 228.29h-.12l-23.28-5.86a.5.5 0 0 1 -.38-.5l.19-6.53a.51.51 0 0 1 .38-.47l15.92-4a.5.5 0 0 1 .58.29l7.17 16.44a.47.47 0 0 1 -.08.52.46.46 0 0 1 -.38.11zm-22.77-6.75 21.91 5.52-6.6-15.12-15.18 3.85z" fill="#231f20"/><path d="m169.18 219.88-18.55 1.16-.28 9.63 18.68-5.6z" fill="#6cbdb5"/><path d="m150.35 231.17a.49.49 0 0 1 -.5-.51l.28-9.63a.51.51 0 0 1 .47-.49l18.55-1.15a.52.52 0 0 1 .38.14.5.5 0 0 1 .15.37l-.15 5.18a.49.49 0 0 1 -.36.46l-18.68 5.61zm.77-9.66-.25 8.48 17.67-5.3.12-4.27z" fill="#231f20"/><path d="m208.78 205.51-1.26 5.36c-1 3.54 4.92 8.3 13.2 10.61s15.8 1.32 16.79-2.22l1.26-5.36z" fill="#231f20"/><path d="m229.19 223.24a32.82 32.82 0 0 1 -8.61-1.27c-8.67-2.43-14.62-7.37-13.54-11.24l1.26-5.33a.5.5 0 0 1 .23-.32.49.49 0 0 1 .39-.05l30 8.39a.51.51 0 0 1 .36.6l-1.28 5.35c-.55 1.94-2.7 3.25-6.09 3.7a21.35 21.35 0 0 1 -2.72.17zm-20-17.11-1.19 4.87c-.91 3.24 5 7.82 12.84 10a28 28 0 0 0 10.93 1.07c2.92-.38 4.83-1.46 5.25-2.95l1.14-4.86z" fill="#231f20"/><ellipse cx="223.78" cy="209.71" fill="#ffbc0e" rx="6.67" ry="15.57" transform="matrix(.26942409 -.96302163 .96302163 .26942409 -38.47 368.7)"/><path d="m230.45 217.88a32.41 32.41 0 0 1 -8.61-1.27 29.15 29.15 0 0 1 -10.25-4.94c-2.66-2.14-3.83-4.37-3.29-6.29s2.7-3.23 6.08-3.68a32.47 32.47 0 0 1 21.58 6c2.66 2.14 3.83 4.38 3.29 6.3-.54 1.92-2.69 3.22-6.08 3.67a19.66 19.66 0 0 1 -2.72.21zm-13.34-15.35a21.48 21.48 0 0 0 -2.6.16c-2.92.39-4.83 1.47-5.25 3s.66 3.4 3 5.24a31.44 31.44 0 0 0 20.74 5.79c2.92-.39 4.83-1.46 5.25-2.95.42-1.49-.66-3.4-2.95-5.25a28.36 28.36 0 0 0 -9.9-4.75 31.22 31.22 0 0 0 -8.29-1.24z" fill="#231f20"/><path d="m161.62 232.32.52 5.47c.19 3.68 7.3 6.3 15.89 5.86s15.39-3.79 15.2-7.47l-.51-5.47z" fill="#231f20"/><path d="m176.1 244.2c-8.07 0-14.27-2.66-14.46-6.38l-.52-5.46a.5.5 0 0 1 .12-.37.53.53 0 0 1 .36-.17l31.09-1.61a.5.5 0 0 1 .53.45l.51 5.48c.1 2-1.52 3.93-4.59 5.44a29.35 29.35 0 0 1 -11.09 2.57c-.66.03-1.31.05-1.95.05zm-13.93-11.41.46 5c.18 3.36 7.21 5.82 15.37 5.4a28.29 28.29 0 0 0 10.7-2.47c2.64-1.3 4.11-2.93 4-4.47l-.46-5z" fill="#231f20"/><ellipse cx="177.17" cy="231.51" fill="#ffbc0e" rx="15.57" ry="6.67" transform="matrix(.99866583 -.05163877 .05163877 .99866583 -11.73 9.47)"/><path d="m175.59 238.73c-8.07 0-14.27-2.67-14.47-6.39-.1-2 1.53-3.91 4.59-5.42a29.35 29.35 0 0 1 11.09-2.57c9-.46 16.21 2.32 16.42 6.33.1 2-1.53 3.92-4.59 5.42a29.16 29.16 0 0 1 -11.09 2.57q-.99.06-1.95.06zm3.08-13.43c-.6 0-1.21 0-1.82 0a28.29 28.29 0 0 0 -10.7 2.47c-2.64 1.3-4.11 2.93-4 4.47.17 3.34 7.21 5.81 15.37 5.39a28.48 28.48 0 0 0 10.7-2.47c2.64-1.3 4.11-2.93 4-4.48-.16-3.04-6.22-5.38-13.55-5.38z" fill="#231f20"/><path d="m189.15 147.35-.2 6c-.31 4 7 7.83 16.37 8.54s17.16-2 17.47-6l.2-6z" fill="#ffbc0e"/><path d="m208.31 162.49c-1 0-2 0-3-.11a32 32 0 0 1 -12-3.09c-3.28-1.71-5-3.84-4.83-6l.2-6a.53.53 0 0 1 .17-.36.45.45 0 0 1 .37-.12l33.78 2.62a.49.49 0 0 1 .46.51l-.2 6c-.17 2.17-2.19 4-5.69 5.21a29.38 29.38 0 0 1 -9.26 1.34zm-18.67-14.6-.19 5.47c-.13 1.72 1.43 3.55 4.3 5a34.34 34.34 0 0 0 23.53 1.79c3.05-1 4.88-2.61 5-4.31l.19-5.49z" fill="#231f20"/><ellipse cx="206.07" cy="148.64" fill="#ffbc0e" rx="7.27" ry="16.97" transform="matrix(.07567488 -.99713255 .99713255 .07567488 42.25 342.86)"/><path d="m208.56 156.5c-1 0-2 0-3.08-.11-9.76-.75-17.15-4.73-16.83-9.07s8.25-7.17 18-6.43 17.16 4.73 16.83 9.07c-.28 3.88-6.62 6.54-14.92 6.54zm-4.85-14.72c-7.64 0-13.81 2.35-14.06 5.61-.28 3.66 7 7.32 15.91 8s16.66-1.84 16.93-5.5c.28-3.66-7-7.33-15.91-8-.97-.08-1.93-.11-2.87-.11z" fill="#231f20"/><path d="m191.6 187.47h-.13a.5.5 0 0 1 -.35-.61 7.19 7.19 0 0 1 3.46-4.21 15.69 15.69 0 0 1 5.08-1.67 20.56 20.56 0 0 1 7.67-.21 10.56 10.56 0 0 1 6.62 4 .51.51 0 0 1 -.12.7.52.52 0 0 1 -.7-.12 9.45 9.45 0 0 0 -6-3.58 19.45 19.45 0 0 0 -7.3.21 14.71 14.71 0 0 0 -4.76 1.54 6.19 6.19 0 0 0 -3 3.61.5.5 0 0 1 -.47.34z" fill="#231f20"/><path d="m225.15 158.54a.5.5 0 0 1 -.48-.52 15.47 15.47 0 0 1 6.65-12.02 2.59 2.59 0 0 1 2.49-.49.5.5 0 1 1 -.44.9c-.33-.16-.84 0-1.49.42a14.4 14.4 0 0 0 -6.23 11.27.5.5 0 0 1 -.5.44z" fill="#231f20"/><path d="m220.53 234.46-10.74-2.06-14.08 8.75 13.86 7.31z" fill="#6cbdb5"/><path d="m209.57 249a.46.46 0 0 1 -.23-.06l-13.86-7.31a.51.51 0 0 1 -.27-.42.54.54 0 0 1 .24-.45l14.08-8.76a.49.49 0 0 1 .36-.07l10.74 2.07a.51.51 0 0 1 .3.8l-11 14a.5.5 0 0 1 -.36.2zm-12.85-7.85 12.72 6.72 10.19-13-9.74-1.87z" fill="#231f20"/><path d="m245.63 234.08a6.2 6.2 0 0 0 -8.49-1.11 18.78 18.78 0 0 1 3 4.51c.62 1.49 1.27 3.47 2.88 3.5s3.63-.23 5-1.28 2-3.37.72-4.56c-.93-.85-2.39-.8-3.43-1.52" fill="#6cbdb5"/><path d="m243.08 241.47c-1.83 0-2.59-1.89-3.2-3.38l-.17-.41a18.41 18.41 0 0 0 -3-4.39.54.54 0 0 1 -.11-.37.53.53 0 0 1 .19-.34 6.41 6.41 0 0 1 4.84-1.25 6.53 6.53 0 0 1 3.79 1.8.5.5 0 0 1 .2.08 5.19 5.19 0 0 0 1.46.59 4.89 4.89 0 0 1 2 1 2.82 2.82 0 0 1 .87 2.29 4.2 4.2 0 0 1 -1.63 3c-1.51 1.19-3.58 1.3-5.24 1.38zm-5.21-8.4a17.37 17.37 0 0 1 2.76 4.22l.17.42c.53 1.29 1.13 2.75 2.26 2.77 1.49-.08 3.4-.18 4.74-1.18a3.15 3.15 0 0 0 1.2-2.3 1.85 1.85 0 0 0 -.55-1.5 4.2 4.2 0 0 0 -1.64-.74c-.29-.09-.59-.18-.88-.29a.5.5 0 0 1 -.7-.1 5.47 5.47 0 0 0 -3.69-2.06 5.58 5.58 0 0 0 -3.67.76z" fill="#231f20"/></svg>`;
          } else {
              piggyBankDiv.innerHTML = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><path d="m184.79 136.7c5.42 7.63 5.75 21.19-1.88 26.61s-20.33.64-25.75-7-10.69-26.45-4.36-31.71 26.57 4.47 31.99 12.1z" fill="#6cbdb5"/><path d="m175.09 166.64a20.91 20.91 0 0 1 -6.17-1 24.59 24.59 0 0 1 -12.57-8.76c-2.89-4.08-5.55-10.8-6.76-17.13-.84-4.45-1.64-12.43 2.57-15.93 1.82-1.51 4.6-2 8.27-1.56 8.69 1.14 20.93 7.86 25.17 13.84a24.56 24.56 0 0 1 4.14 14.75c-.22 5.85-2.45 10.55-6.25 13.26a14.3 14.3 0 0 1 -8.4 2.53zm-17.09-42.53a7 7 0 0 0 -4.53 1.27c-2.5 2.07-3.18 7.18-1.88 14 1.14 6 3.72 12.55 6.42 16.35a22.54 22.54 0 0 0 11.52 8c5 1.53 9.54 1.08 12.83-1.25s5.21-6.5 5.41-11.7a22.54 22.54 0 0 0 -3.77-13.5c-3.91-5.51-15.7-12-23.8-13a15.72 15.72 0 0 0 -2.2-.17z" fill="#093f68"/><path d="m216.88 136.7c-5.42 7.63-5.75 21.19 1.88 26.61s20.32.64 25.74-7 10.7-26.45 4.37-31.71-26.58 4.47-31.99 12.1z" fill="#6cbdb5"/><path d="m226.57 166.64a14.27 14.27 0 0 1 -8.39-2.51c-3.81-2.71-6-7.41-6.26-13.26a24.69 24.69 0 0 1 4.14-14.75c4.25-6 16.48-12.7 25.18-13.84 3.67-.48 6.45 0 8.27 1.56 4.2 3.5 3.41 11.48 2.56 15.93-1.21 6.33-3.86 13-6.75 17.13a24.67 24.67 0 0 1 -12.57 8.76 21 21 0 0 1 -6.18.98zm-8.88-29.36a22.61 22.61 0 0 0 -3.77 13.52c.2 5.2 2.13 9.36 5.42 11.7s7.84 2.78 12.83 1.25a22.58 22.58 0 0 0 11.52-8c2.69-3.8 5.28-10.37 6.42-16.35 1.3-6.83.62-11.94-1.88-14-1.35-1.13-3.68-1.51-6.74-1.11-8.09 1-19.88 7.5-23.8 13z" fill="#093f68"/><path d="m245.2 225.47c.7 2.92-2.2 5.61-6 5.61h-7.7a6.34 6.34 0 0 1 -5.7-3l-3.8-7.15a50.26 50.26 0 0 1 -42.4 0l-3.74 7.18a6.34 6.34 0 0 1 -5.7 3h-7.7c-3.83 0-6.73-2.69-6-5.61l4.63-19.4a50.15 50.15 0 0 1 37.77-80.71h2s1.32 0 2 0a50.15 50.15 0 0 1 37.77 80.71z" fill="#6cbdb5"/><path d="m239.17 232.08h-7.7a7.31 7.31 0 0 1 -6.58-3.5l-3.31-6.34a51.34 51.34 0 0 1 -41.5 0l-3.3 6.33a7.31 7.31 0 0 1 -6.59 3.51h-7.7a7.61 7.61 0 0 1 -6-2.66 4.82 4.82 0 0 1 -1-4.18l4.51-18.94a51.14 51.14 0 0 1 38.82-81.94 33.86 33.86 0 0 1 4 0 51.16 51.16 0 0 1 38.8 81.94l4.52 18.94a4.85 4.85 0 0 1 -1 4.18 7.63 7.63 0 0 1 -5.97 2.66zm-17.17-12.15a1 1 0 0 1 .89.54l3.74 7.18a5.41 5.41 0 0 0 4.81 2.43h7.7a5.72 5.72 0 0 0 4.46-1.9 2.84 2.84 0 0 0 .6-2.47l-4.63-19.4a1 1 0 0 1 .18-.84 49.15 49.15 0 0 0 -37-79.1 30.75 30.75 0 0 0 -3.84 0 49.15 49.15 0 0 0 -37 79.1 1 1 0 0 1 .19.84l-4.63 19.4a2.82 2.82 0 0 0 .6 2.48 5.71 5.71 0 0 0 4.45 1.9h7.7a5.42 5.42 0 0 0 4.82-2.43l3.74-7.18a1 1 0 0 1 1.31-.44 49.31 49.31 0 0 0 41.55 0 .92.92 0 0 1 .36-.11z" fill="#093f68"/><ellipse cx="200.83" cy="175.09" fill="#6cbdb5" rx="20.9" ry="11.38"/><path d="m200.83 187.46c-12.28 0-21.9-5.43-21.9-12.37s9.62-12.38 21.9-12.38 21.9 5.43 21.9 12.38-9.62 12.37-21.9 12.37zm0-22.75c-10.78 0-19.9 4.75-19.9 10.38s9.12 10.37 19.9 10.37 19.9-4.75 19.9-10.37-9.11-10.38-19.9-10.38z" fill="#093f68"/><path d="m179.58 221.93a1 1 0 0 1 -.49-.13c-.41-.23-4-2.32-5.08-4.39a1 1 0 0 1 .45-1.34 1 1 0 0 1 1.34.44c.58 1.15 2.93 2.79 4.27 3.55a1 1 0 0 1 .38 1.36 1 1 0 0 1 -.87.51z" fill="#6cbdb5"/><path d="m222.09 221.93a1 1 0 0 1 -.5-1.87c1.35-.76 3.7-2.4 4.28-3.55a1 1 0 0 1 1.34-.44 1 1 0 0 1 .45 1.34c-1 2.07-4.67 4.16-5.08 4.39a1 1 0 0 1 -.49.13z" fill="#6cbdb5"/><circle cx="193.61" cy="175.09" fill="#093f68" r="4.59"/><circle cx="208.06" cy="175.09" fill="#093f68" r="4.59"/><path d="m189.54 158a1 1 0 0 1 -1-1 7.06 7.06 0 0 0 -14.12 0 1 1 0 0 1 -2 0 9.06 9.06 0 0 1 18.12 0 1 1 0 0 1 -1 1z" fill="#093f68"/><path d="m228.25 158a1 1 0 0 1 -1-1 7.06 7.06 0 1 0 -14.12 0 1 1 0 1 1 -2 0 9.06 9.06 0 1 1 18.12 0 1 1 0 0 1 -1 1z" fill="#093f68"/><path d="m202.8 125.36v11.49h-3.94v-11.49h2s1.29-.04 1.94 0z" fill="#093f68"/><path d="m202.8 137.85h-3.94a1 1 0 0 1 -1-1v-11.49a1 1 0 0 1 .94-1 34.37 34.37 0 0 1 4.06 0 1 1 0 0 1 .94 1v11.49a1 1 0 0 1 -1 1zm-2.94-2h1.94v-9.53h-1.94z" fill="#093f68"/><path d="m202.17 98.27h-1.92v21h1.92a10.52 10.52 0 0 0 0-21z" fill="#ffbc0e"/><path d="m202.17 120.3h-1.92a1 1 0 0 1 -1-1v-21a1 1 0 0 1 1-1h1.92a11.52 11.52 0 0 1 0 23zm-.92-2h.92a9.52 9.52 0 0 0 0-19h-.92z" fill="#093f68"/><circle cx="199.49" cy="108.78" fill="#ffbc0e" r="10.51"/><path d="m199.49 120.3a11.52 11.52 0 1 1 11.51-11.52 11.53 11.53 0 0 1 -11.51 11.52zm0-21a9.52 9.52 0 1 0 9.52 9.51 9.53 9.53 0 0 0 -9.52-9.54z" fill="#093f68"/><path d="m216.66 62.92h-1.93v21h1.93a10.51 10.51 0 0 0 0-21z" fill="#ffbc0e"/><path d="m216.66 84.94h-1.93a1 1 0 0 1 -1-1v-21a1 1 0 0 1 1-1h1.93a11.51 11.51 0 0 1 0 23zm-.93-2h.93a9.51 9.51 0 0 0 0-19h-.93z" fill="#093f68"/><circle cx="213.98" cy="73.43" fill="#ffbc0e" r="10.51"/><path d="m214 84.94a11.51 11.51 0 1 1 11.51-11.51 11.52 11.52 0 0 1 -11.51 11.51zm0-21a9.51 9.51 0 1 0 9.51 9.51 9.52 9.52 0 0 0 -9.51-9.53z" fill="#093f68"/><path d="m181.27 73.92-1.54 1.15 12.59 16.84 1.54-1.15a10.51 10.51 0 0 0 -12.59-16.84z" fill="#ffbc0e"/><path d="m192.32 92.91a1 1 0 0 1 -.8-.4l-12.59-16.84a1 1 0 0 1 .2-1.4l1.54-1.15a11.51 11.51 0 1 1 13.79 18.44l-1.54 1.15a1 1 0 0 1 -.6.2zm-11.19-17.64 11.39 15.24.74-.55a9.51 9.51 0 0 0 -11.39-15.24z" fill="#093f68"/><circle cx="185.42" cy="83.94" fill="#ffbc0e" r="10.51"/><path d="m185.44 95.46a11.83 11.83 0 0 1 -1.67-.12 11.51 11.51 0 1 1 10.87-18.29 11.52 11.52 0 0 1 -2.33 16.11 11.38 11.38 0 0 1 -6.87 2.3zm0-21a9.51 9.51 0 1 0 7.56 3.79 9.43 9.43 0 0 0 -6.26-3.72 9.15 9.15 0 0 0 -1.34-.1z" fill="#093f68"/><path d="m169.34 132.08a1 1 0 0 1 -.75-.33c-4-4.45-11.36-3.4-11.43-3.39a1 1 0 1 1 -.3-2c.35 0 8.53-1.23 13.22 4a1 1 0 0 1 -.74 1.66z" fill="#093f68"/><path d="m232.33 132.08a1 1 0 0 1 -.79-.38 1 1 0 0 1 .17-1.4c7.53-6 12.9-4.08 13.12-4a1 1 0 0 1 -.68 1.88c-.21-.07-4.63-1.5-11.2 3.69a1 1 0 0 1 -.62.21z" fill="#093f68"/><path d="m179.58 187.53s1.56 7.7 9.44 6.67" fill="#68e1fd"/><path d="m187.62 195.29c-5.88 0-8.46-4.81-9-7.56a1 1 0 0 1 2-.4c.06.28 1.47 6.77 8.33 5.87a1 1 0 0 1 .26 2 11.89 11.89 0 0 1 -1.59.09z" fill="#093f68"/><path d="m179.93 183.45s1.45 2.39-2.69 4.92" fill="#68e1fd"/><path d="m177.24 189.37a1 1 0 0 1 -.85-.47 1 1 0 0 1 .33-1.38c3.16-1.94 2.38-3.51 2.34-3.58a1 1 0 0 1 .39-1.35 1 1 0 0 1 1.34.34s1.9 3.28-3 6.3a1 1 0 0 1 -.55.14z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="252.77" y="222.91"/><path d="m276.64 232.08h-22a2.81 2.81 0 0 1 -2.82-2.81v-4.54a2.82 2.82 0 0 1 2.82-2.82h22a2.81 2.81 0 0 1 2.81 2.82v4.54a2.81 2.81 0 0 1 -2.81 2.81zm-22-8.17a.82.82 0 0 0 -.82.82v4.54a.82.82 0 0 0 .82.81h22a.81.81 0 0 0 .81-.81v-4.54a.82.82 0 0 0 -.81-.82z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="255.59" y="214.42"/><path d="m279.46 223.59h-22a2.82 2.82 0 0 1 -2.82-2.82v-4.54a2.82 2.82 0 0 1 2.82-2.81h22a2.81 2.81 0 0 1 2.81 2.81v4.54a2.81 2.81 0 0 1 -2.81 2.82zm-22-8.17a.82.82 0 0 0 -.82.81v4.54a.82.82 0 0 0 .82.82h22a.82.82 0 0 0 .81-.82v-4.54a.81.81 0 0 0 -.81-.81z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="249.66" y="206.25"/><path d="m273.53 215.42h-22a2.82 2.82 0 0 1 -2.82-2.82v-4.54a2.81 2.81 0 0 1 2.82-2.81h22a2.81 2.81 0 0 1 2.81 2.81v4.54a2.82 2.82 0 0 1 -2.81 2.82zm-22-8.17a.82.82 0 0 0 -.82.81v4.54a.82.82 0 0 0 .82.82h22a.82.82 0 0 0 .81-.82v-4.54a.81.81 0 0 0 -.81-.81z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="252.77" y="198.08"/><path d="m276.64 207.25h-22a2.82 2.82 0 0 1 -2.82-2.82v-4.54a2.81 2.81 0 0 1 2.82-2.81h22a2.81 2.81 0 0 1 2.81 2.81v4.54a2.82 2.82 0 0 1 -2.81 2.82zm-22-8.17a.82.82 0 0 0 -.82.81v4.54a.82.82 0 0 0 .82.82h22a.82.82 0 0 0 .81-.82v-4.54a.81.81 0 0 0 -.81-.81z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="255.59" y="190.11"/><path d="m279.46 199.28h-22a2.82 2.82 0 0 1 -2.82-2.81v-4.54a2.82 2.82 0 0 1 2.82-2.82h22a2.81 2.81 0 0 1 2.81 2.82v4.54a2.81 2.81 0 0 1 -2.81 2.81zm-22-8.17a.82.82 0 0 0 -.82.82v4.54a.82.82 0 0 0 .82.81h22a.81.81 0 0 0 .81-.81v-4.54a.82.82 0 0 0 -.81-.82z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="123.01" y="222.91"/><path d="m146.88 232.08h-22a2.82 2.82 0 0 1 -2.82-2.81v-4.54a2.82 2.82 0 0 1 2.82-2.82h22a2.82 2.82 0 0 1 2.82 2.82v4.54a2.82 2.82 0 0 1 -2.82 2.81zm-22-8.17a.82.82 0 0 0 -.82.82v4.54a.82.82 0 0 0 .82.81h22a.82.82 0 0 0 .82-.81v-4.54a.82.82 0 0 0 -.82-.82z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="118.73" y="214.42"/><path d="m142.59 223.59h-22a2.81 2.81 0 0 1 -2.81-2.82v-4.54a2.81 2.81 0 0 1 2.81-2.81h22a2.82 2.82 0 0 1 2.82 2.81v4.54a2.82 2.82 0 0 1 -2.82 2.82zm-22-8.17a.81.81 0 0 0 -.81.81v4.54a.82.82 0 0 0 .81.82h22a.82.82 0 0 0 .82-.82v-4.54a.82.82 0 0 0 -.82-.81z" fill="#093f68"/><rect fill="#ffbc0e" height="8.17" rx="1.82" width="25.68" x="125.09" y="206.25"/><path d="m149 215.42h-22a2.82 2.82 0 0 1 -2.81-2.82v-4.54a2.81 2.81 0 0 1 2.81-2.81h22a2.81 2.81 0 0 1 2.82 2.81v4.54a2.82 2.82 0 0 1 -2.82 2.82zm-22-8.17a.81.81 0 0 0 -.81.81v4.54a.82.82 0 0 0 .81.82h22a.82.82 0 0 0 .82-.82v-4.54a.82.82 0 0 0 -.82-.81z" fill="#093f68"/><g fill="#6cbdb5"><path d="m130.62 142.44a1 1 0 0 1 -1-.67l-1.75-5.15a1 1 0 1 1 1.89-.64l1.75 5.14a1 1 0 0 1 -.62 1.27.93.93 0 0 1 -.27.05z"/><path d="m134.27 153.17a1 1 0 0 1 -1-.68l-1.75-5.14a1 1 0 0 1 1.89-.65l1.75 5.14a1 1 0 0 1 -.62 1.27 1 1 0 0 1 -.27.06z"/><path d="m134.36 144.28a1 1 0 0 1 -.32-1.94l5.14-1.75a1 1 0 0 1 1.27.62 1 1 0 0 1 -.63 1.27l-5.14 1.75a.93.93 0 0 1 -.32.05z"/><path d="m123.63 147.93a1 1 0 0 1 -.32-1.94l5.14-1.75a1 1 0 0 1 .65 1.89l-5.1 1.75a1 1 0 0 1 -.37.05z"/><path d="m124.29 178a.94.94 0 0 1 -.43-.1 1 1 0 0 1 -.47-1.33l2.35-4.9a1 1 0 0 1 1.8.86l-2.35 4.9a1 1 0 0 1 -.9.57z"/><path d="m119.39 188.23a.94.94 0 0 1 -.43-.1 1 1 0 0 1 -.47-1.33l2.35-4.9a1 1 0 0 1 1.33-.47 1 1 0 0 1 .47 1.34l-2.35 4.89a1 1 0 0 1 -.9.57z"/><path d="m130.57 184.3a.94.94 0 0 1 -.43-.1l-4.9-2.35a1 1 0 0 1 .86-1.8l4.9 2.35a1 1 0 0 1 -.43 1.9z"/><path d="m120.36 179.4a1 1 0 0 1 -.44-.1l-4.92-2.3a1 1 0 0 1 .86-1.8l4.9 2.35a1 1 0 0 1 -.43 1.9z"/><path d="m276.56 155.28a1 1 0 0 1 -.41-.09 1 1 0 0 1 -.49-1.33l2.25-4.94a1 1 0 1 1 1.82.83l-2.25 4.94a1 1 0 0 1 -.92.59z"/><path d="m271.87 165.58a.91.91 0 0 1 -.42-.09 1 1 0 0 1 -.49-1.32l2.25-4.94a1 1 0 1 1 1.82.83l-2.25 4.94a1 1 0 0 1 -.91.58z"/><path d="m283 161.44a.92.92 0 0 1 -.42-.1l-4.94-2.25a1 1 0 0 1 .83-1.82l4.94 2.26a1 1 0 0 1 .5 1.32 1 1 0 0 1 -.91.59z"/><path d="m272.66 156.74a1 1 0 0 1 -.41-.09l-4.95-2.26a1 1 0 0 1 .83-1.82l4.95 2.26a1 1 0 0 1 -.42 1.91z"/></g></svg>`
          }
        document.getElementById('balance-display').appendChild(piggyBankDiv);
    } else {
        setStyleFlex('no-balance');
    }
};
  
//      VALIDATE LOCAL STORAGE

const validateLocalStorage = (key, defaultValue) => {
    const storedData = localStorage.getItem(key);
    if (storedData !== null) {
        return JSON.parse(storedData);
    } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
};

//      PUT UPPERCASE ON THE FIRST LETTER OF A STRING

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

//      FORMAT DATE

const formatDate = (dateString) => {
  const formattedDate = new Date(dateString);
  formattedDate.setDate(formattedDate.getDate()); // Añadir 1 día a la fecha
  return `${formattedDate.getDate()}/${
    formattedDate.getMonth() + 1
  }/${formattedDate.getFullYear()}`;
};

//      FIND AN OBJECT FOR ITS ID

const seekId = (array, id, cut) => {
    return array.find(element => element.id === id.slice(cut));
}

//      ERROR

const error = (field, message) => {
    let errorText = document.createElement('p');
    errorText.classList.add('text-red-600');
    errorText.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${message}`;
    let inputElement = document.getElementById(`${field.id}`);
    inputElement.classList.add('outline', 'outline-red-600', 'outline-2');
    inputElement.parentNode.insertBefore(errorText, inputElement.nextSibling);
};

const hideError = (field) => {
    let inputElement = document.getElementById(`${field.id}`);
    if (inputElement) {
        let errorText = inputElement.nextSibling;
        inputElement.classList.remove('outline', 'outline-red-600', 'outline-2');
        if (errorText && errorText.nodeType === 1 && errorText.classList.contains('text-red-600')) {
            errorText.remove();
        }
    }
};




