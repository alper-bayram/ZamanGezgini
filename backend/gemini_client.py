import asyncio

import httpx

from config import GEMINI_API_KEY, GEMINI_API_URL
from persona import FUTURE_SYSTEM_PROMPT, RETRO_SYSTEM_PROMPT, YEAR3000_SYSTEM_PROMPT

MAX_ATTEMPTS = 3
REQUEST_TIMEOUT = 45
RETRYABLE_STATUS_CODES = {429, 500, 503, 504}

SYSTEM_PROMPTS = {
    "retro": RETRO_SYSTEM_PROMPT,
    "future": FUTURE_SYSTEM_PROMPT,
    "year3000": YEAR3000_SYSTEM_PROMPT,
}


class GeminiError(Exception):
    pass


async def ask_gemini(message: str, history: list[dict[str, str]], mode: str = "retro") -> str:
    if not GEMINI_API_KEY:
        raise GeminiError("GEMINI_API_KEY ayarlanmamış. backend/.env dosyasını kontrol et.")

    system_prompt = SYSTEM_PROMPTS.get(mode, RETRO_SYSTEM_PROMPT)

    contents = []
    for turn in history:
        role = "user" if turn.get("role") == "user" else "model"
        contents.append({"role": role, "parts": [{"text": turn.get("text", "")}]})
    contents.append({"role": "user", "parts": [{"text": message}]})

    payload = {
        "system_instruction": {"parts": [{"text": system_prompt}]},
        "contents": contents,
        "generationConfig": {
            "temperature": 0.9,
            "maxOutputTokens": 300,
        },
    }

    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
    }

    last_error: Exception | None = None

    async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                response = await client.post(GEMINI_API_URL, json=payload, headers=headers)
            except httpx.TimeoutException as exc:
                last_error = exc
                continue

            if response.status_code == 200:
                data = response.json()
                try:
                    candidate = data["candidates"][0]
                    parts = candidate["content"]["parts"]
                    return "".join(part.get("text", "") for part in parts).strip()
                except (KeyError, IndexError) as exc:
                    raise GeminiError(f"Gemini yanıtı ayrıştırılamadı: {data}") from exc

            if response.status_code in RETRYABLE_STATUS_CODES and attempt < MAX_ATTEMPTS:
                last_error = GeminiError(
                    f"Gemini API hatası ({response.status_code}): {response.text}"
                )
                await asyncio.sleep(1.5 * attempt)
                continue

            raise GeminiError(f"Gemini API hatası ({response.status_code}): {response.text}")

    raise GeminiError(
        "Gemini modemi yoğunluktan sürekli meşgul veriyor, az sonra tekrar dene!"
    ) from last_error
