import React, {useState} from 'react';
import GraphQLExplorer from './GraphQLExplorer';
import {CodeBlock} from './MdxProvider';

import { ExampleData } from '../state/store';
import { useAppSelector } from '../state/hooks';

interface Example {
  query: string,
  variables?: (() => any) | ((data: ExampleData) => any)
}
interface Props {
  example: Example
}
export default function GraphQLExample(props: Props) {
  const [hasSkipped, setSkipped] = useState(false);
  const data = useAppSelector(state => state.exampleData);
  const variables = props.example.variables ? JSON.stringify(props.example.variables(data), null, 2) : null;
  const query = props.example.query.trim();

  return (
    <React.Fragment>
      <CodeBlock text={'# Query\n'+query} className={hasSkipped ? 'block' : 'block lg:hidden'} />
      {variables && (<CodeBlock text={'# Variables\n'+variables} className={hasSkipped ? 'block' : 'block lg:hidden'} />)}
      <GraphQLExplorer query={query} variables={variables} className={hasSkipped ? 'hidden' : 'hidden lg:block'} onSkipCredentials={() => setSkipped(true)} />
    </React.Fragment>
  )
}