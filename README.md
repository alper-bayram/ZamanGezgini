# RetroChatbotProject

Kendini 1990'larda (1996) yaşıyor sanan, Gemini destekli bir retro sohbet botu.
Eğitim amaçlı bir projedir.

## Yapı

```
backend/    FastAPI servisi, Gemini API'ye istek atar, frontend'i de servis eder
frontend/   Düz HTML/CSS/JS, 90'lar tarzı arayüz
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
   GEMINI_MODEL=gemini-flash-latest
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

- `GEMINI_MODEL` varsayılanı `gemini-flash-latest` — Google'ın her zaman en
  güncel Flash modeline işaret eden alias'ı. İstersen `.env` içinden
  değiştirebilirsin.
- Botun 1990'lar kişiliği `backend/persona.py` içindeki sistem promptunda
  tanımlı, istersen orayı düzenleyerek karakteri değiştirebilirsin.
