const dictionary = [
    'power',
    'waifs',
    'theta',
    'nudzh',
    'arked',
    'surat',
    'flash',
    'empty',
    'finds',
    'demos',
    'riels',
    'fewer',
    'jirga',
    'prows',
    'kithe',
    'mambu',
    'ponts',
    'recto',
    'mysid',
    'usher',
    'mogas',
    'joule',
    'bract',
    'stots',
    'pwned',
    'ambos',
    'yampa',
    'ralph',
    'dozer',
    'candy',
    'emics',
    'jollo',
    'carvy',
    'inlay',
    'cadis',
    'anode',
    'oculi',
    'dervs',
    'kanas',
    'doing',
    'biker',
    'north',
    'purin',
    'pakay',
    'squee',
    'tumid',
    'yerba',
    'unlit',
    'fogos',
    'cells',
    'mauzy',
    'cruck',
    'salts',
    'parma',
    'marra',
    'watts',
    'bajri',
    'takas',
    'wiver',
    'haats',
    'stalk',
    'gunas',
    'alata',
    'balds',
    'wispy',
    'teils',
    'habit',
    'gripe',
    'peles',
    'evite',
    'sophs',
    'permy',
    'skeer',
    'emyde',
    'redux',
    'cohen',
    'women',
    'hazan',
    'meris',
    'staph',
    'buran',
    'jones',
    'hutch',
    'yuppy',
    'hosel',
    'gordo',
    'mocha',
    'suits',
    'miked',
    'ultra',
    'sipes',
    'pinup',
    'daube',
    'filer',
    'recco',
    'ovals',
    'flora',
    'furor',
    'count',
    'hoagy',
    'joist',
    'lemel',
    'shwas',
    'melty',
    'momme',
    'scaur',
    'gynie',
    'mambo',
    'twigs',
    'equid',
    'foxie',
    'stone',
    'trunk',
    'mbret',
    'breys',
    'farer',
    'hated',
    'titup',
    'sleds',
    'abbey',
    'glamp',
    'bludy',
    'divey',
    'rhyne',
    'maned',
    'ohias',
    'brail',
    'visto',
    'fulls',
    'gonad',
    'sprad',
    'noyau',
    'aroha',
    'darga',
    'motto',
    'venti',
    'urned',
    'lives',
    'niess',
    'nests',
    'mecks',
    'yacht',
    'kibei',
    'wrest',
    'bosey',
    'buzzy',
    'ganks',
    'laugh',
    'abuna',
    'wheel',
    'kepis',
    'begat',
    'senes',
    'sedan',
    'monpe',
    'ghusl',
    'gamps',
    'coost',
    'plume',
    'dopas',
    'anise',
    'stude',
    'huhus',
    'kamik',
    'unsod',
];
const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;
    container.appendChild(box);
    return box;
}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }
    container.appendChild(grid);
}

function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter') {
            if (state.currentCol === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    alert('This Word is not valid.');
                }
            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);

        }
        updateGrid();
    };
}
function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}
function isWordValid(word) {
    return dictionary.includes(word);

}
function revealWord(guess) {
    const row = state.currentRow;
    const animation_duration = 500; //ms

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter === state.secret[i]) {
                box.classList.add('right');
            } else if (state.secret.includes(letter)) {
                box.classList.add('wrong');
            } else {
                box.classList.add('empty');
            }

        }, ((i + 1) * animation_duration) / 2);

        box.classList.add('animated');
        box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
    }
    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;

    setTimeout(() => {
        if (isWinner) {
            alert('Good Job!');
        } else if (isGameOver) {
            alert(`Not this time...The word was ${state.secret}.`);
        }
    }, 3 * animation_duration);
}



function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}
function addLetter(letter) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}
function removeLetter(letter) {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}
function startup() {
    const game = document.getElementById('game');
    drawGrid(game);

    //state.grid = Array(6);
    //fill();
    //map(() => Array(5).fill('K'));//test filling
    registerKeyboardEvents();
    //console.log(state.secret);
}

startup();