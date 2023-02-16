
type AuthMethod = {
  title: string
  acrValue: string
  scopes? : string[]
}

type Provider = {
  title: string
  authMethods: AuthMethod[]
  page: string
}

const dkScopes = ['address', 'ssn']
const noBankIdScopes = ['email', 'phone', 'address', 'ssn']
const noVippsScopes = ['email', 'phone', 'address', 'birthdate', 'ssn']

export const PROVIDERS : Provider[] = [
  {
    title: 'Finnish Trust Network',
    authMethods: [
      {
        title: 'BankID',
        acrValue: 'urn:grn:authn:fi:bank-id'
      },
      {
        title: 'Mobile certificate (Mobiilivarmenne)',
        acrValue: 'urn:grn:authn:fi:mobile-id'
      },
      {
        title: 'All (Both of the above)',
        acrValue: 'urn:grn:authn:fi:all'
      }
    ],
    page: '/verify/eids/finnish-trust-network'
  },
  {
    title: 'Danish NemID',
    authMethods: [
      {
        title: 'Personal with code card',
        acrValue: 'urn:grn:authn:dk:nemid:poces',
        scopes: dkScopes
      },
      {
        title: 'Employee with code card',
        acrValue: 'urn:grn:authn:dk:nemid:moces'
      },
      {
        title: 'Employee with code file',
        acrValue: 'urn:grn:authn:dk:nemid:moces:codefile'
      }
    ],
    page: '/verify/eids/danish-nemid'
  },
  {
    title: 'Danish MitID',
    authMethods: [
      {
        title: 'Low',
        acrValue: 'urn:grn:authn:dk:mitid:low',
        scopes: dkScopes
      },
      {
        title: 'Substantial',
        acrValue: 'urn:grn:authn:dk:mitid:substantial',
        scopes: dkScopes
      }
    ],
    page: '/verify/eids/danish-mitid'
  },
  {
    title: 'Swedish BankID',
    authMethods: [
      {
        title: 'Same device',
        acrValue: 'urn:grn:authn:se:bankid:same-device'
      },
      {
        title: 'QR Code',
        acrValue: 'urn:grn:authn:se:bankid:another-device:qr'
      }
    ],
    page: '/verify/eids/swedish-bankid'
  },
  {
    title: 'ItsME',
    authMethods: [
      {
        title: 'Basic',
        acrValue: 'urn:grn:authn:itsme:basic'
      },
      {
        title: 'Advanced',
        acrValue: 'urn:grn:authn:itsme:advanced'
      }
    ],
    page: '/verify/eids/itsme'
  },
  {
    title: 'Norwegian BankID',
    authMethods: [{
      title: 'Norwegian BankID',
      acrValue: 'urn:grn:authn:no:bankid',
      scopes: noBankIdScopes
    },
    {
      title: 'Norwegian BankID Biometrics',
      acrValue: 'urn:grn:authn:no:bankid:substantial',
      scopes: noBankIdScopes
    }],
    page: '/verify/eids/norwegian-bankid'
  },
  {
    title: 'Norwegian Vipps',
    authMethods: [{
      title: 'Norwegian Vipps',
      acrValue: 'urn:grn:authn:no:vipps',
      scopes: noVippsScopes
    }],
    page: '/verify/eids/norwegian-vipps'
  },
  {
    title: 'Belgium',
    authMethods: [
      {
        title: 'Verified eID',
        acrValue: 'urn:grn:authn:be:eid:verified'
      }
    ],
    page: '/verify/eids/belgian-eid'
  },
  {
    title: 'Germany',
    authMethods: [
      {
        title: 'Sofort (with Schufa check)',
        acrValue: 'urn:grn:authn:de:sofort'
      }
    ],
    page: '/verify/eids/sofort'
  }
];