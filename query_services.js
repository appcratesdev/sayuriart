const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '9u4sqgld',
  dataset: 'production',
  apiVersion: '2025-05-01',
  useCdn: false
});

async function main() {
  const query = `*[_type == "service"] {
    _id,
    title,
    order,
    image {
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
    const services = await client.fetch(query);
    console.log('Services from Sanity:', JSON.stringify(services, null, 2));
  } catch (err) {
    console.error('Error fetching services:', err);
  }
}

main();
