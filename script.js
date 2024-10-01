// Category switching logic
document.getElementById('diceCategory').addEventListener('click', function() {
    document.getElementById('diceGame').style.display = 'block';
    document.getElementById('matchstickGame').style.display = 'none';
});

document.getElementById('matchstickCategory').addEventListener('click', function() {
    document.getElementById('diceGame').style.display = 'none';
    document.getElementById('matchstickGame').style.display = 'block';
});

// Dice Roller Logic
document.getElementById('rollButton').addEventListener('click', function() {
    const diceContainer = document.getElementById('diceContainer');
    diceContainer.innerHTML = ''; // Clear previous dice

    let positions = [];

    for (let i = 0; i < 10; i++) {
        const dice = document.createElement('div');
        const diceType = Math.random() < 0.5 ? 'black' : 'white';
        dice.classList.add('dice', diceType);

        let position = getNonOverlappingPosition(positions);
        positions.push(position);

        dice.style.left = `${position.x}px`; 
        dice.style.top = `${position.y}px`;
        diceContainer.appendChild(dice);
        
        const diceValue = rollDice();
        const diceFace = document.createElement('div');
        diceFace.classList.add('dice-face');
        addDots(diceFace, diceValue);
        dice.appendChild(diceFace);
    }
});

document.getElementById('sortButton').addEventListener('click', function() {
    const diceContainer = document.getElementById('diceContainer');
    const diceElements = diceContainer.querySelectorAll('.dice');
    
    diceElements.forEach((dice, index) => {
        dice.style.position = 'relative';
        dice.style.left = `${index * 2}px`; 
        dice.style.top = '0px';
    });
});

// Matchstick Toss Logic
document.getElementById('tossButton').addEventListener('click', function() {
    const matchstickContainer = document.getElementById('matchstickContainer');
    matchstickContainer.innerHTML = ''; // Clear previous matchsticks

    for (let i = 0; i < 10; i++) {
        const matchstick = document.createElement('div');
        matchstick.classList.add('matchstick');

        const tip = document.createElement('div');
        tip.classList.add('tip');
        matchstick.appendChild(tip);

        const randomRotation = Math.random() * 360;
        const randomX = Math.random() * 300;
        const randomY = Math.random() * 300;

        matchstick.style.transform = `rotate(${randomRotation}deg)`;
        matchstick.style.left = `${randomX}px`;
        matchstick.style.top = `${randomY}px`;

        matchstickContainer.appendChild(matchstick);
    }
});

// Utility functions
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function addDots(diceFace, value) {
    const dotPositions = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8]
    };
    
    for (let i = 0; i < 9; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (dotPositions[value].includes(i)) {
            diceFace.appendChild(dot);
        } else {
            diceFace.appendChild(document.createElement('div'));
        }
    }
}

function getNonOverlappingPosition(existingPositions) {
    let newPosition;
    let overlapping;

    do {
        newPosition = {
            x: Math.random() * 340,
            y: Math.random() * 340
        };
        overlapping = existingPositions.some(pos => {
            return Math.abs(pos.x - newPosition.x) < 70 && Math.abs(pos.y - newPosition.y) < 70;
        });
    } while (overlapping);

    return newPosition;
}
