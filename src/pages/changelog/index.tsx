import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";
import Markdown from 'react-markdown';

import MdxLayout from '../../layouts/mdx';
import { H2, MdxComponents } from '../../components/MdxProvider';
import { isIndexPage } from '../../utils';

export default function Changelog(props: {location: Location}) {
    const data = useStaticQuery<{
      pages: {
        edges: {
          node: {
            id: string
            slug: string
            fileAbsolutePath: string
            frontmatter: {
              title: string
              date: string
            }
            rawBody: string
          }
        }[]
      }
    }>(graphql`
      query changelogPages {
        pages: allMdx(
          filter: {
            fileAbsolutePath: {regex: "/(changelog)/"}
          }
          sort: {
            fields: [frontmatter___date],
            order: DESC
          }
        ) {
          edges {
            node {
              __typename
              id
              slug
              fileAbsolutePath
              rawBody 
              frontmatter {
                title
                date
              }
              mdxAST
              body
            }
          }
        }
      }
  `);

  const pages = data.pages.edges.map(edge => edge.node);
  const count = pages.length;

  return (
    <MdxLayout
      location={props.location}
      path="/changelog"
      pageContext={{
        frontmatter: {
          title: 'Changelog',
          description: 'Changelog for Cripto products'
        }
      }}
    >
      <div>
        {data.pages.edges.map(edge => edge.node).filter(node => !isIndexPage(node)).map((node, index) => (
          <React.Fragment>
            <div key={node.id}>
              <Link to={`/${node.slug}/`} className="no-underline">
                <H2 className="m-0">{node.frontmatter.title}</H2>
              </Link>
              <em>{new Intl.DateTimeFormat(undefined, {dateStyle: 'full'}).format(new Date(node.frontmatter.date))}</em>

              <IncludedMarkdown
                source={node.rawBody}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </MdxLayout>
  )
}

function IncludedMarkdown(props: {
  source: string
}) {
  const source = 
    props.source
      .replace(/---([\S\s]+?)---/m, '')
      .replace(/^import (.+)$/gm, '')
      .replace(/^export (.+)$/gm, '');
  return (
    <Markdown
      source={source}
      renderers={{
        Code: MdxComponents.code,
        CodeBlock: MdxComponents.CodeBlock,
        Paragraph: MdxComponents.Paragraph,
        Heading: (props) => {
          if (props.level === '2') {
            return <MdxComponents.h2 {...props} />;
          }
          if (props.level === '3') {
            return <MdxComponents.h3 {...props} />;
          }
          return <h4 {...props}>{props.children}</h4>
        },
        List: (props) => {
          if (props.type === 'Bullet') {
            return <MdxComponents.ol {...props} />;
          }
          return <MdxComponents.ul {...props} />;
        }
      }}
    />
  )
}