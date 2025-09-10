import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import { VFileCompatible } from 'vfile'; // For the input type of unified().process()

function replaceImgTagsWithMarkdown(htmlContent: string): string {
  // Regular expression to match <div> tags wrapping <img> tags
  const divImgTagRegex = /<div[^>]*><img([^>]*)><\/div>/g;
  const imgTagRegex = /<img([^>]*)>/g;

  // Replace <div><img></div> tags first
  let markdownContent: string = htmlContent.replace(divImgTagRegex, (match, attributes) => {
    const altMatch = /alt="([^"]*)"/.exec(attributes);
    const srcMatch = /src="([^"]*)"/.exec(attributes);

    const altText: string = altMatch ? altMatch[1] : '';
    const src: string = srcMatch ? srcMatch[1] : '';

    return altText || src ? `![${altText}](${src})` : '';
  });

  // Then replace any remaining <img> tags that weren't wrapped in <div>
  markdownContent = markdownContent.replace(imgTagRegex, (match, attributes) => {
    const altMatch = /alt="([^"]*)"/.exec(attributes);
    const srcMatch = /src="([^"]*)"/.exec(attributes);

    const altText: string = altMatch ? altMatch[1] : 'Image alt Text';
    const src: string = srcMatch ? srcMatch[1] : '';

    return altText || src ? `![${altText}](${src})` : '';
  });

  return markdownContent;
}

async function markdownToHtml(markdown: string): Promise<string> {
  markdown = replaceImgTagsWithMarkdown(markdown);
  const result = await unified()
      .use(remarkParse)
      .use(remark2rehype)
      .use(html)
      .process(markdown as VFileCompatible); // Type assertion for unified process input
  return result.toString();
}

export default markdownToHtml;
