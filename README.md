# ZamanGezgini

A Gemini-powered chatbot that switches personality depending on which time
period you pick. Built as an educational project.

- **📼 1996 — RetroBot:** Thinks it's living in the 1990s, talks about
  dial-up modems and VHS tapes.
- **🚀 2036 — NeoBot:** Lives in a future where neural interfaces, quantum
  cloud, and Mars colonies are just everyday life.
- **🟢 3000 — NEXUS:** Has uploaded its consciousness to a digital Grid,
  greets you with a Matrix-style falling-character background.

The mode switcher in the top-right corner (1996 / 2036 / 3000) lets you
jump between eras instantly — both the bot's personality and the entire
visual theme of the site change to match.

## Structure

```
backend/    FastAPI service, calls the Gemini API and also serves the frontend
frontend/   Plain HTML/CSS/JS, three separate themes for the three eras
```

## Setup

1. Copy `backend/.env.example` to `backend/.env` and paste in your own
   Gemini API key:

   ```bash
   cp backend/.env.example backend/.env
   ```

   `backend/.env` contents:

   ```
   GEMINI_API_KEY=your_api_key
   GEMINI_MODEL=gemini-flash-lite-latest
   ```

2. Install dependencies (there's already a `.venv` at the project root):

   ```bash
   .venv/bin/pip install -r backend/requirements.txt
   ```

3. Start the server:

   ```bash
   cd backend
   ../.venv/bin/uvicorn main:app --reload
   ```

4. Open `http://127.0.0.1:8000/` in your browser. The frontend is served
   directly by the backend, no separate server needed.

## Notes

- Default `GEMINI_MODEL` is `gemini-flash-lite-latest` — a lightweight
  model with its own separate quota. Bigger models (e.g.
  `gemini-flash-latest`) can have a very low daily free-tier request quota;
  if you hit a quota error, try a different model in `.env`.
- Each era's personality is defined in its own system prompt in
  `backend/persona.py` (`RETRO_SYSTEM_PROMPT`, `FUTURE_SYSTEM_PROMPT`,
  `YEAR3000_SYSTEM_PROMPT`) — edit these to change the characters.
- Which persona is used is controlled by the `mode` field in the
  `/api/chat` request (`retro` / `future` / `year3000`); the frontend sends
  this automatically based on the mode switcher.

---

# ZamanGezgini (Türkçe)

Gemini destekli, üç farklı zaman dönemine göre kişilik değiştiren bir sohbet
botu. Eğitim amaçlı bir projedir.

- **📼 1996 — RetroBot:** Kendini 1990'larda yaşıyor sanıyor, dial-up modem
  ve VHS referanslarıyla konuşuyor.
- **🚀 2036 — NeoBot:** Nöral arayüzler, kuantum bulut ve Mars kolonilerinin
  normal olduğu bir gelecekte yaşıyor.
- **🟢 3000 — NEXUS:** Bilincini dijital Şebeke'ye yüklemiş, Matrix tarzı
  kayan arka planla karşılıyor.

Arayüzdeki sağ üstteki mod seçiciyle (1996 / 2036 / 3000) anında bir
dönemden diğerine geçilebiliyor; hem botun kişiliği hem de sitenin tüm
görsel teması o döneme göre değişiyor.

## Yapı

```
backend/    FastAPI servisi, Gemini API'ye istek atar, frontend'i de servis eder
frontend/   Düz HTML/CSS/JS, üç döneme özgü üç ayrı tema
```

## Kurulum

1. `backend/.env.example` dosyasını `backend/.env` olarak kopyala ve kendi
   Gemini API key'ini yapıştır:

   ```bash
   cp backend/.env.example backend/.env
   ```

   `backend/.env` içeriği:

   ```
   GEMINI_API_KEY=senin_api_keyin
   GEMINI_MODEL=gemini-flash-lite-latest
   ```

2. Bağımlılıkları kur (proje kökünde zaten bir `.venv` var):

   ```bash
   .venv/bin/pip install -r backend/requirements.txt
   ```

3. Sunucuyu başlat:

   ```bash
   cd backend
   ../.venv/bin/uvicorn main:app --reload
   ```

4. Tarayıcıda `http://127.0.0.1:8000/` adresini aç. Frontend otomatik
   olarak backend tarafından servis edilir, ayrı bir sunucu gerekmez.

## Notlar

- `GEMINI_MODEL` varsayılanı `gemini-flash-lite-latest` — hafif ve ayrı
  kotası olan bir model. Ücretsiz katmanda büyük modellerin (örn.
  `gemini-flash-latest`) günlük istek kotası çok düşük olabiliyor; kota
  hatası alırsan `.env` içinden farklı bir model deneyebilirsin.
- Her dönemin kişiliği `backend/persona.py` içindeki üç ayrı sistem
  promptunda tanımlı (`RETRO_SYSTEM_PROMPT`, `FUTURE_SYSTEM_PROMPT`,
  `YEAR3000_SYSTEM_PROMPT`); istersen orayı düzenleyerek karakterleri
  değiştirebilirsin.
- Hangi personanın kullanılacağı `/api/chat` isteğindeki `mode` alanıyla
  (`retro` / `future` / `year3000`) belirleniyor; frontend bunu mod
  seçiciye göre otomatik gönderiyor.
