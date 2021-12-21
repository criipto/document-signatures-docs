import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";

import { NavigationQuery } from '../../gatsby-graphql-types';

const SIGNATURES_CATEGORIES = [
  "Getting Started",
  "GraphQL"
];

function slugToPath(slug: string) {
  return `/${slug}/`;
}

export default function Navigation() {
  const data = useStaticQuery<NavigationQuery>(graphql`
    query Navigation {
      signaturesPages: allMdx(
        filter: {
          frontmatter: {
            product: { eq: "document-signatures" }
          }
        }
        sort: { fields: [frontmatter___sort], order: ASC }
      ) {
        edges {
          node {
            __typename
            id
            slug
            frontmatter {
              title
              category
            }
          }
        }
      }
    }
  `);

  const signaturesPages = data.signaturesPages.edges.map(edge => edge.node);
  return (
    <ul>
      {SIGNATURES_CATEGORIES.map((category, index) => (
        <li key={category} className={index > 0 ? 'mt-12 lg:mt-8' : ''}>
          <h5 className="mb-8 lg:mb-3 font-semibold text-blue">{category}</h5>
          <ul className="space-y-6 lg:space-y-2 border-l border-gray-100">
            {signaturesPages.filter(node => node.frontmatter.category === category).map(page => (
              <li key={page.id}>
                <Link
                  to={slugToPath(page.slug)}
                  getProps={(props) => ({className: `block border-l pl-4 -ml-px border-transparent ${props.isCurrent ? 'text-blue border-current font-semibold' : 'hover:border-gray-400 text-gray-700 hover:text-gray-900'}`})}
                >
                  {page.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}