# ZamanGezgini

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
