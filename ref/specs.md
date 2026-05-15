# REDESIGN SPEC — LIFESTYLE IMAGES

> **Cel:** Przebudować stronę z obecnego stanu MVP do poziomu high-end editorial landing page (Dribbble-quality), który konwertuje odwiedzających w klientów.

---

## 1. AUDYT OBECNEGO STANU

### Co jest ✅
- Kolorystyka (zieleń, krem, beż) — trafiona, zachowujemy
- Typografia (Playfair + Inter) — dobra baza
- Header z hide-on-scroll — mechanika OK
- Framer Motion — zainstalowany, gotowy
- AnimatedSection wrapper — przydatny, ale wymaga rozszerzenia

### Co jest ❌ (Krytyczne problemy)

| Sekcja | Problem |
|---|---|
| **Hero** | Brak dynamiki wizualnej. Placeholder image z gradient overlay — płaski, nieatrakcyjny. Brak "wow" efektu. |
| **Manifesto** | Sam tekst na białym tle — wygląda jak pusty spacer, nie angażuje |
| **Services** | Sticky scroll jest OK koncepcyjnie, ale: brak cen, brak CTA per usługa, placeholdery |
| **CTABanner** | Generyczny wygląd "karty", za mały impact. Powinien być zintegrowany jako flow element |
| **Benefits** | Generyczne SVG ikony, brak charakteru. Sekcja wygląda jak template |
| **Portfolio** | Tylko 4 placeholdery, brak filtrowania, brak lightboxa |
| **Process** | Prosta timeline, brak animacji, brak wizualnego wyróżnienia |
| **Testimonials** | Slider OK, ale brak zdjęć autorów (placeholdery), wygląda pusto |
| **FAQ** | Komponent istnieje ale **NIE JEST RENDEROWANY** w page.tsx! |
| **Footer/Contact** | Formularz istnieje, ale nie wysyła danych. Brak walidacji |
| **Cennik** | **BRAK KOMPLETNIE** — najważniejsza sekcja sprzedażowa nie istnieje! |
| **Social Proof** | **BRAK** — brak logo tickera klientów |
| **Ogólnie** | Zbyt dużo Tailwind inline → ciężki bundle, trudny maintance |

### Brakujące kluczowe elementy
1. **Cennik z pakietami** — 4 kategorie (Lifestyle, Produktowy, Amazon, Subskrypcje)
2. **Logo Ticker** — social proof od klientów
3. **Before/After** — showcase transformacji produktów
4. **Numbers/Stats** — metryki (np. "200+ grafik", "40% więcej konwersji")
5. **FAQ** — nie jest renderowany mimo że komponent istnieje

---

## 2. NOWA ARCHITEKTURA INFORMACJI

### Hierarchia konwersji (AIDA Framework)

```
ATTENTION  → Hero (wow moment, jasna obietnica)
             ↓
INTEREST   → Social Proof (loga) → Manifesto (problem/rozwiązanie)
             ↓
DESIRE     → Services (co dostajesz) → Portfolio (dowód) → Pricing (ile kosztuje)
             ↓
ACTION     → Testimonials (ostatnia obiekcja) → Process (jak to działa) → FAQ → CTA/Kontakt
```

### Mapa strony

```
/ (Landing Page — Single Page)
├── #hero
├── 
├── #manifesto
├── #services (usługi z obrazkami)
├── #portfolio (galeria prac)
├── #pricing (cennik — NOWA SEKCJA)
├── #testimonials
├── #process
├── #faq
└── #contact (footer z formularzem)

/cennik (dedykowana podstrona z pełnym cennikiem)
├── Pakiety Lifestyle (5/10/20)
├── Pakiety Produktowe (Basic/Rozszerzony)
├── Pakiety Amazon (Basic/Full)
└── Subskrypcje (Basic/Full Pro)
```

---

## 3. DESIGN SYSTEM

### Paleta kolorów (bez zmian, doprecyzowanie)

```css
--background:         #FAF8F2;   /* ciepły krem — główne tło */
--foreground:         #10231B;   /* głęboka zieleń — tekst */
--card:               #FFFFFF;   /* białe karty */
--primary:            #1F4A35;   /* zieleń akcent — CTA, linki */
--primary-light:      #2A6349;   /* jaśniejsza zieleń — hover */
--secondary:          #F7F4EC;   /* jasny krem — tła sekcji */
--muted:              #F5EFE2;   /* ciepły beż — placeholder bg */
--muted-foreground:   #5E655E;   /* szary tekst */
--accent:             #214934;   /* ciemna zieleń — hover */
--border:             #E6E0D6;   /* subtelne obramowania */
--dark-bg:            #182C22;   /* ciemne tło (footer) */
--gold:               #C4A35A;   /* złoty akcent — premium feel */
```

