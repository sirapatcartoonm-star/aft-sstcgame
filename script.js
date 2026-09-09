// ===============================
// ตัวแปรเกม
// ===============================

let currentCategoryKey = "province";
let currentItem = "";
let questionNumber = 0;

let scores = {
    green: 0,
    blue: 0,
    yellow: 0
};


// ===============================
// สร้างปุ่มเลือกหมวดหมู่
// ===============================

function buildCategoryButtons() {

    const grid = document.getElementById("categoryGrid");
    grid.innerHTML = "";

    Object.keys(categories).forEach((key) => {

        const cat = categories[key];

        const btn = document.createElement("button");
        btn.className = "category-card";
        btn.style.background = cat.color;
        btn.onclick = () => selectCategory(key);

        btn.innerHTML =
            '<span class="cat-emoji">' + cat.emoji + '</span>' +
            cat.name;

        grid.appendChild(btn);
    });
}


// ===============================
// เลือกหมวดหมู่ แล้วเริ่มเกม
// ===============================

function selectCategory(key) {

    currentCategoryKey = key;
    currentItem = "";
    questionNumber = 0;

    document.getElementById("province").textContent = "กดเริ่มเกม";
    document.getElementById("questionNumber").textContent = 0;

    const cat = categories[key];
    const badge = document.getElementById("currentCategory");
    badge.textContent = cat.emoji + " หมวด: " + cat.name;
    badge.style.background = cat.color;

    document.getElementById("categoryPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
}


// ===============================
// กลับไปหน้าเลือกหมวดหมู่
// ===============================

function backToCategories() {
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("categoryPage").style.display = "block";
}


// ===============================
// สุ่มคำถัดไป
// ===============================

function nextProvince() {

    const items = categories[currentCategoryKey].items;
    const randomIndex = Math.floor(Math.random() * items.length);

    currentItem = items[randomIndex];
    questionNumber++;

    document.getElementById("province").textContent = currentItem;
    document.getElementById("questionNumber").textContent = questionNumber;
}


// ===============================
// เพิ่มคะแนน
// ===============================

function addScore(team) {

    if (currentItem === "") {
        alert('กรุณากดเริ่มเกมก่อน');
        return;
    }

    scores[team]++;
    document.getElementById(team + "Score").textContent = scores[team];

    // เปลี่ยนคำถัดไปอัตโนมัติ
    setTimeout(() => {
        nextProvince();
    }, 300);
}


// ===============================
// สรุปคะแนน
// ===============================

function showSummary() {

    document.getElementById("gamePage").style.display = "none";
    document.getElementById("summaryPage").style.display = "block";

    document.getElementById("finalGreen").textContent = scores.green;
    document.getElementById("finalBlue").textContent = scores.blue;
    document.getElementById("finalYellow").textContent = scores.yellow;

    const maxScore = Math.max(scores.green, scores.blue, scores.yellow);
    const winners = [];

    if (scores.green === maxScore) winners.push("🟢 สีเขียว");
    if (scores.blue === maxScore) winners.push("🔵 สีฟ้า");
    if (scores.yellow === maxScore) winners.push("🟡 สีเหลือง");

    const winnerEl = document.getElementById("winner");

    if (winners.length === 1) {
        winnerEl.textContent = "🏆 ผู้ชนะคือ " + winners[0];
    } else {
        winnerEl.textContent = "🤝 เสมอกัน: " + winners.join(" และ ");
    }
}


// ===============================
// กลับหน้าเกม
// ===============================

function backToGame() {
    document.getElementById("summaryPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";
}


// ===============================
// เริ่มเกมใหม่ทั้งหมด
// ===============================

function resetGame() {

    if (!confirm("ต้องการเริ่มเกมใหม่และล้างคะแนนทั้งหมดหรือไม่?")) {
        return;
    }

    scores.green = 0;
    scores.blue = 0;
    scores.yellow = 0;

    questionNumber = 0;
    currentItem = "";

    document.getElementById("greenScore").textContent = 0;
    document.getElementById("blueScore").textContent = 0;
    document.getElementById("yellowScore").textContent = 0;
    document.getElementById("questionNumber").textContent = 0;
    document.getElementById("province").textContent = "กดเริ่มเกม";

    document.getElementById("summaryPage").style.display = "none";
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("categoryPage").style.display = "block";
}


// ===============================
// เริ่มต้นเมื่อโหลดหน้า
// ===============================

buildCategoryButtons();
