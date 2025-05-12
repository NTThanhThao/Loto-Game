let selectedVoiceFolder = 'Truc'; 

// Lưu trữ số đã đọc để hiển thị lịch sử
let history = [];
let currentVoice = 'Truc'; // Giọng mặc định
let stopGame = false; // Variable to track the stop state
let isGameRunning = false; // Ensure only one game runs at a time
let allNumbers = []; // Store all numbers to ensure all 90 numbers are read

// Hàm phát âm thanh cho số đã chọn
function playSound(number) {
    const audio = new Audio(`sounds/${currentVoice}/lotofa/${number}.m4a`);
    audio.play();
}

// Hàm thêm số vào lịch sử
function addToHistory(number) {
    // Thêm số vào lịch sử
    history.push(number);
    const historyContainer = document.getElementById('historyContainer');

    // Xóa toàn bộ lịch sử cũ
    historyContainer.innerHTML = '';

    // Hiển thị tối đa 5 số gần nhất
    const recentHistory = history.slice(-5);
    recentHistory.forEach((num, index) => {
        const historyItem = document.createElement('span');
        historyItem.classList.add('history-item');
        historyItem.textContent = num;

        // Thêm dấu gạch ngang trừ số cuối cùng
        if (index < recentHistory.length - 1) {
            historyItem.textContent += ' -';
        }

        // Đồng bộ với ô được tô màu
        if (num === number) {
            historyItem.classList.add('current');
        }

        historyContainer.appendChild(historyItem);
    });
}

// Hàm thay đổi giọng nói
function changeVoice(voice) {
    selectedVoiceFolder = voice;
    if (voice === 'Khoa') {
        selectedVoiceFolder = 'Khoa';
    }
}

// Hàm sắp xếp các số theo cột
function getColumns() {
    let columns = [
        [90, 10, 20, 30, 40, 50, 60, 70, 80],      // Cột 1
        [1, 11, 21, 31, 41, 51, 61, 71, 81], // Cột 2
        [2, 12, 22, 32, 42, 52, 62, 72, 82], // Cột 3
        [3, 13, 23, 33, 43, 53, 63, 73, 83], // Cột 4
        [4, 14, 24, 34, 44, 54, 64, 74, 84], // Cột 5
        [5, 15, 25, 35, 45, 55, 65, 75, 85], // Cột 6
        [6, 16, 26, 36, 46, 56, 66, 76, 86], // Cột 7
        [7, 17, 27, 37, 47, 57, 67, 77, 87], // Cột 8
        [8, 18, 28, 38, 48, 58, 68, 78, 88], // Cột 9
        [9, 19, 29, 39, 49, 59, 69, 79, 89]  // Cột 10
    ];
    return columns;
}

// Hàm tự động chọn số ngẫu nhiên và đọc lên
async function startGame() {
    if (isGameRunning) return; // Prevent multiple games from running simultaneously
    isGameRunning = true;
    stopGame = false; // Reset stop state

    // Show the Home icon and Continue button
    document.getElementById('homeIcon').style.display = 'block';
    document.getElementById('continueButton').style.display = 'inline-block';

    // Remove the game title when the game starts
    const gameTitle = document.querySelector('.game-title');
    if (gameTitle) {
        gameTitle.style.display = 'none';
    }

    adjustGameWindow(); // Adjust the game window size

    // Change the background image to Picture1.png after starting the game
    const backgroundGif = document.querySelector('.background-gif img');
    if (backgroundGif) {
        backgroundGif.src = 'gif/main/Picture1.png';
    }

    // Hide the rabbit image after starting the game
    const rabbitContainer = document.querySelector('.rabbit-container');
    if (rabbitContainer) {
        rabbitContainer.style.display = 'none';
    }

    // Display number boxes if not already displayed
    const numberContainer = document.getElementById('numberContainer');
    if (numberContainer.children.length === 0) {
        const columns = getColumns();
        columns.forEach(column => {
            column.forEach(number => displayNumber(number));
        });
    }

    // Hide the Start button and show the Stop button
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('stopButton').style.display = 'inline-block';

    if (allNumbers.length === 0) {
        // Initialize all numbers if not already done
        allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
    }

    while (allNumbers.length > 0) {
        if (stopGame) {
            isGameRunning = false; // Stop the game if the stop button is pressed
            break;
        }

        const randomIndex = Math.floor(Math.random() * allNumbers.length);
        const randomNumber = allNumbers.splice(randomIndex, 1)[0]; // Select and remove a random number
        const numberBox = document.getElementById(`number-${randomNumber}`);

        // Play the selected number's sound
        playSound(randomNumber);

        // Highlight the selected number
        if (numberBox) {
            numberBox.classList.add('toggled');
        }

        // Update the history
        addToHistory(randomNumber);

        // Wait 6 seconds before reading the next number
        await new Promise(resolve => setTimeout(resolve, 6000));
    }

    isGameRunning = false; // Mark the game as finished
}

