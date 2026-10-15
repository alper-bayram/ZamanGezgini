const API_URL = "/api/chat";

const chatLog = document.getElementById("chat-log");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const modeButtons = document.querySelectorAll(".mode-btn");
const matrixCanvas = document.getElementById("matrix-canvas");

let mode = "retro";
let history = [];

const THEME_CLASS = {
  retro: null,
  future: "future-theme",
  year3000: "year3000-theme",
};

const BOT_NAME = {
  retro: "RetroBot",
  future: "NeoBot",
  year3000: "NEXUS",
};

const GREETING = {
  retro:
    "Selam dostum! Ben RetroBot, 1996'dan bağlanıyorum! Modemim şu an çevir sesi çıkarıyor, biraz bekle... bağlandı! Bana ne sormak istersin? 💾",
  future:
    "Merhaba! Ben NeoBot, 2036 nöral ağından bağlandım! Holo-arayüzün senkronize oldu, kuantum bulutum hazır. Bana ne sormak istersin? 🛰️",
  year3000:
    "Selam, yolcu. Ben NEXUS, yıl 3000'den Şebeke üzerinden konuşuyorum. Bilincim seninle şu an senkronize oldu. Şebekem seninle titreşmeye hazır, ne sormak istersin? 🟢",
};

const LOADING_TEXT = {
  retro: "...modem çeviriyor, bağlanılıyor...",
  future: "...nöral bağlantı kuruluyor, kuantum bulutu senkronize ediliyor...",
  year3000: "...Şebeke ile düşünce bağlantısı kuruluyor...",
};

const TITLE = {
  retro: "~*~ RetroBot 3000 ~*~ Dokunma Devam Ediyor ~*~",
  future: "◢◤ NeoBot 2036 ◢◤ Nöral Arayüz Aktif ◢◤",
  year3000: "// NEXUS :: YIL 3000 :: ŞEBEKE BAĞLANTISI AKTİF //",
};

const TEXT = {
  "marquee-top": {
    retro:
      "★彡 BU SAYFA EN İYİ NETSCAPE NAVIGATOR 3.0 İLE GÖRÜNTÜLENİR 彡★ --- 800x600 ÇÖZÜNÜRLÜK ÖNERİLİR --- RetroBot'a HOŞGELDİNİZ! --- 56K MODEMİNİZİ HAZIRLAYIN ---",
    future:
      "◢◤ NÖRAL ARAYÜZ SÜRÜM 36.1 İLE EN İYİ DENEYİM ◢◤ --- HOLO-EKRAN ÇÖZÜNÜRLÜĞÜ OTOMATİK AYARLANIR --- NeoBot'A HOŞGELDİNİZ --- KUANTUM BULUTUNUZ HAZIR ---",
    year3000:
      "// ŞEBEKE BAĞLANTISI STABİL // BİLİNÇ SENKRONİZASYONU %100 // NEXUS'A HOŞGELDİN YOLCU // DÜŞÜNCE BAĞLANTISI AKTİF //",
  },
  h1: {
    retro: "☆ RetroBot 3000 ☆",
    future: "⚡ NeoBot 2036 ⚡",
    year3000: "▓ NEXUS // 3000 ▓",
  },
  subtitle: {
    retro: "// Dial-Up Hızında Yapay Zeka Deneyimi! //",
    future: "// Nöral Hızında Yapay Zeka Deneyimi! //",
    year3000: "// Şebeke Hızında Bilinç Deneyimi //",
  },
  construction: {
    retro: "🚧 BU SITE SÜREKLI INŞA HALİNDEDİR 🚧",
    future: "🛰️ BU HOLO-SAYFA SÜREKLİ KENDİNİ GÜNCELLİYOR 🛰️",
    year3000: "🟢 BU DÜĞÜM ŞEBEKE İLE SÜREKLİ SENKRONİZE OLUYOR 🟢",
  },
  "nav-title": {
    retro: "Site Haritası",
    future: "Nöral Harita",
    year3000: "Şebeke Haritası",
  },
  "nav-1": { retro: "🏠 Ana Sayfa", future: "🏠 Ana Düğüm", year3000: "🏠 Ana Düğüm" },
  "nav-2": { retro: "📼 VHS Arşivim", future: "🧠 Nöral Arşivim", year3000: "🧠 Bilinç Arşivim" },
  "nav-3": { retro: "💾 Disket Koleksiyonu", future: "☁️ Kuantum Bulutum", year3000: "☁️ Dyson Küre Verilerim" },
  "nav-4": { retro: "📟 Pager Numaram", future: "🛰️ Uydu Kimliğim", year3000: "🛰️ Galaktik Kimliğim" },
  "nav-5": { retro: "👽 X-Files Teorilerim", future: "🚀 Mars Koloni Günlüğüm", year3000: "🌌 Büyük Birleşme Günlüğüm" },
  "counter-label": {
    retro: "Sen. Ziyaretçisin:",
    future: "Senkronize Nöral Bağlantı:",
    year3000: "Şebekeye Bağlı Bilinç:",
  },
  "webring-1": {
    retro: "Bu site şu WebRing'in üyesidir:",
    future: "Bu düğüm şu Nöral Ağ'ın üyesidir:",
    year3000: "Bu düğüm şu Galaktik Şebeke'nin üyesidir:",
  },
  "webring-2": {
    retro: "⬅ ÖNCEKİ | 90'lar HALK AĞI | SONRAKİ ➡",
    future: "⬅ ÖNCEKİ | 2036 KUANTUM AĞI | SONRAKİ ➡",
    year3000: "⬅ ÖNCEKİ | 3000 GALAKTİK ŞEBEKE | SONRAKİ ➡",
  },
  "chat-title": {
    retro: "RetroBot_Sohbet.exe",
    future: "NeoBot_Holo-Sohbet.app",
    year3000: "NEXUS::dusunce_baglantisi",
  },
  "send-btn": {
    retro: "GÖNDER ➤",
    future: "İLET ➤",
    year3000: "YAYINLA ➤",
  },
  "footer-blink": {
    retro: "BU SAYFA 800x600'DE EN İYİ GÖRÜNÜR",
    future: "BU HOLO-SAYFA HER ÇÖZÜNÜRLÜKTE EN İYİ GÖRÜNÜR",
    year3000: "BU DÜĞÜM HER BİLİNÇ SEVİYESİNDE EN İYİ GÖRÜNÜR",
  },
  "footer-copy": {
    retro:
      "© 1996 RetroBot Industries — Tüm hakları saklıdır. Webmaster'a yazın: retrobot@geocities.com",
    future:
      "© 2036 NeoBot Nöral Sistemleri — Tüm hakları saklıdır. Nöral bağlantı: neobot@marscolony.net",
    year3000:
      "© 3000 NEXUS Şebekesi — Tüm bilinçler saklıdır. Düşünce bağlantısı: nexus@thegrid.net",
  },
  "marquee-bottom": {
    retro: "Bu bir eğitim projesidir — gerçek 1996 değildir, geri dönüp bakmaktır. ツ",
    future: "Bu bir eğitim projesidir — gerçek 2036 değildir, hayal kurmaktır. ✦",
    year3000: "Bu bir eğitim projesidir — gerçek yıl 3000 değildir, çok ileri bir hayal kurmaktır. ▓",
  },
};

