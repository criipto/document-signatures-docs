import React, {useEffect, useState} from "react";

import { H3, Paragraph } from "./MdxProvider";
import URLCodeBlock from './URLCodeBlock';
import {PROVIDERS} from '../utils/auth-methods';
import { Link } from "gatsby";

const ACTION_SUPPORTING_ACR_VALUES = [
  'urn:grn:authn:dk:mitid:low',
  'urn:grn:authn:dk:mitid:substantial',
  'urn:grn:authn:dk:mitid:high',
  'urn:grn:authn:dk:mitid:business',
  'urn:grn:authn:se:bankid:same-device',
  'urn:grn:authn:se:bankid:another-device',
  'urn:grn:authn:se:bankid:another-device:qr',
];

const MESSAGE_SUPPORTING_ACR_VALUES = [
  'urn:grn:authn:dk:mitid:low',
  'urn:grn:authn:dk:mitid:substantial',
  'urn:grn:authn:dk:mitid:high',
  'urn:grn:authn:dk:mitid:business',
  'urn:grn:authn:se:bankid:same-device',
  'urn:grn:authn:se:bankid:another-device',
  'urn:grn:authn:se:bankid:another-device:qr',
];

const actions = ['login', 'confirm', 'accept', 'approve', 'sign'] as const;
type Action = typeof actions[number];

const prompts = ["login", "none", "consent", "consent_revoke"] as const;
type Prompt = typeof prompts[number];

interface AuthorizeURLOptions {
  domain: string,
  client_id: string
  redirect_uri: string,
  response_type: "code" | "id_token",
  response_mode: "query" | "fragment",
  acr_values: string[],
  acr_values_quirk: "none" | "login_hint" | "path",
  nonce: string,
  state: string | null,
  login_hint: string | null,
  availableScopes : string[]
  selectedScopes : string []
  scopes_quirk : "none" | "login_hint"
  prompt: Prompt | null
  action: Action | null,
  message: string | null
}

const isBrowser = typeof window !== "undefined";

function randomUUID() {
  if (!isBrowser) return '';
  if (window.crypto.getRandomValues !== undefined) return window.crypto.randomUUID();
  return (Math.random() + 1).toString(36).substring(2) + (Math.random() + 1).toString(36).substring(2) + (Math.random() + 1).toString(36).substring(2);
}

