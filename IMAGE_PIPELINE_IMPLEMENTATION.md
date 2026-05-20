# Dokumentacja implementacji — Custom Image Pipeline w Sanity + Next.js

## Spis tresci

1. [Wprowadzenie i cel](#wprowadzenie-i-cel)
2. [Komponenty Sanity Studio](#komponenty-sanity-studio)
3. [Komponenty Next.js (frontend)](#komponenty-nextjs-frontend)
4. [API routes](#api-routes)
5. [Zmiany w schematach i query](#zmiany-w-schematach-i-query)
6. [Typy TypeScript](#typy-typescript)
7. [Konfiguracja srodowiska](#konfiguracja-srodowiska)
8. [Efekty UI/UX — spodziewane zachowanie](#efekty-uiux--spodziewane-zachowanie)
9. [Potencjalne problemy migracyjne](#potencjalne-problemy-migracyjne)
10. [Lista plikow](#lista-plikow)

---

## Wprowadzenie i cel

Celem bylo stworzenie zaawansowanego systemu zarzadzania obrazami w projekcie Sayuri Portfolio:

1. **Custom Sanity Studio input** dla zdjec uslug z podgladem proporcji 4:3 i wizualizacja hotspotow/crop.
2. **EditableImage** — wrapper wokol Next.js `<Image>` umozliwiajacy edycje hotspotu w trybie Presentation (drag gold dot).
3. **GalleryBlock** — customowy blok galerii w Sanity z layoutami, customowymi proporcjami zdjec, drag-and-drop slotow oraz panowaniem kadru.

---

## Komponenty Sanity Studio

### 1. `sanity/components/ServiceImageInput.tsx`

**Cel:** Wrapuje domyslny input obrazka Sanity i dodaje panel live preview z roznymi proporcrami.

**Funkcjonalnosc:**
- Renderuje domyslny Sanity image input (upload, hotspot editor, crop).
- Po uploadzie pokazuje live preview w proporcjach:
  - **4:3** — glowny cel (zdjecia uslug)
  - 16:9, 1:1, 4:5
- Wizualizuje pozycje **hotspotu** jako zloty punkt na kazdym preview.
- Wyswietla informacje o aktualnym **crop** (top/bottom/left/right w %).
- Uzywa Sanity UI (`Stack`, `Card`, `Text`, `Grid`, `Flex`).

**Rejestracja:** Podpiety pod pole `image` w schemacie `service.ts` przez `components: { input: ServiceImageInput }`.

---

### 2. `sanity/components/GalleryBlockInput.tsx`

**Cel:** Customowy input dla bloku galerii umozliwiajacy kompozycje layoutow, zmiane proporcji slotow i kadrowanie.

**Funkcjonalnosc:**
- **Picker layoutow:** `full`, `two-col`, `one-two`, `two-one`, `three-col`, `hero-two`, `portrait-stack`, `grid`.
- **Drag & drop** slotow — przeciaganie zmienia kolejnosc zdjec w bloku.
- **Pan (przeciaganie)** na zdjeciu — przesuwa `objectPositionX` i `objectPositionY` (odpowiednik `object-position` w CSS).
- **Segment picker aspect ratio** per slot: Auto, 1:1, 4:3, 3:4, 16:9, 4:5.
- **Slidery** kadr poziomy/pionowy (0–100%).
- Renderuje tez domyslne pola Sanity przez `props.renderDefault(props)` (np. natywne uploady).

**Rejestracja:** Podpiety w schemacie `galleryBlock.ts` przez `components: { input: GalleryBlockInput }`.

---

## Komponenty Next.js (frontend)

### 1. `src/components/EditableImage.tsx`

**Cel:** Wrapper wokol Next.js `<Image>` umozliwiajacy live edycje hotspotu w trybie Preview/Presentation.

**Funkcjonalnosc:**
- Normalnie renderuje zwykle `<Image>` z `objectPosition` bazujacym na `hotspot` z Sanity.
- W trybie **preview** (wykrywany przez `usePreviewMode`):
  - Pokazuje **zloty punkt** (hotspot marker) z mozliwoscia **przeciagania** (drag).
  - Wyswietla **krzyz linii** (crosshair) wskazujacy focal point.
  - Etykieta `Preview mode — drag gold dot to move hotspot`.
  - Gdy hotspot zostanie przesuniety, pojawia sie przycisk **Save hotspot**.
  - Po kliknieciu wysyla POST do `/api/sanity-image-update` i zapisuje nowy hotspot w dokumencie Sanity.

**Props:**
- `src`, `alt`, `fill`, `className`, `sizes`, `quality` — przekazywane do `<Image>`.
- `documentId`, `fieldPath`, `imageValue` — dane Sanity potrzebne do zapisu.

**Uzyty w:** `src/components/Services.tsx` — zdjecie aktywnej uslugi.

---

### 2. `src/components/GalleryBlock.tsx`

**Cel:** Renderuje bloki galerii z Sanity jako responsywne siatki z customowymi proporcjami i kadrami.

**Funkcjonalnosc:**
- Kazdy blok renderuje sie jako `grid grid-cols-1 md:grid-cols-2` z Tailwind.
- **Layout classes** — w zaleznosci od `layout` bloku, zdjecia zajmuja rozne obszary:
  - `one-two` — pierwsze zdjecie `col-span-2 row-span-2`
  - `two-one` — ostatnie zdjecie `col-span-2 row-span-2`
  - `hero-two` — pierwsze zdjecie `col-span-2`
  - `portrait-stack` — pierwsze zdjecie `row-span-2`
  - `grid` — pierwsze zdjecie moze byc `col-span-2 row-span-2`
- **Aspect ratio** — kazde zdjecie renderuje `aspect-ratio` z Sanity (blok lub per-slot).
- **Object position** — `objectPositionX` / `objectPositionY` z Sanity mapowane na `object-position` CSS.
- **Lazy loading** — pierwsze 3 zdjecia `eager`, reszta `lazy`.
- **Lightbox** — klikniecie otwiera lightbox (integracja z `ProjectPageContent`).

**Uzyty w:** `src/components/ProjectPageContent.tsx` — zamiast starej siatki galerii 2-kolumnowej.

---

### 3. `src/hooks/usePreviewMode.ts`

**Cel:** Wykrywa czy frontend dziala w trybie Sanity Preview / Presentation.

**Metody detekcji:**
- Sprawdzenie czy jestesmy w **iframe** (`window.self !== window.top`).
- Sprawdzenie **cookies** draft mode (`__prerender_bypass`, `__next_preview_data`).
- Sprawdzenie **parametrow URL** (`?preview`, `?draft`).

Implementacja uzywa `useSyncExternalStore` (zgodnie z React best practices).

---

## API routes

### `src/app/api/sanity-image-update/route.ts`

**Metoda:** `POST`

**Cel:** Zapisuje zmiany hotspotu i/lub cropu do dokumentu Sanity.

**Wymagane body:**
```json
{
  "documentId": "document-id",
  "fieldPath": "image",
  "hotspot": { "x": 0.45, "y": 0.32 },
  "crop": { "top": 0.1, "bottom": 0.1, "left": 0, "right": 0 }
}
```

**Wymagana zmienna srodowiskowa:** `SANITY_API_TOKEN` (token z uprawnieniami `write`).

**Logika:**
1. Weryfikuje obecnosc `SANITY_API_TOKEN`.
2. Tworzy klienta Sanity z tokenem.
3. Wykonuje `client.patch(documentId).set({ "image.hotspot": {...} }).commit()`.
4. Zmiany sa widoczne natychmiast w Presentation Tool (Sanity Live + Visual Editing).

---

## Zmiany w schematach i query

### Schemat `sanity/schemas/service.ts`

Pole `image` otrzymalo:
```ts
components: {
  input: ServiceImageInput,
}
```

### Schemat `sanity/schemas/project.ts`

Pole `gallery` zmienione z prostej array `image` na:
```ts
defineField({
  name: "gallery",
  title: "Galeria zdjec",
  type: "array",
  of: [{ type: "galleryBlock" }],
})
```

### Nowy schemat `sanity/schemas/galleryBlock.ts`

- `layout` — dropdown z layoutami
- `aspectRatio` — globalny dla bloku (z custom)
- `customAspectRatio` — hidden, widoczne gdy aspect = custom
- `images` — array z:
  - `galleryImage` (image + aspectRatio + custom + objectPositionX/Y)
  - Legacy `image` (bez aspect ratio)

### Query `sanity/lib/queries.ts`

`projectBySlugQuery` rozszerzone o pełne dane galerii:
```groq
gallery[]{
  _key, _type, layout, aspectRatio, customAspectRatio,
  images[]{
    _key, _type,
    image{
      asset->{_id, url, metadata{dimensions{width, height}}},
      hotspot, crop
    },
    aspectRatio, customAspectRatio,
    objectPositionX, objectPositionY
  }
}
```

---

## Typy TypeScript

### Nowe typy w `sanity/lib/types.ts`

```ts
export interface GalleryImage {
  _key?: string;
  _type?: string;
  image?: SanityImageSource & {
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
    asset?: { _id?: string; url?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
  };
  aspectRatio?: string;
  customAspectRatio?: string;
  objectPositionX?: number;
  objectPositionY?: number;
}

export interface GalleryBlock {
  _key?: string;
  _type?: string;
  layout?: string;
  aspectRatio?: string;
  customAspectRatio?: string;
  images?: GalleryImage[];
}
```

`Project.gallery` zmienione z `Array<{ asset?: SanityImageSource; caption?: string }>` na `GalleryBlock[]`.

---

## Konfiguracja srodowiska

### Wymagane zmienne w `.env.local`:

```bash
# Istniejace
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production

# NOWE — wymagane do zapisywania zmian hotspotu
SANITY_API_TOKEN=<token-z-uprawnieniami-do-write>
```

**Token mozna wygenerowac w:** Sanity Manage → API → Tokens → Add API token (uprawnienie `Editor` lub `Administrator`).

---

## Efekty UI/UX — spodziewane zachowanie

### W Sanity Studio

#### ServiceImageInput (edycja uslugi)
1. Redaktor otwiera dokument **Uslugi**.
2. Wgrywa zdjecie w standardowym polu Sanity.
3. Pod polem pojawia sie panel **Live Preview** z 4 miniaturkami (4:3, 16:9, 1:1, 4:5).
4. Jezeli ustawi **hotspot** lub **crop**, panel automatycznie odswieza sie pokazujac efekt.
5. Widzi pozycje hotspotu jako zloty punkt i wartosci crop w tekscie.

#### GalleryBlockInput (edycja projektu)
1. Redaktor otwiera dokument **Projektu** → pole **Galeria zdjec**.
2. Dodaje blok galerii i wybiera **layout** (np. `Hero + 2`).
3. Wgrywa zdjecia do slotow.
4. **Przeciga sloty** aby zmienic kolejnosc.
5. **Kliknie slot** aby go zaznaczyc, a nastepnie:
   - wybiera **aspect ratio** (np. 4:3, 1:1, custom)
   - **przeciga zdjecie** wewnatrz slotu aby ustawic kadr (`object-position`)
   - uzywa **sliderow** do precyzyjnego kadrowania
6. Efekt jest widoczny natychmiast w podgladzie slotu.

### W Next.js (frontend)

#### Strona glowna — sekcja Uslugi
- Zdjecie uslugi renderuje sie z `object-fit: contain` w kontenerze 4:3.
- **W trybie preview** (Sanity Presentation):
  - Na zdjeciu pojawia sie **zloty punkt** i napis `Preview mode — drag gold dot to move hotspot`.
  - Redaktor przeciga punkt → obrazek natychmiast przesuwa sie wskazujac nowy focal point.
  - Kliknie **Save hotspot** → zmiana zapisuje sie w Sanity, wszystkie podglady sie odswiezaja.

#### Strona projektu — galeria
- Kazdy blok galerii renderuje sie jako **responsywna siatka** zgodna z wybranym layoutem.
- Zdjecia maja **proporcje** ustawione w Sanity (np. pierwsze 4:5, kolejne kwadrat).
- **Kadr** (`object-position`) respektuje wartosci z Sanity — wazne elementy sa widoczne.
- Klikniecie zdjecia otwiera **lightbox** z pelnym obrazkiem.
- Efekt **hover**: delikatne przyciemnienie + powiekszenie (`scale-105`).
- Efekt **scroll-in**: zdjecia pojawiaja sie z animacja fade-in + slide-up (Framer Motion).

---

## Potencjalne problemy migracyjne

### 1. Istniejace projekty z galeria (stary format)

**Problem:** Pole `gallery` w starych projektach zawiera proste obiekty `image` (bez `_type: "galleryImage"`, bez `layout`, `aspectRatio`).

**Rozwiazanie:** Nalezy recznie przebudowac galerie w Sanity Studio:
1. Otworzyc kazdy projekt.
2. Usunac stare zdjecia z galerii.
3. Dodac nowe bloki `galleryBlock`, wybrac layout, dodac zdjecia.

**Alternatywa:** Mozna napisac migracje Sanity (skrypt CLI), ale wymaga to dostepu do API.

### 2. Brak `SANITY_API_TOKEN`

**Problem:** `EditableImage` nie bedzie mogl zapisywac zmian hotspotu.

**Objaw:** Przycisk `Save hotspot` bedzie zwracal blad `Missing SANITY_API_TOKEN` w konsoli przegladarki.

**Rozwiazanie:** Dodac `SANITY_API_TOKEN` do `.env.local` i zrestartowac dev serwer / zredeployowac.

### 3. Cache CDN po zmianie hotspotu

**Problem:** Sanity CDN moze cache'owac obrazki z starymi parametrami.

**Rozwiazanie:** W konfiguracji klienta Sanity (`sanity/lib/client.ts`) `useCdn: false` dla preview/draft. Dla produkcji zmiany hotspotu moga wymagac kilku minut na propagacje CDN.

---

## Lista plikow

### Nowe pliki

| Plik | Opis |
|------|------|
| `sanity/components/ServiceImageInput.tsx` | Custom Sanity input z live preview 4:3 |
| `sanity/components/GalleryBlockInput.tsx` | Custom Sanity input dla blokow galerii |
| `sanity/schemas/galleryBlock.ts` | Schemat `galleryBlock` z layoutami i aspect ratio |
| `src/components/EditableImage.tsx` | Next.js wrapper z drag hotspot w preview |
| `src/components/GalleryBlock.tsx` | Renderer blokow galerii w Next.js |
| `src/hooks/usePreviewMode.ts` | Hook wykrywajacy tryb preview |
| `src/app/api/sanity-image-update/route.ts` | API do zapisywania hotspot/crop |

### Zmodyfikowane pliki

| Plik | Zmiana |
|------|--------|
| `sanity/schemas/service.ts` | `components.input = ServiceImageInput` |
| `sanity/schemas/project.ts` | `gallery` → array z `galleryBlock` |
| `sanity/schemas/index.ts` | Rejestracja `galleryBlockType` |
| `sanity/lib/queries.ts` | Rozszerzenie `projectBySlugQuery` o galerie |
| `sanity/lib/types.ts` | Nowe typy `GalleryBlock`, `GalleryImage` |
| `src/components/Services.tsx` | `Image` → `EditableImage` |
| `src/components/ProjectPageContent.tsx` | `GalleryBlockRenderer` + lightbox |
| `src/app/[lang]/projekt/[slug]/page.tsx` | Mapowanie `gallery` do `mappedProject` |
| `src/app/[lang]/page.tsx` | Przekazanie `_id`, `_type`, `imageValue` do uslug |
| `tailwind.config.ts` | Rozszerzenie kolorow o CSS variables |

---

## Podsumowanie architektoniczne

```
Sanity Studio                              Next.js Frontend
┌─────────────────────┐                   ┌─────────────────────┐
│ ServiceImageInput   │──preview 4:3─────▶│ Services.tsx        │
│ (wraps default)     │                   │   └─ EditableImage  │
└─────────────────────┘                   │        ├─ usePreviewMode
                                        │        └─ /api/sanity-image-update
┌─────────────────────┐                   └─────────────────────┘
│ GalleryBlockInput   │──layout/aspect───▶│ GalleryBlock.tsx    │
│ (drag, pan, ratios) │   objectPosition  │   └─ Next.js Image  │
└─────────────────────┘                   └─────────────────────┘
```
