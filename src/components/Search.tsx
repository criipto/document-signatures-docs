import React, {useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Snippet, Highlight, connectHits } from 'react-instantsearch-dom';
import { Link } from 'gatsby';

interface HighlightTableOfContentsItem {
  title: {
    value: string,
    matchedWords: string[]
  }
  url: {
    value: string
  }
  items?: HighlightTableOfContentsItem[]
}

interface TableOfContentsItem {
  title: string
  url: string
  items?: TableOfContentsItem
}

interface Hit {
  objectID: string
  product: string
  category: string | undefined
  title: string
  subtitle: string | undefined
  slug: string

  tableOfContents?: {
    items?: TableOfContentsItem[]
  }

  _highlightResult: {
    tableOfContents?: {
      items?: HighlightTableOfContentsItem[]
    }
  }
}

interface HitProps {
  hit: Hit;
  onClick?: React.MouseEventHandler
}

function upperFirst(input: string) {
  if (!input) return input;
  return input.substr(0, 1).toUpperCase() + input.substr(1);
}

export const Hit = ({ hit, onClick }: HitProps) => {
  const path = `/${hit.slug}/`;

  const toc = hit.tableOfContents?.items?.map((item, i) => {
    return {
      ...item,
      hasMatch: hit._highlightResult.tableOfContents?.items?.[i].title?.matchedWords?.length || false
    }
  }).filter(t => t.hasMatch) || [];
  return (
    <div className="mb-4" onClick={onClick}>
      <Link to={path} className="block text-xl font-extrabold text-gray-900 tracking-tight mb-0 mt-0 no-underline">
        <Highlight attribute="title" hit={hit} tagName="mark" /> - {hit.category}
      </Link>

      <Link to={path} className="no-underline">
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      </Link>

      {toc.length ? (
        <ul>
          {toc.map(c => 
            <li key={c.url}>
              <Link to={`${path}${c.url}`}>
                {c.title}
              </Link>
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
}

interface SearchProps {
  onHide?: () => void
  query?: string
}

export default function Search(props: SearchProps) {
  const [query, setQuery] = useState(props.query || '');

  return (
    <InstantSearch searchState={{query}} searchClient={algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID!, process.env.GATSBY_ALGOLIA_SEARCH_KEY!)} indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME!}>
      <SearchBox autoFocus className="mb-2" onChange={(event) => setQuery((event.target as any).value)} />
      {query.length ? <Hits onHitClick={props.onHide} /> : null}
    </InstantSearch>
  );
}

type HitsProps = {
  hits: Hit[],
  onHitClick?: React.MouseEventHandler
};

type HitProductGroup = {
  [key: string]: Hit[]
}

function HitsComponent(props: HitsProps) {
  const productGroups = props.hits.reduce((groups : HitProductGroup, hit) => {
    if (!hit.product || !hit.title) return groups;
    groups[hit.product] = groups[hit.product] || [];
    groups[hit.product].push(hit);
    return groups;
  }, {});

  return (
    <div>
      {Object.keys(productGroups).map(product => (
        <div key={product}>
          <h2 className="block text-lg tracking-tight mb-4 mt-4 no-underline font-semibold text-blue">
            Criipto {upperFirst(product)}
          </h2>
            {productGroups[product].map((hit) => (
              <Hit hit={hit} key={hit.objectID} onClick={props.onHitClick} />
            ))}
        </div>
      ))}
    </div>
  );
}

const Hits = connectHits<any, Hit>(HitsComponent);