### Typografia

| Element | Font | Size (desktop) | Weight |
|---|---|---|---|
| H1 (Hero) | Playfair Display | 80-96px | 400 |
| H2 (Section) | Playfair Display | 48-64px | 400 |
| H3 (Card title) | Playfair Display | 28-36px | 400 |
| Body | Inter | 16-18px | 400 |
| Label/Overline | Inter | 11-12px | 700, tracking-widest |
| Button | Inter | 14px | 500 |

### Spacing Scale
- Section padding: `clamp(80px, 10vw, 160px)` vertical
- Container: `max-width: 1280px`, padding `24px` mobile / `48px` desktop
- Component gaps: 8px base, multiples of 8

### Border Radius
- Cards/Images: `16px` (1rem)
- Buttons: `999px` (pill) for primary, `8px` for secondary
- Large containers: `24px` (1.5rem)

---

## 4. SEKCJE — SPECYFIKACJA SZCZEGÓŁOWA

### 4.1 HEADER
**Zachowujemy** obecną mechanikę (hide on scroll down, show on scroll up).

**Zmiany:**
- Logo jako SVG lub stylizowany tekst z ikoną liścia/rośliny
- Nav links: Usługi, Portfolio, Cennik, Proces (dodajemy Cennik)
- CTA button z micro-animation na hover (scale + shadow)
- Mobile: full-screen overlay z animacją slide-from-right zamiast slide-from-top

### 4.2 HERO — "Pierwsze wrażenie"
**Cel:** Natychmiastowe "wow". Jasna obietnica wartości.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  [Nav]                                          │
│                                                 │
│  Zamieniamy Twoje              ┌──────────────┐ │
│  produkty w                    │              │ │
│  obiekty pożądania.            │  Hero Image  │ │
│                                │  (z maskow.) │ │
│  Podtytuł...                   │              │ │
│                                └──────────────┘ │
│  [CTA Button]  [Zobacz prace →]                 │
│                                                 │
│  ┌─────┐ ┌─────┐ ┌─────┐     Stats: 200+ prac │
│  │mini │ │mini │ │mini │     50+ klientów      │
│  │port.│ │port.│ │port.│     98% polecenia     │
│  └─────┘ └─────┘ └─────┘                       │
└─────────────────────────────────────────────────┘
```

**Nowe elementy:**
- Floating mini-portfolio thumbnails u dołu hero
- Stats counter (animowany on-scroll)
- Maskowane wejście obrazu (clip-path reveal)
- Subtelny parallax na tle

### 4.3 SOCIAL PROOF — Logo Ticker
**Cel:** Natychmiastowe uwiarygodnienie.

**Design:**
- Nieskończona pętla logotypów klientów (marquee CSS)
- Loga w greyscale, opacity 0.4, hover → full color
- Separator line above/below
- Tekst nad tickerem: "Zaufali nam" w overline style

### 4.4 MANIFESTO — "Problem → Rozwiązanie"
**Cel:** Emocjonalne zaangażowanie. Klient rozpoznaje swój problem.

**Design:**
- Pełna szerokość, ciemne tło (`--dark-bg`) — kontrast z resztą
- Duży tekst serif, fade-in word-by-word (jak jest, ale na ciemnym tle)
- Złoty akcent na kluczowych słowach
- Minimalistyczny, potężny impact

### 4.5 SERVICES — "Co oferuję"
**Cel:** Jasne pokazanie oferty z wizualnym potwierdzeniem jakości.

**Layout: Horizontal Tabs z preview**
```
┌─────────────────────────────────────────────────┐
│  CO MOGĘ DLA CIEBIE ZROBIĆ                      │
│  Usługi dostosowane do Twojego e-commerce       │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │ [Tab 1] [Tab 2] [Tab 3] [Tab 4] [Tab 5] │   │
│  ├──────────────────────────────────────────┤   │
│  │                                          │   │
│  │  ┌──────────┐  Grafiki lifestyle         │   │
│  │  │          │  Realistyczne sceny...     │   │
│  │  │  Image   │                            │   │
│  │  │  Preview │  ✓ Feature 1              │   │
│  │  │          │  ✓ Feature 2              │   │
│  │  │          │  ✓ Feature 3              │   │
│  │  └──────────┘                            │   │
│  │              [Zobacz cennik →]            │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**Interakcja:**
- Click na tab → smooth crossfade obrazu + tekstu
- Każdy tab ma indywidualny obraz, opis, listę features, link do cennika
- Na mobile: accordion lub vertical stack

