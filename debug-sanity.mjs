import { createClient } from 'next-sanity'

const client = createClient({
  projectId: '9u4sqgld',
  dataset: 'production',
  apiVersion: '2025-05-01',
  useCdn: false,
})

const query = `*[_type == "project"][0]{
  title,
  coverImage{
    _key,
    _type,
    layout,
    aspectRatio,
    customAspectRatio,
    images[]{
      _key,
      _type,
      image{
        asset->{_id, url, metadata{dimensions{width, height}}},
        hotspot,
        crop
      },
      aspectRatio,
      customAspectRatio,
      objectPositionX,
      objectPositionY
    }
  }
}`

const result = await client.fetch(query)
console.log(JSON.stringify(result, null, 2))
