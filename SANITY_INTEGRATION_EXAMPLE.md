# Przykład Integracji Sanity z Komponentami

## Przykład 1: Services Component

### Przed (z hardcoded data):
```typescript
const services = [
  {
    title: "Grafiki lifestyle",
    desc: "Realistyczne, estetyczne sceny...",
    features: ["Feature 1", "Feature 2"],
    img: "/images/placeholder.jpg",
  },
  // ...
];
```

### Po (z Sanity):
```typescript
import { getServices } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

export const Services = async () => {
  const services = await getServices()

  return (
    <section className="section-padding bg-[var(--background)]" id="services">
      <div className="container-main">
        {/* ... */}
        {services.map((service, i) => (
          <div key={service._id}>
            <Image
              src={urlFor(service.image).width(800).height(600).url()}
              alt={service.title}
              width={800}
              height={600}
            />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.features?.map((feature, j) => (
                <li key={j}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
```

## Przykład 2: BeforeAfter Component

```typescript
import { getBeforeAfter } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'

export const BeforeAfter = async () => {
  const examples = await getBeforeAfter()

  return (
    <section>
      {examples.map((example) => (
        <div key={example._id}>
          <h3>{example.title}</h3>
          <p>{example.description}</p>
          <Image
            src={urlFor(example.beforeImage).width(1200).url()}
            alt={`${example.title} - Przed`}
          />
          <Image
            src={urlFor(example.afterImage).width(1200).url()}
            alt={`${example.title} - Po`}
          />
        </div>
      ))}
    </section>
  )
}
```

## Przykład 3: Project Page (Dynamic Route)

```typescript
// src/app/projekt/[slug]/page.tsx
import { getProjectBySlug } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'

export default async function ProjectPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return <div>Projekt nie znaleziony</div>
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <Image
        src={urlFor(project.coverImage).width(1200).url()}
        alt={project.title}
      />
      
      {/* Portable Text dla rich text */}
      {project.description && (
        <PortableText value={project.description} />
      )}

      {/* Galeria */}
      <div className="gallery">
        {project.gallery?.map((image, i) => (
          <div key={i}>
            <Image
              src={urlFor(image.asset).width(800).url()}
              alt={image.caption || project.title}
            />
            {image.caption && <p>{image.caption}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Przykład 4: Pricing z dynamicznymi kategoriami

```typescript
import { getPricing } from '@/sanity/lib/fetch'

export const Pricing = async () => {
  const categories = await getPricing()

  return (
    <section>
      {categories.map((category) => (
        <div key={category._id}>
          <h2>{category.categoryLabel}</h2>
          {category.packages.map((pkg, i) => (
            <div key={i}>
              <h3>{pkg.name}</h3>
              <p>{pkg.price} zł</p>
              {pkg.featured && <span>POPULARNY</span>}
              <ul>
                {pkg.features.map((feature, j) => (
                  <li key={j}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}
```

## Przykład 5: Hero z obrazkiem

```typescript
import { getHero } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/image'

export const Hero = async () => {
  const hero = await getHero()

  if (!hero) return null

  return (
    <section>
      <h1>{hero.title}</h1>
      <p>{hero.subtitle}</p>
      {hero.heroImage && (
        <Image
          src={urlFor(hero.heroImage).width(1920).height(1080).url()}
          alt={hero.title}
          width={1920}
          height={1080}
          priority
        />
      )}
      {hero.ctaText && hero.ctaLink && (
        <a href={hero.ctaLink}>{hero.ctaText}</a>
      )}
    </section>
  )
}
```

## Ważne uwagi:

1. **Server Components**: Komponenty pobierające dane z Sanity powinny być Server Components (domyślnie w Next.js 13+)

2. **Client Components**: Jeśli potrzebujesz interaktywności (useState, onClick), przenieś logikę UI do osobnego Client Component:

```typescript
// services-client.tsx
"use client"
export function ServicesClient({ services }) {
  const [activeIndex, setActiveIndex] = useState(0)
  // ... interactive logic
}

// services.tsx (Server Component)
import { getServices } from '@/sanity/lib/fetch'
import { ServicesClient } from './services-client'

export async function Services() {
  const services = await getServices()
  return <ServicesClient services={services} />
}
```

3. **Image Optimization**: Zawsze używaj `urlFor()` z określoną szerokością/wysokością dla optymalizacji

4. **Revalidation**: Dane są cache'owane na 1 godzinę (3600s). Możesz zmienić to w `sanity/lib/fetch.ts`

5. **Error Handling**: Dodaj obsługę błędów:

```typescript
export async function Services() {
  try {
    const services = await getServices()
    if (!services || services.length === 0) {
      return <div>Brak usług do wyświetlenia</div>
    }
    return <ServicesClient services={services} />
  } catch (error) {
    console.error('Error fetching services:', error)
    return <div>Błąd ładowania usług</div>
  }
}
```
