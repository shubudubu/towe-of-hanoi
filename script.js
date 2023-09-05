const towers = document.querySelectorAll('.tower');
const solveBtn = document.getElementById('solve-btn');

const disks = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
];

disks[0].classList.add('disk', 'disk1');
disks[1].classList.add('disk', 'disk2');
disks[2].classList.add('disk', 'disk3');

towers[0].appendChild(disks[0]);
towers[0].appendChild(disks[1]);
towers[0].appendChild(disks[2]);

let moves = 0;

// Function to move disks between towers
function moveDisk(sourceTower, targetTower) {
    const sourceTopDisk = sourceTower.lastChild;
    const targetTopDisk = targetTower.lastChild;

    if (!sourceTopDisk) {
        return;
    }

    if (!targetTopDisk || sourceTopDisk.clientWidth < targetTopDisk.clientWidth) {
        targetTower.appendChild(sourceTopDisk);
        moves++;
        checkWinCondition();
    }
}

// Function to check if the game is won
function checkWinCondition() {
    if (towers[2].childElementCount === 3) {
        alert(`You won in ${moves} moves!`);
    }
}

towers.forEach(tower => {
    tower.addEventListener('click', () => {
        if (!tower.classList.contains('selected')) {
            tower.classList.add('selected');
            selectedTower = tower;
        } else {
            moveDisk(selectedTower, tower);
            selectedTower.classList.remove('selected');
            selectedTower = null;
        }
    });
});

let selectedTower = null;

solveBtn.addEventListener('click', () => {
    solveTowerOfHanoi(3, towers[0], towers[2], towers[1]);
});

// Function to solve the Tower of Hanoi recursively
function solveTowerOfHanoi(n, source, target, auxiliary) {
    if (n === 1) {
        moveDisk(source, target);
        return;
    }

    solveTowerOfHanoi(n - 1, source, auxiliary, target);
    moveDisk(source, target);
    solveTowerOfHanoi(n - 1, auxiliary, target, source);
}
