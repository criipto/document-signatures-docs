import React, { useMemo } from 'react';
import { MDXProvider } from "@mdx-js/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useLocation } from '@reach/router';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function useQueryParams() {
  const location = useLocation();
  const params = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location]);
  return params;
}

function replaceParams(input: string, params: URLSearchParams) {
  input = input.replace(/{{YOUR_CRIIPTO_DOMAIN}}/g, params.get('verify_domain') ?? '{{YOUR_CRIIPTO_DOMAIN}}');
  input = input.replace(/{{YOUR_CLIENT_ID}}/g, params.get('verify_client_id') ?? '{{YOUR_CLIENT_ID}}');
  return input;
}

export const textToId = function (input: string) {
  if (input.toLowerCase == undefined) console.error(input);
  if (input.includes('#') && !input.endsWith('#')) {
    return input.split('#')[1].trim();
  }
  return input.toLowerCase().replace(/\s/g, '-').replace(/([^a-zA-Z0-9-])/g, '');
}
export function parseHeader(input: string) {
  const id = textToId(input);
  return input.replace(`#${id}`, '').trim();
}
export const H2 = (props: {children: string}) => (
  <h2 {...props} className="group flex whitespace-pre-wrap -ml-4 pl-4">
    <a id={textToId(props.children)} className="relative top-[-150px] lg:top-[-90px]"/>
    <a
      href={`#${textToId(props.children)}`}
      className="absolute -ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100 z-30"
      aria-label="Anchor"
    >​
      <div className="w-6 h-6 text-gray-400 ring-1 ring-gray-900/5 rounded-md shadow-sm flex items-center justify-center hover:ring-gray-900/10 hover:shadow hover:text-gray-700">
        <svg width="12" height="12" fill="none" aria-hidden="true">
          <path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </div>
    </a>
    {parseHeader(props.children)}
  </h2>
);

export const H3 = (props: {children: string}) => (
  <h3 {...props} className="group flex whitespace-pre-wrap -ml-4 pl-4">
    <a id={textToId(props.children)} className="relative top-[-150px] lg:top-[-90px]" />
    <a
      href={`#${textToId(props.children)}`}
      className="absolute -ml-10 flex items-center opacity-0 border-0 group-hover:opacity-100"
      aria-label="Anchor"
    >​
      <div className="w-6 h-6 text-gray-400 ring-1 ring-gray-900/5 rounded-md shadow-sm flex items-center justify-center hover:ring-gray-900/10 hover:shadow hover:text-gray-700">
        <svg width="12" height="12" fill="none" aria-hidden="true">
          <path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </div>
    </a>
    {parseHeader(props.children)}
  </h3>
);

const Text = (props: {text: string}) => {
  return <React.Fragment>{props.text}</React.Fragment>;
}

export const CodeBlock = (props: {text: string, className?: string}) => {
  return (
    <pre className={props.className}>
      <code>{props.text}</code>
    </pre>
  );
}

export const Pre = (props: {children: React.ReactNode}) => {
  const child = React.Children.only(props.children);

  if (child && typeof child === "object" && "props" in child) {
    if (child.props.mdxType === "code") {
      return props.children; // Let syntax highlighter handle it.
    }
  }

  return <pre>{props.children}</pre>;
}

export const Code = (props: {className?: string, children: string}) => {
  const params = useQueryParams();
  const language = props.className?.startsWith('language-') ? props.className.replace('language-', '') : undefined;
  const text = replaceParams(props.children, params);

  if (language && SyntaxHighlighter.supportedLanguages.includes(language)) {
    return (
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        customStyle={{
          padding: '0.85em 1.14em'
        }}
      >
        {text}
      </SyntaxHighlighter>
    )
  }

  return (
    <pre style={{background: 'rgb(30, 30, 30)', color: 'rgb(220, 220, 220)'}}>
      <code>{text}</code>
    </pre>
  );
}

export const InlineCode = (props: {children: React.ReactNode}) => {
  const params = useQueryParams();
  const children = typeof props.children === "string" ? replaceParams(props.children as string, params) : props.children;
  return <span className="not-prose"><code className="bg-gray-100 py-0.5 px-1.5 rounded-md font-semibold text-sm">{children}</code></span>;
};

export const Highlight = (props: {children: React.ReactNode, icon?: string, warning?: boolean}) => {
  return (
    <div className={`mdx-highlight bg-gray-200 ${props.warning ? 'bg-yellow-100' : ''} rounded-md p-4 max-w-screen-md ${props.icon ? 'relative pl-10' : ''}`}>
      {props.icon ? (
        <FontAwesomeIcon className="absolute left-4 top-4 text-2xl" icon={`fa-solid fa-${props.icon}` as any} />
      ) : null}
      {props.children}
    </div>
  );
}

export const Paragraph = (props: any) => (<p {...props} className="max-w-screen-md">{props.children}</p>)

export const ImageContainer = (props: {children: React.ReactNode, maxWidth?: number}) => {
  return (<div style={{maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined}}>{props.children}</div>);
}

export const QueryParam = (props: {param: string, fallback?: string}) => {
  const {param, fallback} = props;
  const params = useQueryParams();
  return params.get(param) ?? fallback;
};

const components = {
  h2: H2,
  h3: H3,
  Text,
  CodeBlock,
  code: Code,
  pre: Pre,
  inlineCode: InlineCode,
  Highlight,
  ImageContainer,
  p: Paragraph,
  ol: (props: any) => (<ol {...props} className="max-w-screen-md">{props.children}</ol>),
  ul: (props: any) => (<ul {...props} className="max-w-screen-md">{props.children}</ul>),
  QueryParam
}

export default function CustomMDXProvider(props: {children: any}) {
  return (
    <MDXProvider components={components}>
      {props.children}
    </MDXProvider>
  );
}