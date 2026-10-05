import { getCollection } from 'astro:content';

export async function GET() {
  const examples = await getCollection('examples');
  const lessons = await getCollection('lessons');

  const index = [
    ...examples.map((item) => ({
      id: item.id,
      title: item.data.title,
      summary: item.data.summary,
      url: `/examples/${item.id}`,
      type: 'example'
    })),
    ...lessons.map((item) => ({
      id: item.id,
      title: item.data.title,
      summary: item.data.summary,
      url: `/learn/${item.id}`,
      type: 'lesson'
    }))
  ];

  return new Response(JSON.stringify(index), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
