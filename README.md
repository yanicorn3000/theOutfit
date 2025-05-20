# 🛒 theOutfit

Internetowy sklep z ubraniami i akcesoriami zbudowany w oparciu o **React**, **Redux Toolkit**, **Vite**, z testami jednostkowymi w **Vitest** oraz testami end-to-end w **Playwright**. Całość przygotowana do uruchomienia w **Dockerze**.

---

## 🚀 Technologie

- **React** – interfejs użytkownika
- **Redux Toolkit** – zarządzanie stanem
- **Vite** – szybkie budowanie i uruchamianie aplikacji
- **Vitest** – testy jednostkowe i integracyjne
- **Playwright** – testy end-to-end (E2E)
- **Docker** – konteneryzacja aplikacji i serwowanie przez Nginx
- **FakeStoreAPI** – darmowe zewnętrzne API z przykładowymi produktami

---

## 🔒 Ograniczenia FakeStoreAPI

- Jest to publiczne API bez autoryzacji, więc dane są takie same dla wszystkich użytkowników.

- API nie pozwala na trwałą zmianę danych — operacje POST, PUT, DELETE są symulowane i nie mają rzeczywistego wpływu.

- Czasem mogą wystąpić opóźnienia lub brak odpowiedzi, ponieważ API nie jest przeznaczone do produkcji.

- API nie zapewnia paginacji ani filtrowania wyników po więcej niż jednej kategorii.

- API działa tylko przez HTTP (brak HTTPS na głównym endpointcie).

---

## 📦 Instalacja lokalna (bez Dockera)

```bash
# 1. Klonuj repozytorium
git clone https://github.com/yanicorn3000/theOutfit.git
cd e-commerce-app

# 2. Instaluj zależności
npm install

# 3. Uruchom aplikację
npm run dev
```

## 🐳 Uruchamianie przez Docker

```bash
# 1. Zbuduj obraz:

docker build -t the-outfit .

# 2. Uruchom kontener:

docker run -d -p 8080:80 the-outfit

# 3. Otwórz przeglądarkę i wejdź na: http://localhost:8080

```

## Testy end-to-end (Playwright)

```bash
# Uruchom aplikację (jeśli nie działa)
npm run dev

# Otwórz UI Playwright (opcjonalnie)
npx playwright test --ui

# Lub po prostu uruchom testy
npx playwright test
```

## Testy jednostkowe i integracyjne (Vitest)

```bash
npm run test
```

👤 Autor

@yanicorn300
https://github.com/yanicorn3000