export default function AuthorizeURLBuilder(props: {
  acr_values?: string[]
  login_hint?: string
  scope?: string[]

  quirks?: boolean
}) {
  const [options, setOptions] = useState<AuthorizeURLOptions>({
    domain: 'criipto-verify-prod.criipto.id',
    client_id: 'urn:criipto:dev',
    redirect_uri: 'https://jwt.io',
    response_type: 'id_token',
    response_mode: 'fragment',
    acr_values: props.acr_values ?? [],
    acr_values_quirk: "none",
    nonce: `ecnon-${randomUUID()}`,
    state: null,
    login_hint: props.login_hint ?? null,
    availableScopes: [],
    selectedScopes : props.scope ?? [],
    scopes_quirk : 'none',
    prompt: null,
    action: null,
    message: null
  });

  useEffect(() => {
    if (!isBrowser) return;
    const url = new URL(location.href);
    const domain = url.searchParams.get('domain');
    const client_id = url.searchParams.get('client_id');
    const redirect_uri = url.searchParams.get('redirect_uri');
    const acr_values = url.searchParams.get('acr_values')?.split(" ");
    const action = url.searchParams.get('action') as Action | null;
    const prompt = url.searchParams.get('prompt') as Prompt | null;
    setOptions(options => ({
      ...options,
      domain: domain ?? options.domain,
      client_id: client_id ?? options.client_id,
      redirect_uri: redirect_uri ?? options.redirect_uri,
      acr_values: acr_values ?? options.acr_values,
      action: action ?? options.action,
      message: url.searchParams.get('message') ?? options.message,
      prompt: prompt ?? options.prompt
    }));
  }, []);

  const supportsAction =
    options.acr_values.length === 1 ? ACTION_SUPPORTING_ACR_VALUES.includes(options.acr_values[0]) :
    options.acr_values.length >= 2 ? options.acr_values.some(v => ACTION_SUPPORTING_ACR_VALUES.includes(v)) :
    true;
  const supportsMessage =
    options.acr_values.length === 1 ? MESSAGE_SUPPORTING_ACR_VALUES.includes(options.acr_values[0]) :
    options.acr_values.length >= 2 ? options.acr_values.some(v => MESSAGE_SUPPORTING_ACR_VALUES.includes(v)) :
    false;

  const updateOption = (key: keyof AuthorizeURLOptions, event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setOptions(options => ({
      ...options,
      [key]: event.target.value
    }));
  }

  const updateBooleanOption = (key: keyof AuthorizeURLOptions, event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(options => ({
      ...options,
      [key]: event.target.checked
    }));
  }

  const toggleAcrValue = (acrValue: string) => {
    setOptions(options => {
      let acr_values = options.acr_values;

      if (acr_values.includes(acrValue)) {
        acr_values = acr_values.filter(s => s !== acrValue);
      } else {
        acr_values = acr_values.concat([acrValue]);
      }

      return {
        ...options,
        acr_values
      };
    });
  }

  useEffect(() => {
    let scopeCandidates =
      options.acr_values.flatMap(acrValue => {
        return PROVIDERS.flatMap(provider => {
          return provider.authMethods.filter(am => am.acrValue === acrValue);
        })
      }).map(authMethod => authMethod.scopes || []);

    let seed = scopeCandidates.shift() || [];
    let availableScopes = scopeCandidates.reduce((memo, ary) => {
      return memo.filter(i => ary.includes(i));
    }, seed);

    let selectedScopes =
      options.selectedScopes.filter(selScope => {
        return availableScopes.includes(selScope);
      });

    setOptions(options => ({
      ...options,
      availableScopes,
      selectedScopes
    }))
  }, [options.acr_values]);

  const toggleScope = (scope : string) => {
    setOptions(options => {
      let selectedScopes = options.selectedScopes;
      if (selectedScopes.includes(scope)) {
        selectedScopes = selectedScopes.filter(s => s !== scope);
      } else {
        selectedScopes = selectedScopes.concat([scope]);
      }
      return {
        ...options,
        selectedScopes
      };
    })
  }

  const url = new URL(`https://${options.domain}/oauth2/authorize?scope=openid`);
  
  let key : keyof AuthorizeURLOptions;
  for (key in options) {
    if (key == 'acr_values') continue;
    if (key == 'acr_values_quirk') continue;
    if (key == 'domain') continue;
    if (key == 'availableScopes') continue;
    if (key == 'selectedScopes') continue;
    if (key == 'scopes_quirk') continue;
    if (key == 'action') continue;
    if (key == 'message') continue;
    if (key == 'login_hint') continue;
    if (!options[key]) continue;
    url.searchParams.set(key, options[key]!);
  }

  let loginHint = options.login_hint ? [options.login_hint ] : [];
  if (options.acr_values.length) {
    if (options.acr_values_quirk == 'login_hint' && options.acr_values.length === 1) {
      loginHint.unshift(`acr_values:${options.acr_values.join(' ')}`);
    } else if (options.acr_values_quirk == 'path' && options.acr_values.length === 1) {
      url.pathname = `${btoa(options.acr_values[0])}/oauth2/authorize`;
    } else {
      url.searchParams.set('acr_values', options.acr_values.join(' '));
    }
  }

  if (options.selectedScopes.length) {
    if (options.scopes_quirk == 'login_hint') {
      let tokens = options.selectedScopes.map(s => `scope:${s}`);
      loginHint.unshift(`${tokens.join(' ')}`);
    } else {
      url.searchParams.set('scope', `openid ${options.selectedScopes.join(' ')}`);
    }
  }

  if (supportsAction && options.action) {
    loginHint.push(`action:${options.action}`);
  }

  if (supportsMessage && options.message) {
    loginHint.push(`message:${btoa(options.message)}`);
  }

  if (loginHint.length > 0) {
    url.searchParams.set('login_hint', loginHint.join(' '));
  }

  return (
    <React.Fragment>
      <H3>General parameters</H3>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="domain">
            Domain
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="domain"
            type="text"
            placeholder="Domain"
            value={options.domain}
            onChange={(event) => updateOption('domain', event)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="clientID">
            Client ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="clientID"
            type="text"
            placeholder="Client ID"
            value={options.client_id}
            onChange={(event) => updateOption('client_id', event)}
          />
          <small>Also known as 'realm'</small>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="redirectURI">
            Redirect URI
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="redirectURI"
            type="text"
            placeholder="Redirect URI"
            value={options.redirect_uri}
            onChange={(event) => updateOption('redirect_uri', event)}
          />
          <small>Also known as 'Callback URL'</small>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="responseType">
            Response type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="responseType"
            placeholder="Response type"
            value={options.response_type}
            onChange={(event) => updateOption('response_type', event)}
          >
            <option value="code">code</option>
            <option value="id_token">id_token</option>
          </select>
          <small>`code` is the recommended response_type and enables PKCE and back-channel flows. `id_token` is deprecated but usefull for debugging with `https://jwt.io`</small>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="responseMode">
            Response mode
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="responseMode"
            placeholder="Response Mode"
            value={options.response_mode}
            onChange={(event) => updateOption('response_mode', event)}
          >
            <option value="query">query</option>
            <option value="fragment">fragment</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nonce">
            Nonce
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nonce"
            type="text"
            placeholder="Nonce"
            value={options.nonce}
            onChange={(event) => updateOption('nonce', event)}
          />
          <small>Should be a cryptographically strong value</small>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="prompt">
            Prompt
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prompt"
            placeholder="Prompt"
            value={options.prompt || ""}
            onChange={(event) => updateOption('prompt', event)}
          >
            <option value="">Not set</option>
            {prompts.map(prompt => (
                <option key={prompt} value={prompt}>{prompt}</option>
              ))}
          </select>
          {options.prompt === 'login' ? (
            <small>`prompt=login` will force a login regardless of SSO state.</small>
          ) : options.prompt === 'none' ? (
            <small>`prompt=none` will use existing SSO session or fail with `login_required`.</small>
          ) : options.prompt === 'consent_revoke' ? (
            <small>`prompt=consent_revoke` will revoke any existing SSN consent.</small>
          ) : null}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="state">
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            placeholder="state"
            value={options.state ?? ''}
            onChange={(event) => updateOption('state', event)}
          />
          <small>Can be any value supplied by your application, often used to carry information about the original users session.</small>
        </div>

        {props.acr_values && props.acr_values.every(s => s === 'urn:age-verification') ? (
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="country">
              Country
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              placeholder="Country"
              value={options.login_hint ?? undefined}
              onChange={(event) => updateOption('login_hint', event)}
            >
              <option value="country:DK">DK</option>
              <option value="country:SE">SE</option>
              <option value="country:NO">NO</option>
              <option value="country:FI">FI</option>
            </select>
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="login_hint">
              Login hint
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="login_hint"
              type="text"
              placeholder="login_hint"
              value={options.login_hint ?? ''}
              onChange={(event) => updateOption('login_hint', event)}
            />
            <small>Login hints are used for <a href="/verify/guides/prefilled-fields/">prefilling values</a>, <a href="/verify/guides/appswitch/">triggering appswitch</a> and eID unique features like `message` (see example below after picking MitID)</small>
          </div>
        )}
      </div>
        
      {props.acr_values === undefined ? (
        <>
          <H3>Auth methods / acr values</H3>
          <Paragraph>
            You can click the individual eID headlines or use the navigation to your left to learn more about each eID.
          </Paragraph>
          <Paragraph>
            If you select multiple (or zero) eIDs the user will be presented with a landing page where they can use their eID of choice.
          </Paragraph>
          <Paragraph>
            Some features, like <strong>input prefill</strong> and <strong>acr_values quirk handling</strong> is only available if you only select a <strong>single acr_values</strong>
          </Paragraph>
          <div className="mb-4 grid grid-cols-4 gap-4">
            {PROVIDERS.map(provider => (
              <div>
                <Link to={provider.page} className="font-medium no-underline text-sm" title={`Learn more about ${provider.title}`} target="_blank">{provider.title}</Link><br />
                {provider.authMethods.map(authMethod => (
                  <label className="text-gray-700 text-sm block my-2">
                    <input
                      type="checkbox"
                      id={authMethod.acrValue}
                      className="mr-2"
                      checked={options.acr_values.includes(authMethod.acrValue)}
                      onChange={() => toggleAcrValue(authMethod.acrValue)}
                    />
                    {authMethod.title}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : null}

      {options.availableScopes.length > 0 ? (
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            scopes
          </label>
          {options.availableScopes.map(scope => (
            <label className="text-gray-700 text-sm block my-2">
                <input
                  type="checkbox"
                  id={scope}
                  className="mr-2"
                  checked={options.selectedScopes.includes(scope)}
                  onChange={() => toggleScope(scope)}
                />
                {scope}
            </label>
          ))}
        </div>
      ) : null}

      <div className="mb-4 grid grid-cols-2 gap-4">
        {props.quirks !== false && options.availableScopes.length > 0 ? (
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="scopes_quirk">
              scopes quirk handling
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="scopes_quirk"
              placeholder="scopes quirk handling"
              value={options.scopes_quirk}
              onChange={(event) => updateOption('scopes_quirk', event)}
            >
              <option value="none">none</option>
              <option value="login_hint">login_hint</option>
            </select>
            <small>
              Some integrations, like Auth0, require that you pass scopes through the login_hint.<br />
            </small>
          </div>
        ) : null}

        {props.quirks !== false && options.acr_values.length == 1 ? (
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="acr_values_quirk">
              acr_values quirk handling
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="acr_values_quirk"
              placeholder="acr_values quirk handling"
              value={options.acr_values_quirk}
              onChange={(event) => updateOption('acr_values_quirk', event)}
            >
              <option value="none">none</option>
              <option value="login_hint">login_hint</option>
              <option value="path">path</option>
            </select>
            <small>
              Some integrations, like Auth0, require that you pass acr_values through the login_hint instead.<br />
              For integrations that do not allow you to define acr_values nor login_hint you can use the value base64 encoded in the path segment.<br />
              (only supported with a single selected acr_value)
            </small>
          </div>
        ) : null}

        {supportsAction && (
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="action">
              Action
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="action"
              placeholder="Action"
              value={options.action || ""}
              onChange={(event) => updateOption('action', event)}
            >
              {actions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
            <small>Setting action will change header texts on Criipto pages and also the action text inside the MitID login box.</small>
          </div>
        )}

        {supportsMessage && (
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
              Message
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              type="text"
              placeholder="Message"
              value={options.message || ""}
              onChange={(event) => updateOption('message', event)}
            />
          <small>
              DK MitID/SE BankID only. Will display a message to the end user in the app.
              <br />
              The maximum message length depends on the eID provider:
              <br />
              For SE BankID, the limit is 1500 characters <em>after base64 encoding.</em>
              <br />
              For MitID, our tests indicate a limit of 130 characters <em>before base64 encoding.</em>
            </small>
          </div>
        )}
      </div>

      <URLCodeBlock url={url} />
    </React.Fragment>
  );
}