// Hàm hiển thị số lên giao diện
function displayNumber(number) {
    const numberBox = document.createElement('div');
    numberBox.classList.add('number-box');
    numberBox.textContent = number;
    numberBox.setAttribute('id', `number-${number}`);
    document.getElementById('numberContainer').appendChild(numberBox);
}

// Hàm điều chỉnh kích thước cửa sổ trò chơi
function adjustGameWindow() {
    document.body.style.overflow = 'hidden'; // Disable scrolling
    document.body.style.height = '100vh'; // Set the height to 100% of the viewport
    document.body.style.width = '100vw'; // Set the width to 100% of the viewport
}

// Lắng nghe sự kiện khi chọn giọng nói
const voiceSelect = document.getElementById('voiceSelect');
voiceSelect.addEventListener('change', () => {
    currentVoice = voiceSelect.value; // Cập nhật giọng nói hiện tại
});

// Removed all other references to 'startButton' except for the one on the rabbit
// Updated the event listener for the Start button on the rabbit
const rabbitStartButton = document.querySelector('.rabbit-container .start-button');
rabbitStartButton.addEventListener('click', startGame);

// Add event listener for the Stop button
const stopButton = document.getElementById('stopButton');
stopButton.style.display = 'none'; // Hide Stop button initially
stopButton.addEventListener('click', () => {
    stopGame = true; // Set stop state to true
    isGameRunning = false; // Mark the game as stopped
});

const continueButton = document.getElementById('continueButton');
continueButton.addEventListener('click', () => {
    if (isGameRunning) return; // Prevent multiple calls to startGame
    stopGame = false; // Reset the stop state
    isGameRunning = true; // Resume the game

    // Continue the game loop without reinitializing
    (async function continueGame() {
        while (allNumbers.length > 0) {
            if (stopGame) {
                isGameRunning = false; // Stop the game if the stop button is pressed
                break;
            }

            const randomIndex = Math.floor(Math.random() * allNumbers.length);
            const randomNumber = allNumbers.splice(randomIndex, 1)[0]; // Select and remove a random number
            const numberBox = document.getElementById(`number-${randomNumber}`);

            // Play the selected number's sound
            playSound(randomNumber);

            // Highlight the selected number
            if (numberBox) {
                numberBox.classList.add('toggled');
            }

            // Update the history
            addToHistory(randomNumber);

            // Wait 6 seconds before reading the next number
            await new Promise(resolve => setTimeout(resolve, 6000));
        }

        isGameRunning = false; // Mark the game as finished
    })();
});

const homeIcon = document.getElementById('homeIcon');
homeIcon.addEventListener('click', () => {
    goToHomePage(); // Call the goToHomePage function to return to the homepage
});

function goToHomePage() {
    location.reload(); // Reload the page to return to the homepage

    // Hide the Home icon and Continue button
    document.getElementById('homeIcon').style.display = 'none';
    document.getElementById('continueButton').style.display = 'none';
}
