export function isIndexPage(node: {fileAbsolutePath: string}) {
  return node.fileAbsolutePath.endsWith('index.mdx') || node.fileAbsolutePath.endsWith('index.tsx');
}