### 4.6 PORTFOLIO — "Dowód umiejętności"
**Cel:** Showcase mistrzowski. Galeria prac.

**Design:**
- Masonry/Bento grid z różnymi aspect ratios
- Hover: zoom + darken + project name + category tag
- Filtry kategorii: Lifestyle | Packshot | Infografiki | A+ Content | Wszystko
- Lightbox on click (z możliwością nawigacji prev/next)
- "Zobacz więcej" link do dedykowanej strony portfolio (future)

### 4.7 PRICING — "Ile to kosztuje" ⭐ NOWA SEKCJA
**Cel:** Transparentność cenowa. Ułatwienie decyzji zakupowej.

**Layout: Tab-based pricing**
```
┌─────────────────────────────────────────────────┐
│  CENNIK                                         │
│  Transparentne ceny, bez ukrytych kosztów       │
│                                                 │
│  [Lifestyle] [Produktowy] [Amazon] [Subskrypcje]│
│                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ Pakiet 5   │ │ Pakiet 10  │ │ Pakiet 20  │  │
│  │            │ │  POPULAR   │ │            │  │
│  │  449 zł    │ │  790 zł    │ │  1490 zł   │  │
│  │ 89,80/szt  │ │  79/szt    │ │  74,50/szt │  │
│  │            │ │            │ │            │  │
│  │ • Feature  │ │ • Feature  │ │ • Feature  │  │
│  │ • Feature  │ │ • Feature  │ │ • Feature  │  │
│  │ • Feature  │ │ • Feature  │ │ • Feature  │  │
│  │            │ │            │ │            │  │
│  │ [Zamów]    │ │ [Zamów]    │ │ [Zamów]    │  │
│  └────────────┘ └────────────┘ └────────────┘  │
│                                                 │
│  Potrzebujesz czegoś innego? [Napisz do mnie]   │
└─────────────────────────────────────────────────┘
```

**Kategorie cennika:**
1. **Pakiety Lifestyle** — 5/10/20 grafik
2. **Pakiety Produktowe** — Podstawowy/Rozszerzony
3. **Pakiety Amazon** — Podstawowy/Full
4. **Subskrypcje** — Basic/Full Pro

**Design notes:**
- Highlighted "POPULAR" badge na recommended package
- Savings badge ("Oszczędzasz X zł")
- Toggle animation między kategoriami
- Każda karta z subtelnym border i hover lift
- CTA "Zamów" scrolluje do formularza kontaktowego

### 4.8 TESTIMONIALS
**Zachowujemy** obecny slider z ulepszeniami:
- Większe cytaty, bardziej dramatyczne
- Avatar placeholder → inicjały w kółku z gradient bg
- Drag-to-slide na mobile (useMotionValue)
- Progress bar zamiast dots

### 4.9 PROCESS — "Jak to działa"
**Cel:** Usunięcie strachu, pokazanie prostoty współpracy.

**Layout: Horizontal timeline z ikonami**
- 4 kroki: Brief → Koncepcja → Kreacja → Finał
- Animated path connecting steps
- Każdy krok z ikoną, numerem, tytułem, opisem
- On scroll: steps reveal one by one

### 4.10 FAQ
**Cel:** Odpowiedzi na obiekcje. Filtrowanie leadów.

**Design:**
- Accordion z Framer Motion (obecny jest OK, trzeba podpiąć do page.tsx)
- Dodać pytania o cennik, proces, formaty
- Split layout: pytania po lewej, kontakt CTA po prawej

### 4.11 CONTACT/FOOTER
**Zachowujemy** ciemne tło z formularzem.

**Ulepszenia:**
- Formularz z walidacją
- Animowane pola (label float up on focus)
- Success state po wysłaniu
- Social links z ikonami zamiast tekstu
- Mini-mapa lub adres z linkiem do Google Maps

---

## 5. ARCHITEKTURA KOMPONENTÓW

### Reusable Components

