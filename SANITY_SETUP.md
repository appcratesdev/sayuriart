# Sanity CMS - Instrukcja Konfiguracji

## 1. Utwórz projekt w Sanity

1. Przejdź na https://www.sanity.io/
2. Zaloguj się lub utwórz konto
3. Kliknij "Create new project"
4. Wybierz nazwę projektu (np. "Sayuri Portfolio")
5. Wybierz dataset: `production`

## 2. Pobierz dane konfiguracyjne

Po utworzeniu projektu:
1. Przejdź do ustawień projektu (Settings)
2. Skopiuj **Project ID**
3. Przejdź do API → Tokens
4. Utwórz nowy token z uprawnieniami "Editor"
5. Skopiuj token

## 3. Skonfiguruj zmienne środowiskowe

Utwórz plik `.env.local` w głównym katalogu projektu:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=twoj_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=twoj_api_token
```

## 4. Uruchom Sanity Studio

```bash
npm run dev
```

Następnie otwórz w przeglądarce:
- **Strona główna**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio

## 5. Dodaj dane początkowe

W Sanity Studio dodaj zawartość dla każdej sekcji:

### Wymagane dokumenty (pojedyncze):
- **Ustawienia Strony** (Site Settings)
- **Hero** - sekcja główna
- **Manifesto** - sekcja o Tobie
- **Portfolio** - nagłówek sekcji portfolio

### Dokumenty wielokrotne:
- **Usługi** (Services) - minimum 3-5 usług
- **Przed/Po** (Before/After) - minimum 3 przykłady
- **Projekty** (Projects) - portfolio prac
- **Cennik** (Pricing) - 4 kategorie (Lifestyle, Produktowy, Amazon, Subskrypcje)
- **Opinie** (Testimonials) - opinie klientów
- **Proces** (Process) - 4 kroki procesu
- **FAQ** - najczęściej zadawane pytania

## 6. Struktura plików

```
sanity/
├── lib/
│   ├── client.ts       # Klient Sanity
│   ├── image.ts        # Helper do obrazków
│   ├── queries.ts      # Zapytania GROQ
│   └── types.ts        # Typy TypeScript
└── schemas/
    ├── index.ts        # Export wszystkich schematów
    ├── siteSettings.ts
    ├── hero.ts
    ├── manifesto.ts
    ├── service.ts
    ├── beforeAfter.ts
    ├── portfolio.ts
    ├── project.ts
    ├── pricing.ts
    ├── testimonial.ts
    ├── process.ts
    └── faq.ts
```

## 7. Integracja z komponentami

Każdy komponent będzie pobierał dane z Sanity:

```typescript
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/sanity/lib/queries'
import { Service } from '@/sanity/lib/types'

const services = await client.fetch<Service[]>(servicesQuery)
```

## 8. Obrazki z Sanity

Użyj helpera `urlFor()` do generowania URL obrazków:

```typescript
import { urlFor } from '@/sanity/lib/image'

<Image 
  src={urlFor(service.image).width(800).height(600).url()} 
  alt={service.title}
/>
```

## 9. Deploy Sanity Studio

Gdy będziesz gotowy do wdrożenia:

```bash
npm run sanity:deploy
```

Studio będzie dostępne pod adresem: `https://twoj-projekt.sanity.studio`

## 10. Kolejne kroki

Po skonfigurowaniu Sanity, zaktualizuj komponenty aby pobierały dane z CMS:
- [ ] Hero.tsx
- [ ] Manifesto.tsx
- [ ] Services.tsx
- [ ] BeforeAfter.tsx
- [ ] Portfolio.tsx
- [ ] Pricing.tsx
- [ ] Testimonials.tsx
- [ ] Process.tsx
- [ ] FAQ.tsx
- [ ] ProjectPageContent.tsx

## Wsparcie

Dokumentacja Sanity: https://www.sanity.io/docs