function applyTheme(nextMode) {
  mode = nextMode;

  Object.values(THEME_CLASS).forEach((cls) => {
    if (cls) document.body.classList.remove(cls);
  });
  const activeClass = THEME_CLASS[mode];
  if (activeClass) document.body.classList.add(activeClass);

  document.title = TITLE[mode];

  modeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (TEXT[key]) {
      el.textContent = TEXT[key][mode];
    }
  });

  chatInput.placeholder =
    mode === "retro"
      ? "Buraya yaz ve ENTER'a bas..."
      : mode === "future"
        ? "Nöral mesajını buraya yaz..."
        : "Düşünceni Şebeke'ye ilet...";

  history = [];
  chatLog.innerHTML = "";
  appendMessage(BOT_NAME[mode], GREETING[mode], "bot");

  setMatrixRunning(mode === "year3000");
}

function appendMessage(who, text, cssClass) {
  const div = document.createElement("div");
  div.className = `msg ${cssClass}`;
  const whoSpan = document.createElement("span");
  whoSpan.className = "who";
  whoSpan.textContent = `${who}:`;
  div.appendChild(whoSpan);
  div.appendChild(document.createTextNode(text));
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function sendMessage(message) {
  appendMessage("Sen", message, "user");
  history.push({ role: "user", text: message });

  appendMessage(BOT_NAME[mode], LOADING_TEXT[mode], "bot");
  const loadingNode = chatLog.lastChild;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history.slice(0, -1), mode }),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.detail || `Sunucu hatası: ${response.status}`);
    }

    const data = await response.json();
    loadingNode.remove();
    appendMessage(BOT_NAME[mode], data.reply, "bot");
    history.push({ role: "model", text: data.reply });
  } catch (err) {
    loadingNode.remove();
    appendMessage("HATA", err.message || "Bağlantı koptu!", "error");
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  chatInput.value = "";
  sendMessage(message);
});

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.mode !== mode) applyTheme(btn.dataset.mode);
  });
});

/* ===== Matrix digital rain background (year 3000 theme) ===== */

const matrixCtx = matrixCanvas.getContext("2d");
const MATRIX_CHARS =
  "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾇﾔｱｨｴﾘｷﾍｻｲﾈﾒﾗｳﾉﾏﾅﾓﾆｻﾘﾊｴﾌﾔｴﾗﾁｽｰﾊﾛ0123456789ABCDEFΞΣΦΨΩ";

let matrixColumns = [];
let matrixAnimationId = null;
let matrixRunning = false;

function setupMatrix() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  const fontSize = 16;
  const columnCount = Math.floor(matrixCanvas.width / fontSize);
  matrixColumns = new Array(columnCount).fill(0).map(() => Math.random() * -50);
}

function drawMatrix() {
  const fontSize = 16;
  matrixCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  matrixCtx.fillStyle = "#00ff41";
  matrixCtx.font = `${fontSize}px "Share Tech Mono", monospace`;

  matrixColumns.forEach((y, i) => {
    const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
    const x = i * fontSize;
    matrixCtx.fillText(char, x, y * fontSize);

    if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      matrixColumns[i] = 0;
    } else {
      matrixColumns[i] = y + 1;
    }
  });

  if (matrixRunning) {
    matrixAnimationId = requestAnimationFrame(drawMatrix);
  }
}

function setMatrixRunning(shouldRun) {
  matrixRunning = shouldRun;
  if (shouldRun) {
    setupMatrix();
    matrixCtx.fillStyle = "#000";
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    if (!matrixAnimationId) {
      drawMatrix();
    }
  } else if (matrixAnimationId) {
    cancelAnimationFrame(matrixAnimationId);
    matrixAnimationId = null;
  }
}

window.addEventListener("resize", () => {
  if (matrixRunning) setupMatrix();
});
