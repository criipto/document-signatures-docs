import { GatsbyBrowser } from 'gatsby';
import './src/styles/global.css';
import "@fontsource/ibm-plex-sans";
import 'graphiql/graphiql.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import wrapWithProvider from "./src/state/wrap-with-provider";
export const wrapRootElement : GatsbyBrowser["wrapRootElement"] = wrapWithProvider;
library.add(fas);