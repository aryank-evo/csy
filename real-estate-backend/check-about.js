import { CmsPage } from './src/config/database';

async function checkAboutPages() {
  try {
    console.log('=== Checking all CMS pages ===');
    const allPages = await CmsPage.findAll({ attributes: ['id', 'slug', 'title'] });
    console.log('All CMS pages:', allPages.map(p => p.slug));
    
    console.log('');
    console.log('=== Checking about-us page ===');
    const aboutPage = await CmsPage.findOne({ where: { slug: 'about-us' } });
    if (aboutPage) {
      console.log('About-us page found!');
      console.log('ID:', aboutPage.id);
      console.log('Slug:', aboutPage.slug);
      console.log('Title:', aboutPage.title);
      console.log('Has content:', !!aboutPage.content);
      console.log('Has aboutSubtitle:', !!aboutPage.aboutSubtitle);
      console.log('Has aboutDesc1:', !!aboutPage.aboutDesc1);
      console.log('Has aboutTitle1:', !!aboutPage.aboutTitle1);
      console.log('Content:', aboutPage.content ? aboutPage.content.substring(0, 100) : 'EMPTY');
    } else {
      console.log('About-us page NOT found in database');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkAboutPages();