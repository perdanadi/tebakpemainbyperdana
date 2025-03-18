const allPlayers = [
    { name: "Egy Maulana Vikri", image: "egy.jpeg" },
    { name: "Thom Haye", image: "haye.jpeg" },
    { name: "Jay Idzes", image: "jay.jpeg" },
    { name: "Kevin Diks", image: "kevin diks.jpeg" },
    { name: "Ole Romeny", image: "ole.jpeg" },
    { name: "Mees Hilgers", image: "mees hilgers.jpeg" },
    { name: "Marselino Ferdinan", image: "Marselino Ferdinan.jpeg" },
    { name: "Rizky Ridho", image: "rizky.jpeg" },
    { name: "Maarten Paes", image: "marteen.jpeg" },
    { name: "Sandy Walsh", image: "sandy.jpeg" }
];

let selectedPlayers = [];
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;

const correctSound = new Audio("music/siuu.mp3");
const wrongSound = new Audio("music/noo.mp3");

// Fungsi untuk mengacak array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Fungsi untuk memulai permainan
function startGame() {
    selectedPlayers = shuffleArray([...allPlayers]).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;

    document.getElementById("score").innerText = `Skor: ${score}`;
    document.getElementById("lives").innerText = `❤️ ${lives}`;
    document.getElementById("feedback").innerText = "";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("options-container").innerHTML = "";
    document.getElementById("player-image").style.display = "block";
    document.getElementById("next-btn").innerText = "Soal Berikutnya";
    document.getElementById("next-btn").onclick = nextQuestion;

    loadQuestion();
}

// Fungsi untuk menampilkan pertanyaan baru
function loadQuestion() {
    if (currentQuestionIndex < selectedPlayers.length) {
        const player = selectedPlayers[currentQuestionIndex];
        document.getElementById("player-image").src = player.image;
        document.getElementById("player-image").style.display = "block";

        document.getElementById("feedback").innerText = "";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("next-btn").disabled = true;

        generateOptions(player.name);
    } else {
        endGame();
    }
}

// Fungsi untuk membuat opsi jawaban
function generateOptions(correctName) {
    let optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    let wrongAnswers = shuffleArray(allPlayers.filter(p => p.name !== correctName)).slice(0, 3);
    let options = shuffleArray([...wrongAnswers, { name: correctName }]);

    options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option.name;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(option.name, btn);
        optionsContainer.appendChild(btn);
    });
}

// Fungsi untuk mengecek jawaban
function checkAnswer(selectedName, button) {
    const correctAnswer = selectedPlayers[currentQuestionIndex].name;

    document.querySelectorAll("#options-container button").forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === correctAnswer) {
            btn.style.backgroundColor = "#28a745"; // Warna hijau jika benar
        } else {
            btn.style.backgroundColor = "#dc3545"; // Warna merah jika salah
        }
    });

    if (selectedName === correctAnswer) {
        score += 10;
        document.getElementById("score").innerText = `Skor: ${score}`;
        document.getElementById("feedback").innerText = "Benar! 🎉";
        document.getElementById("feedback").style.color = "#28a745";
        correctSound.play();
    } else {
        lives -= 1;
        document.getElementById("lives").innerText = `❤️ ${lives}`;
        document.getElementById("feedback").innerText = `Salah ❌ Jawaban: ${correctAnswer}`;
        document.getElementById("feedback").style.color = "#dc3545";
        wrongSound.play();

        if (lives === 0) {
            endGame();
            return;
        }
    }

    // Tampilkan tombol "Soal Berikutnya"
    let nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "block";
    nextBtn.disabled = false;
}

// Fungsi untuk berpindah ke pertanyaan berikutnya
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedPlayers.length) {
        loadQuestion();
    } else {
        endGame();
    }

    let nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = "none";
    nextBtn.disabled = true;
}

// Fungsi untuk mengakhiri permainan
function endGame() {
    document.getElementById("player-image").style.display = "none";
    document.getElementById("options-container").innerHTML = "";
    document.getElementById("feedback").innerText = `Game selesai! 🎉 Skor Akhir: ${score}`;
    document.getElementById("feedback").style.color = "#FFD700";

    let nextBtn = document.getElementById("next-btn");
    nextBtn.innerText = "Main Lagi";
    nextBtn.style.display = "block";
    nextBtn.disabled = false;
    nextBtn.onclick = startGame;
}

// Jalankan game saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", startGame);
