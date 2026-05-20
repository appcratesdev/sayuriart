# Image Pipeline Review

## Problem

Zdjecia byly transformowane w dwoch miejscach naraz.

1. `src/lib/sanity-mappers.ts` generowal URL Sanity juz z wymuszonym rozmiarem, np. `w=900&h=900&fit=crop` albo `w=1200&h=900&fit=crop`.
2. `next/image` dostawal ten URL i przez globalny custom loader generowal kolejne warianty `srcset`.
3. Loader przepisywal szerokosc, ale zostawial i przeliczal wysokosc z pierwotnego URL-a, wiec crop wykonany na etapie mapowania dalej obowiazywal.

Efekt: obraz w UI mogl byc najpierw przyciety do sztucznego kadru, potem ponownie skalowany przez Sanity CDN, a na koncu rozciagany przez CSS do innego slotu. Przyklad z DevTools `640 x 498` renderowany jako `591 x 682` wskazuje wlasnie na rozjazd miedzy proporcja pobranego pliku i proporcja kontenera.

To nie wyglada na problem samego uploadu do Sanity. Sanity przechowuje oryginalny asset i generuje warianty na zadanie. Problemem byly parametry URL-i tworzonych przez aplikacje.

## Przyjete podejscie

Dla obrazow uzywanych w UI aplikacja przekazuje teraz bazowy URL Sanity bez wymuszonego docelowego rozmiaru. Za finalny rozmiar odpowiada `next/image` przez `sizes` i custom loader.

Loader Sanity zostal uproszczony:

- usuwa `h`, zeby nie dziedziczyc wysokosci z wczesniejszych transformacji,
- ustawia tylko `w` wynikajace z `srcset`,
- ustawia `fit=max`, zeby unikac dodatkowego cropa w loaderze,
- ustawia `auto=format`,
- respektuje `quality` przekazane w komponencie, domyslnie `85`.

Crop z konkretnym `width/height` zostaje tylko tam, gdzie ma sens: w obrazach SEO/OpenGraph, np. `1200 x 630`.

## Zmienione miejsca

- `src/lib/sanity-image-loader.ts`
  Loader nie przelicza juz wysokosci i nie utrwala starego cropa. Obsluguje tez lokalne fallbacki typu `/images/placeholder.jpg`, zeby globalny custom loader zawsze zwracal URL zalezny od `width`.

- `src/lib/sanity-mappers.ts`
  `sanityImageUrl(image)` moze teraz zwrocic bazowy URL bez wymuszonego rozmiaru. Parametry `width` i `height` sa opcjonalne i powinny byc uzywane glownie do stalych formatow, np. social preview.

- `src/app/[lang]/page.tsx`
  Obrazy dla `Hero`, `Services`, `BeforeAfter` i `Portfolio` nie sa juz wczesniej przycinane do stalego rozmiaru.

- `src/app/[lang]/projekt/[slug]/page.tsx`
  Cover i galeria projektu ida do UI jako bazowe URL-e Sanity.

- `src/app/[lang]/o-mnie/page.tsx`
  Zdjecie profilu w UI nie jest juz wczesniej przycinane do `800 x 1000`.

- `next.config.ts`
  Dodano `qualities: [75, 85, 95, 100]`, bo w Next 16 dozwolone wartosci jakosci musza byc jawnie skonfigurowane. Zawiezono tez `remotePatterns` do konkretnej sciezki Sanity project/dataset.

- `src/components/Portfolio.tsx`, `src/components/Services.tsx`, `src/components/BeforeAfter.tsx`, `src/components/ProjectPageContent.tsx`
  Obrazy showcase dostaly `quality={95}`, zeby Sanity CDN generowal mniej stratne warianty tam, gdzie jakosc wizualna jest wazniejsza niz minimalny transfer.

## Spodziewane efekty

- DevTools nie powinien juz pokazywac sytuacji, w ktorej pobrany obraz ma proporcje mocno rozjechane z renderowanym slotem przez wczesniejszy crop.
- Obrazy w sekcjach `Portfolio`, `Services` i `BeforeAfter` powinny wygladac ostrzej, bo nie beda przechodzic przez dodatkowy sztuczny etap `w/h/fit=crop` przed responsywnym `srcset`.
- Transfer wzrosnie wzgledem agresywnie skompresowanych wariantow typu 19 kB, szczegolnie przy `quality={95}`. To jest swiadomy trade-off dla grafik portfolio/showcase.
- Nadal bedzie dzialac responsywnosc: przegladarka wybierze wariant szerokosci z `srcset` na podstawie `sizes`.
- Sanity nadal bedzie serwowac nowoczesny format przez `auto=format`.

## Co z juz wrzuconymi zdjeciami

Nie trzeba ich ponownie uploadowac tylko dlatego, ze aplikacja generowala zle URL-e. Sanity przechowuje oryginalny asset i nowe URL-e beda generowac nowe warianty z oryginalu.

Warto jednak sprawdzic w Sanity Studio:

- czy dla zdjec z ustawionym hotspot/crop nie ma recznie ustawionego kadru, ktory zbyt mocno ucina wazny fragment,
- czy pary `BeforeAfter` maja podobny kadr i proporcje, bo suwak porownuje dwa obrazy w tym samym kontenerze `4:3`,
- czy obrazy portfolio maja sensowny punkt kadrowania dla slotow `4/5`, `1/1`, `3/4` i `16/10`.

Jesli po zmianie jakis obraz dalej wyglada slabo, najpierw sprawdz:

1. Otworz obraz w DevTools i porownaj `Rendered size` z `Intrinsic size`.
2. Sprawdz URL: dla UI powinien miec `w=...`, `fit=max`, `auto=format`, `q=95` lub `q=85`, ale nie powinien miec `h=...`.
3. Jesli nadal jest problem, popraw hotspot/crop w Sanity Studio albo podmien asset na lepszy oryginal.

## Weryfikacja wykonana

- `npx tsc --noEmit` przeszedl bez bledow.
- `npx eslint src/lib/sanity-image-loader.ts src/lib/sanity-mappers.ts next.config.ts` przeszedl bez bledow.
- Pelny `npm run lint` nadal ma istniejace, niezalezne problemy w innych plikach, m.in. `query_before_after.js`, `query_services.js` i `ContactForm.tsx`.
- Pelny `npm run build` byl uruchomiony przed prosba o przerwanie buildow i przeszedl raz poprawnie poza sandboxem. Pozniejsze proby nie sa kontynuowane zgodnie z instrukcja.
