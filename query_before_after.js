const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9u4sqgld',
  dataset: 'production',
  apiVersion: '2025-05-01',
  useCdn: false
});

async function main() {
  const query = `*[_type == "beforeAfter"] {
    _id,
    title,
    order,
    beforeImage {
      asset-> {
        _id,
        originalFilename,
        metadata {
          dimensions
        }
      }
    },
    afterImage {
      asset-> {
        _id,
        originalFilename,
        metadata {
          dimensions
        }
      }
    }
  } | order(order asc)`;
  try {
    const items = await client.fetch(query);
    console.log('BeforeAfter from Sanity:', JSON.stringify(items, null, 2));
  } catch (err) {
    console.error('Error fetching beforeAfter:', err);
  }
}

main();