```
src/components/
├── ui/                          # Reusable UI primitives
│   ├── Button.tsx               # Primary, Secondary, Ghost variants
│   ├── SectionHeader.tsx        # Overline + H2 + description pattern
│   ├── Badge.tsx                # Labels, tags
│   ├── Card.tsx                 # Reusable card wrapper
│   ├── AnimatedSection.tsx      # Scroll reveal wrapper (existing)
│   └── Tabs.tsx                 # Tab switcher for Services & Pricing
│
├── sections/                    # Page sections
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LogoTicker.tsx           # NEW
│   ├── Manifesto.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── Pricing.tsx              # NEW
│   ├── Testimonials.tsx
│   ├── Process.tsx
│   ├── FAQ.tsx
│   └── Footer.tsx
│
└── layout/
    └── Container.tsx            # Max-width wrapper
```

### CSS Architecture (Global CSS → minimize bundle)

```css
/* globals.css structure */
@layer base    { /* CSS variables, resets, typography */ }
@layer layout  { /* Container, grid utilities, section spacing */ }
@layer components { /* Buttons, cards, badges, tabs, forms */ }
@layer sections   { /* Section-specific styles */ }
@layer utilities  { /* Helper classes */ }
@layer animations { /* Keyframes, transition presets */ }
```

**Zasada:** Każdy powtarzający się pattern Tailwind → wyciągamy do globalnego CSS jako klasę. Komponenty TSX powinny mieć minimalne inline styles.

---

## 6. PLAN WDROŻENIA (Fazy)

### Faza 1: Foundation (TERAZ)
1. ✅ Rozbudować `globals.css` — pełny design system w CSS
2. ✅ Stworzyć reusable components (`Button`, `SectionHeader`, `Container`, `Tabs`)
3. ✅ Przebudować `Header` — nowy design, poprawiona nawigacja
4. ✅ Przebudować `Hero` — nowy layout z stats i mini-portfolio

### Faza 2: Core Sections
5. Dodać `LogoTicker` (social proof)
6. Przebudować `Manifesto` — dark bg, złote akcenty
7. Przebudować `Services` — tab-based z preview
8. Przebudować `Portfolio` — masonry grid z filtrami

### Faza 3: Conversion Sections
9. Stworzyć `Pricing` — kompletna sekcja cennikowa z 4 kategoriami
10. Przebudować `Testimonials` — drag slider, progress bar
11. Przebudować `Process` — animated timeline
12. Podpiąć `FAQ` do page.tsx, rozszerzyć pytania
13. Ulepszyć `Footer/Contact` — walidacja, animacje pól

### Faza 4: Polish
14. Responsive audit (mobile/tablet)
15. Performance audit (bundle size, image optimization)
16. SEO meta tags, Open Graph
17. Substrona `/cennik` z pełnym cennikiem

---

## 7. DANE CENNIKOWE (do zaimplementowania)

### Lifestyle Packages
| | 5 grafik | 10 grafik | 20 grafik |
|---|---|---|---|
| Cena | 449 zł | 790 zł | 1490 zł |
| Za grafikę | 89,80 zł | 79 zł | 74,50 zł |
| Grafiki | 5 lifestyle AI | 10 lifestyle AI | 20 lifestyle AI |
| Produkty | 1 lub różne | Różne produkty | 1 lub wiele |
| Poprawki | 1 runda | 1 runda | 1 runda |

### Product Packages
| | Podstawowy | Rozszerzony |
|---|---|---|
| Cena | 299 zł | 449 zł |
| Packshot | 1 | 1 |
| Lifestyle | 2 | 3 |
| Infografiki | 1 | 2 |
| Wartość poza pakietem | 396 zł | 644 zł |
| Oszczędność | 97 zł | 195 zł |

### Amazon Packages
| | Podstawowy | Full |
|---|---|---|
| Cena | 1090 zł | 1690 zł |
| Packshot | 1 | 1 |
| Lifestyle | 2 | 4 |
| Infografiki | 2 | 3 |
| A+ Content | Basic | Full |
| Wartość poza pakietem | 1435 zł | 2182 zł |
| Oszczędność | 345 zł | 492 zł |

### Subscriptions
| | Basic | Full Pro |
|---|---|---|
| Cena | 1690 zł/mies. | 2790 zł/mies. |
| Priorytet | ✓ | ✓ |
| Realizacja | 24-48h | 24-48h |
| Zakres | Packshoty, lifestyle, infografiki | + A+ Content |
| Poprawki | 1 runda | 1 runda |
