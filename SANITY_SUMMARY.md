# Sanity CMS - aktualny stan integracji

Status: integracja Sanity jest podłączona do aplikacji, a produkcyjny build i lint przechodzą poprawnie.

## Zweryfikowane komendy

```bash
npm run lint
npm run build
```

Wynik: obie komendy zakończone sukcesem.

Dev server został uruchomiony i odpowiada pod adresem:

```bash
http://localhost:3000
```

## Zainstalowane pakiety

- `sanity` - Sanity Studio
- `@sanity/client` - klient do pobierania danych
- `@sanity/image-url` - helper do generowania URL-i obrazów
- `next-sanity` - integracja Sanity z Next.js
- `@portabletext/react` - renderowanie Portable Text
- `@sanity/vision` - narzędzie do testowania zapytań GROQ

## Główna struktura Sanity

```text
sanity/
  lib/
    client.ts      # klient Sanity
    fetch.ts       # bezpieczne funkcje pobierające dane
    image.ts       # helper obrazów Sanity
    queries.ts     # zapytania GROQ
    types.ts       # typy TypeScript
  schemas/
    index.ts
    siteSettings.ts
    hero.ts
    manifesto.ts
    service.ts
    beforeAfter.ts
    portfolio.ts
    project.ts
    pricing.ts
    testimonial.ts
    process.ts
    faq.ts
```

Studio działa w aplikacji pod:

```text
src/app/studio/[[...tool]]/page.tsx
```

Adres lokalny:

```bash
http://localhost:3000/studio
```

## Schematy Sanity

Pojedyncze dokumenty:

- `siteSettings` - tytuł strony, email, telefon, social media, logo
- `hero` - treść i obraz sekcji hero
- `manifesto` - treść manifesto
- `portfolio` - nagłówek i opis sekcji portfolio

Kolekcje:

- `service` - usługi
- `beforeAfter` - przykłady przed/po
- `project` - projekty portfolio
- `pricing` - kategorie cennika i pakiety
- `testimonial` - opinie klientów
- `process` - kroki procesu
- `faq` - pytania i odpowiedzi

## Zmiany w schemacie `project`

Schema projektu została rozszerzona o pola potrzebne dla istniejącej strony projektu:

- `challenge` - treść sekcji "Wyzwanie"
- `solution` - treść sekcji "Rozwiązanie"
- `results` - lista rezultatów

Dzięki temu `ProjectPageContent` może renderować dane z CMS zamiast polegać wyłącznie na lokalnych placeholderach.

## Podłączone sekcje strony głównej

`src/app/page.tsx` pobiera dane z Sanity dla wszystkich głównych sekcji:

- Hero: `getHero()`
- Manifesto: `getManifesto()`
- Services: `getServices()`
- Before/After: `getBeforeAfter()`
- Portfolio section: `getPortfolioSection()`
- Projects: `getProjects()`
- Pricing: `getPricing()`
- Testimonials: `getTestimonials()`
- Process: `getProcess()`
- FAQ: `getFAQ()`
- Site settings: `getSiteSettings()`

Renderowane komponenty otrzymują dane przez propsy. Jeżeli Sanity nie jest skonfigurowane albo zwróci puste dane, komponenty używają obecnych fallbacków i placeholderów.

## Podłączone komponenty

Komponenty nadal mogą być Client Components tam, gdzie potrzebują animacji, stanu lub interakcji, ale dane są pobierane na poziomie Server Component w `src/app/page.tsx`.

Podłączone:

- `src/components/Hero.tsx`
- `src/components/Manifesto.tsx`
- `src/components/Services.tsx`
- `src/components/BeforeAfter.tsx`
- `src/components/Portfolio.tsx`
- `src/components/Pricing.tsx`
- `src/components/Testimonials.tsx`
- `src/components/Process.tsx`
- `src/components/FAQ.tsx`
- `src/components/Header.tsx`
- `src/components/Footer.tsx`

`Header` i `Footer` korzystają z `siteSettings`, między innymi dla tytułu strony, emaila i linków social media.

## Strony projektów

`src/app/projekt/[slug]/page.tsx` pobiera projekt z Sanity przez:

```ts
getProjectBySlug(slug)
```

Jeżeli projekt istnieje w Sanity, strona renderuje dane z CMS:

- tytuł
- kategorię
- klienta
- rok
- opis
- wyzwanie
- rozwiązanie
- rezultaty
- obraz główny
- galerię

Jeżeli projekt nie istnieje w Sanity, używany jest lokalny fallback dla obecnych przykładowych slugów.

## Obrazy

Dane obrazów z Sanity są mapowane przez:

```text
src/lib/sanity-mappers.ts
```

Helper `sanityImageUrl()` używa `urlFor()` z `sanity/lib/image.ts`.

`next.config.ts` dopuszcza obrazy z:

```text
https://cdn.sanity.io
```

Dzięki temu `next/image` może renderować obrazy z Sanity CDN.

## Fallbacki i odporność na brak konfiguracji

`sanity/lib/fetch.ts` używa `safeFetch()`.

Jeżeli brakuje `NEXT_PUBLIC_SANITY_PROJECT_ID` albo zapytanie do Sanity się nie uda:

- pojedyncze dokumenty zwracają `null`
- kolekcje zwracają pustą tablicę
- UI renderuje lokalne fallbacki i placeholdery

`sanity/lib/client.ts` oraz `sanity.config.ts` mają bezpieczny placeholder `projectId`, żeby sam import klienta nie wywalał builda bez `.env.local`.

## Wymagane zmienne środowiskowe

W `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=twoj_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=twoj_api_token
```

Na hostingu trzeba dodać te same zmienne.

## Co nadal jest statyczne

Te komponenty nadal nie są spięte z Sanity, ponieważ nie są obecnie renderowane na stronie głównej i nie mają odpowiadających im schematów:

- `src/components/Benefits.tsx`
- `src/components/CTABanner.tsx`

Jeżeli mają wrócić do layoutu, warto dodać dla nich osobne schema albo włączyć ich treści do istniejących dokumentów.

## Kolejne kroki

1. Skonfigurować `.env.local` prawdziwymi danymi Sanity.
2. Uruchomić:

```bash
npm run dev
```

3. Wejść do Studio:

```bash
http://localhost:3000/studio
```

4. Uzupełnić dokumenty i kolekcje w Sanity.
5. Sprawdzić stronę główną oraz `/projekt/[slug]` z prawdziwymi danymi.
6. Ustawić CORS w Sanity dla domeny produkcyjnej.

## Deploy

Deploy Studio:

```bash
npm run sanity:deploy
```

Deploy aplikacji Next.js zgodnie z hostingiem, np. Vercel.

## Ważne

- Nie commitować `.env.local`.
- Dodać zmienne środowiskowe na produkcji.
- Po zmianach schematów sprawdzić Studio i dodać nowe pola do istniejących projektów.
- Obrazy z Sanity powinny mieć kompletne assety, inaczej UI użyje placeholderów/fallbacków.
