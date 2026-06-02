import { client } from '../sanity/lib/client';

async function listBlogPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "author": author->name,
    "categories": categories[]->title,
    excerpt
  }`;

  const posts = await client.fetch(query);

  console.log(`\nTotal blog posts: ${posts.length}\n`);
  console.log('Blog Post URLs:');
  console.log('===============\n');

  posts.forEach((post: any, index: number) => {
    const url = `https://www.rosterlab.com/blog/${post.slug}`;
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   URL: ${url}`);
    console.log(`   Published: ${new Date(post.publishedAt).toLocaleDateString()}`);
    console.log(`   Author: ${post.author || 'Unknown'}`);
    if (post.categories && post.categories.length > 0) {
      console.log(`   Categories: ${post.categories.join(', ')}`);
    }
    console.log('');
  });

  // Output as CSV for easy import to Google Sheets
  console.log('\n\n=== CSV FORMAT (for easy GA4 filtering) ===\n');
  console.log('Title,URL,Slug,Published Date,Author,Categories');
  posts.forEach((post: any) => {
    const url = `/blog/${post.slug}`;
    const categories = post.categories ? post.categories.join('; ') : '';
    const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US');
    console.log(`"${post.title}","${url}","${post.slug}","${publishedDate}","${post.author || 'Unknown'}","${categories}"`);
  });
}

listBlogPosts().catch(console.error);
