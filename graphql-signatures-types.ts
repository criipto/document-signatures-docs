export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Blob` scalar type represents a byte array. The Blob type appears in a JSON response as a Base64 String. */
  Blob: any;
  /** The `Date` scalar type represents a Date value with Time component. The Date type appears in a JSON response as a String representation compatible with ISO-8601 format. */
  Date: any;
  /** The `DateTime` scalar type represents a Date value with Time component. The Date type appears in a JSON response as a String representation compatible with ISO-8601 format. */
  DateTime: any;
  /** The `URI` scalar type represents a string resource identifier compatible with URI standard. The URI type appears in a JSON response as a String. */
  URI: any;
};

export type AddSignatoriesInput = {
  signatories: Array<CreateSignatureOrderSignatoryInput>;
  signatureOrderId: Scalars['ID'];
};

export type AddSignatoriesOutput = {
  __typename?: 'AddSignatoriesOutput';
  signatories: Array<Signatory>;
  signatureOrder: SignatureOrder;
};

export type AddSignatoryInput = {
  documents?: InputMaybe<Array<SignatoryDocumentInput>>;
  /** Selectively enable evidence providers for this signatory. */
  evidenceProviders?: InputMaybe<Array<SignatoryEvidenceProviderInput>>;
  evidenceValidation?: InputMaybe<Array<SignatoryEvidenceValidationInput>>;
  /** Will not be displayed to signatories, can be used as a reference to your own system. */
  reference?: InputMaybe<Scalars['String']>;
  signatureOrderId: Scalars['ID'];
};

export type AddSignatoryOutput = {
  __typename?: 'AddSignatoryOutput';
  signatory: Signatory;
  signatureOrder: SignatureOrder;
};

export type AnonymousViewer = Viewer & {
  __typename?: 'AnonymousViewer';
  authenticated: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type Application = Viewer & {
  __typename?: 'Application';
  apiKeys: Array<ApplicationApiKey>;
  id: Scalars['ID'];
  name: Scalars['String'];
  signatureOrders: SignatureOrderConnection;
  /** Tenants are only accessable from user viewers */
  tenant?: Maybe<Tenant>;
  verifyApplication: VerifyApplication;
};


export type ApplicationSignatureOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<SignatureOrderStatus>;
};

export type ApplicationApiKey = {
  __typename?: 'ApplicationApiKey';
  clientId: Scalars['String'];
  clientSecret?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mode: ApplicationApiKeyMode;
  note?: Maybe<Scalars['String']>;
};

export enum ApplicationApiKeyMode {
  ReadOnly = 'READ_ONLY',
  ReadWrite = 'READ_WRITE'
}

export type CancelSignatureOrderInput = {
  signatureOrderId: Scalars['ID'];
};

export type CancelSignatureOrderOutput = {
  __typename?: 'CancelSignatureOrderOutput';
  signatureOrder: SignatureOrder;
};

export type ChangeSignatoryInput = {
  documents?: InputMaybe<Array<SignatoryDocumentInput>>;
  /** Selectively enable evidence providers for this signatory. */
  evidenceProviders?: InputMaybe<Array<SignatoryEvidenceProviderInput>>;
  evidenceValidation?: InputMaybe<Array<SignatoryEvidenceValidationInput>>;
  /** Will not be displayed to signatories, can be used as a reference to your own system. */
  reference?: InputMaybe<Scalars['String']>;
  signatoryId: Scalars['ID'];
};

export type ChangeSignatoryOutput = {
  __typename?: 'ChangeSignatoryOutput';
  signatory: Signatory;
  signatureOrder: SignatureOrder;
};

export type CleanupSignatureOrderInput = {
  signatureOrderId: Scalars['ID'];
};

export type CleanupSignatureOrderOutput = {
  __typename?: 'CleanupSignatureOrderOutput';
  signatureOrder: SignatureOrder;
};

export type CloseSignatureOrderInput = {
  /** Retains documents on Criipto servers after closing a signature order. You MUST manually call the cleanupSignatureOrder mutation when you are sure you have downloaded the blobs. Maximum value is 7 days. */
  retainDocumentsForDays?: InputMaybe<Scalars['Int']>;
  signatureOrderId: Scalars['ID'];
};

export type CloseSignatureOrderOutput = {
  __typename?: 'CloseSignatureOrderOutput';
  signatureOrder: SignatureOrder;
};

export type CreateApplicationApiKeyInput = {
  applicationId: Scalars['ID'];
  mode?: InputMaybe<ApplicationApiKeyMode>;
  note?: InputMaybe<Scalars['String']>;
};

export type CreateApplicationApiKeyOutput = {
  __typename?: 'CreateApplicationApiKeyOutput';
  apiKey: ApplicationApiKey;
  application: Application;
};

export type CreateApplicationInput = {
  name: Scalars['String'];
  tenantId: Scalars['ID'];
  verifyApplicationDomain: Scalars['String'];
  verifyApplicationEnvironment: VerifyApplicationEnvironment;
  verifyApplicationRealm: Scalars['String'];
};

export type CreateApplicationOutput = {
  __typename?: 'CreateApplicationOutput';
  apiKey: ApplicationApiKey;
  application: Application;
  tenant: Tenant;
};

export type CreateSignatureOrderInput = {
  /** By default signatories will be prompted to sign with a Criipto Verify based eID, this setting disables it. */
  disableVerifyEvidenceProvider?: InputMaybe<Scalars['Boolean']>;
  documents: Array<DocumentInput>;
  /** Define evidence providers for signature order if not using built-in Criipto Verify for eIDs */
  evidenceProviders?: InputMaybe<Array<EvidenceProviderInput>>;
  /** When this signature order will auto-close/expire. Default 90 days. */
  expiresInDays?: InputMaybe<Scalars['Int']>;
  /** Attempt to automatically fix document formatting errors if possible. Default 'true'. */
  fixDocumentFormattingErrors?: InputMaybe<Scalars['Boolean']>;
  /** Max allowed signatories (as it influences pages needed for seals). Default 14. */
  maxSignatories?: InputMaybe<Scalars['Int']>;
  signatories?: InputMaybe<Array<CreateSignatureOrderSignatoryInput>>;
  /** Configure appearance of signatures inside documents */
  signatureAppearance?: InputMaybe<SignatureAppearanceInput>;
  /** Timezone to render signature seals in, default UTC. */
  timezone?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  /** Various settings for how the UI is presented to the signatory. */
  ui?: InputMaybe<CreateSignatureOrderUiInput>;
  /** Signature order webhook settings */
  webhook?: InputMaybe<CreateSignatureOrderWebhookInput>;
};

export type CreateSignatureOrderOutput = {
  __typename?: 'CreateSignatureOrderOutput';
  application: Application;
  signatureOrder: SignatureOrder;
};

export type CreateSignatureOrderSignatoryInput = {
  documents?: InputMaybe<Array<SignatoryDocumentInput>>;
  /** Selectively enable evidence providers for this signatory. */
  evidenceProviders?: InputMaybe<Array<SignatoryEvidenceProviderInput>>;
  evidenceValidation?: InputMaybe<Array<SignatoryEvidenceValidationInput>>;
  /** Will not be displayed to signatories, can be used as a reference to your own system. */
  reference?: InputMaybe<Scalars['String']>;
};

export type CreateSignatureOrderUiInput = {
  /** Removes the UI options to reject a document or signature order. */
  disableRejection?: InputMaybe<Scalars['Boolean']>;
  /** The language of texts rendered to the signatory. */
  language?: InputMaybe<Language>;
  /** Define a logo to be shown in the signatory UI. */
  logo?: InputMaybe<SignatureOrderUiLogoInput>;
  /** The signatory will be redirected to this URL after signing or rejected the signature order. */
  signatoryRedirectUri?: InputMaybe<Scalars['String']>;
  /** Add stylesheet/css via an absolute HTTPS URL. */
  stylesheet?: InputMaybe<Scalars['String']>;
};

export type CreateSignatureOrderWebhookInput = {
  /** Webhook url. POST requests will be executed towards this URL on certain signatory events. */
  url: Scalars['String'];
};

/** Criipto Verify based evidence for signatures. */
export type CriiptoVerifyProviderInput = {
  acrValues?: InputMaybe<Array<Scalars['String']>>;
  alwaysRedirect?: InputMaybe<Scalars['Boolean']>;
  /** Messages displayed when performing authentication (only supported by DKMitID currently). */
  message?: InputMaybe<Scalars['String']>;
  /** Enforces that signatories sign by unique evidence by comparing the values of previous evidence on the key you define. For Criipto Verify you likely want to use `sub` which is a unique pseudonym value present in all eID tokens issued. */
  uniqueEvidenceKey?: InputMaybe<Scalars['String']>;
};

export type CriiptoVerifySignatureEvidenceProvider = {
  __typename?: 'CriiptoVerifySignatureEvidenceProvider';
  acrValues: Array<Scalars['String']>;
  alwaysRedirect: Scalars['Boolean'];
  clientID: Scalars['String'];
  domain: Scalars['String'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type DeleteApplicationApiKeyInput = {
  apiKeyId: Scalars['ID'];
  applicationId: Scalars['ID'];
};

export type DeleteApplicationApiKeyOutput = {
  __typename?: 'DeleteApplicationApiKeyOutput';
  application: Application;
};

export type DeleteSignatoryInput = {
  signatoryId: Scalars['ID'];
  signatureOrderId: Scalars['ID'];
};

export type DeleteSignatoryOutput = {
  __typename?: 'DeleteSignatoryOutput';
  signatureOrder: SignatureOrder;
};

export type Document = {
  blob?: Maybe<Scalars['Blob']>;
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  signatures?: Maybe<Array<Signature>>;
  title: Scalars['String'];
};

export type DocumentInput = {
  pdf: PadesDocumentInput;
  /** When enabled, will remove any existing signatures from the document before storing. */
  removePreviousSignatures?: InputMaybe<Scalars['Boolean']>;
};

/** Document storage mode. Temporary documents will be deleted once completed. */
export enum DocumentStorageMode {
  /** Temporary documents will be deleted once completed. */
  Temporary = 'Temporary'
}

/** Hand drawn signature evidence for signatures. */
export type DrawableEvidenceProviderInput = {
  requireName?: InputMaybe<Scalars['Boolean']>;
};

export type DrawableSignature = Signature & {
  __typename?: 'DrawableSignature';
  image: Scalars['Blob'];
  name?: Maybe<Scalars['String']>;
  signatory?: Maybe<Signatory>;
};

export type DrawableSignatureEvidenceProvider = {
  __typename?: 'DrawableSignatureEvidenceProvider';
  id: Scalars['ID'];
  requireName: Scalars['Boolean'];
};

export type EmptySignature = Signature & {
  __typename?: 'EmptySignature';
  signatory?: Maybe<Signatory>;
};

/** Must define either oidc or noop subsection. */
export type EvidenceProviderInput = {
  /** Criipto Verify based evidence for signatures. */
  criiptoVerify?: InputMaybe<CriiptoVerifyProviderInput>;
  /** Hand drawn signature evidence for signatures. */
  drawable?: InputMaybe<DrawableEvidenceProviderInput>;
  /** Determined if this evidence provider should be enabled by signatories by default. Default true */
  enabledByDefault?: InputMaybe<Scalars['Boolean']>;
  /** TEST environment only. Does not manipulate the PDF, use for integration or webhook testing. */
  noop?: InputMaybe<NoopEvidenceProviderInput>;
  /** OIDC/JWT based evidence for signatures. */
  oidc?: InputMaybe<OidcEvidenceProviderInput>;
};

export type ExtendSignatureOrderInput = {
  additionalExpirationInDays: Scalars['Int'];
  signatureOrderId: Scalars['ID'];
};

export type ExtendSignatureOrderOutput = {
  __typename?: 'ExtendSignatureOrderOutput';
  signatureOrder: SignatureOrder;
};

export type JwtSignature = Signature & {
  __typename?: 'JWTSignature';
  jwks: Scalars['String'];
  jwt: Scalars['String'];
  signatory?: Maybe<Signatory>;
};

export enum Language {
  DaDk = 'DA_DK',
  EnUs = 'EN_US',
  NbNo = 'NB_NO',
  SvSe = 'SV_SE'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Add multiple signatures to your signature order. */
  addSignatories?: Maybe<AddSignatoriesOutput>;
  /** Add a signatory to your signature order. */
  addSignatory?: Maybe<AddSignatoryOutput>;
  /** Cancels the signature order without closing it, use if you no longer need a signature order. Documents are deleted from storage after cancelling. */
  cancelSignatureOrder?: Maybe<CancelSignatureOrderOutput>;
  /** Change an existing signatory */
  changeSignatory?: Maybe<ChangeSignatoryOutput>;
  /** Cleans up the signature order and removes any saved documents from the servers. */
  cleanupSignatureOrder?: Maybe<CleanupSignatureOrderOutput>;
  /** Finalizes the documents in the signature order and returns them to you as blobs. Documents are deleted from storage after closing. */
  closeSignatureOrder?: Maybe<CloseSignatureOrderOutput>;
  /** Creates a signature application for a given tenant. */
  createApplication?: Maybe<CreateApplicationOutput>;
  /** Creates a new set of api credentials for an existing application. */
  createApplicationApiKey?: Maybe<CreateApplicationApiKeyOutput>;
  /** Creates a signature order to be signed. */
  createSignatureOrder?: Maybe<CreateSignatureOrderOutput>;
  /** Deletes a set of API credentials for an application. */
  deleteApplicationApiKey?: Maybe<DeleteApplicationApiKeyOutput>;
  /** Delete a signatory from a signature order */
  deleteSignatory?: Maybe<DeleteSignatoryOutput>;
  /** Extends the expiration of the signature order. */
  extendSignatureOrder?: Maybe<ExtendSignatureOrderOutput>;
  /** Refreshes the client secret for an existing set of API credentials. Warning: The old client secret will stop working immediately. */
  refreshApplicationApiKey?: Maybe<RefreshApplicationApiKeyOutput>;
  /** Used by Signatory frontends to reject a signature order in full. */
  rejectSignatureOrder?: Maybe<RejectSignatureOrderOutput>;
  /** Used by Signatory frontends to sign the documents in a signature order. */
  sign?: Maybe<SignOutput>;
  /** Sign with API credentials acting as a specific signatory. The signatory MUST be preapproved in this case. */
  signActingAs?: Maybe<SignActingAsOutput>;
  /** Signatory frontend use only. */
  signatoryBeacon?: Maybe<SignatoryBeaconOutput>;
  /** Used by Signatory frontends to mark documents as opened, approved or rejected. */
  updateSignatoryDocumentStatus?: Maybe<UpdateSignatoryDocumentStatusOutput>;
};


export type MutationAddSignatoriesArgs = {
  input: AddSignatoriesInput;
};


export type MutationAddSignatoryArgs = {
  input: AddSignatoryInput;
};


export type MutationCancelSignatureOrderArgs = {
  input: CancelSignatureOrderInput;
};


export type MutationChangeSignatoryArgs = {
  input: ChangeSignatoryInput;
};


export type MutationCleanupSignatureOrderArgs = {
  input: CleanupSignatureOrderInput;
};


export type MutationCloseSignatureOrderArgs = {
  input: CloseSignatureOrderInput;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


export type MutationCreateApplicationApiKeyArgs = {
  input: CreateApplicationApiKeyInput;
};


export type MutationCreateSignatureOrderArgs = {
  input: CreateSignatureOrderInput;
};


export type MutationDeleteApplicationApiKeyArgs = {
  input: DeleteApplicationApiKeyInput;
};


export type MutationDeleteSignatoryArgs = {
  input: DeleteSignatoryInput;
};


export type MutationExtendSignatureOrderArgs = {
  input: ExtendSignatureOrderInput;
};


export type MutationRefreshApplicationApiKeyArgs = {
  input: RefreshApplicationApiKeyInput;
};


export type MutationRejectSignatureOrderArgs = {
  input: RejectSignatureOrderInput;
};


export type MutationSignArgs = {
  input: SignInput;
};


export type MutationSignActingAsArgs = {
  input: SignActingAsInput;
};


export type MutationSignatoryBeaconArgs = {
  input: SignatoryBeaconInput;
};


export type MutationUpdateSignatoryDocumentStatusArgs = {
  input: UpdateSignatoryDocumentStatusInput;
};

/** TEST only. Allows empty signatures for testing. */
export type NoopEvidenceProviderInput = {
  name: Scalars['String'];
};

export type NoopSignatureEvidenceProvider = {
  __typename?: 'NoopSignatureEvidenceProvider';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** OIDC/JWT based evidence for signatures. */
export type OidcEvidenceProviderInput = {
  acrValues?: InputMaybe<Array<Scalars['String']>>;
  alwaysRedirect?: InputMaybe<Scalars['Boolean']>;
  audience: Scalars['String'];
  clientID: Scalars['String'];
  domain: Scalars['String'];
  name: Scalars['String'];
  /** Enforces that signatories sign by unique evidence by comparing the values of previous evidence on the key you define. */
  uniqueEvidenceKey?: InputMaybe<Scalars['String']>;
};

export type OidcJwtSignatureEvidenceProvider = {
  __typename?: 'OidcJWTSignatureEvidenceProvider';
  acrValues: Array<Scalars['String']>;
  alwaysRedirect: Scalars['Boolean'];
  clientID: Scalars['String'];
  domain: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type PadesDocumentInput = {
  blob: Scalars['Blob'];
  /** Will not be displayed to signatories, can be used as a reference to your own system. */
  reference?: InputMaybe<Scalars['String']>;
  storageMode: DocumentStorageMode;
  title: Scalars['String'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PdfDocument = Document & {
  __typename?: 'PdfDocument';
  blob?: Maybe<Scalars['Blob']>;
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  signatures?: Maybe<Array<Signature>>;
  title: Scalars['String'];
};

export type PdfSealPosition = {
  page: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  application?: Maybe<Application>;
  document?: Maybe<Document>;
  /** Query a signatory by id. Useful when using webhooks. */
  signatory?: Maybe<Signatory>;
  signatureOrder?: Maybe<SignatureOrder>;
  /** Tenants are only accessable from user viewers */
  tenant?: Maybe<Tenant>;
  timezones: Array<Scalars['String']>;
  viewer: Viewer;
};


export type QueryApplicationArgs = {
  id: Scalars['ID'];
};


export type QueryDocumentArgs = {
  id: Scalars['ID'];
};


export type QuerySignatoryArgs = {
  id: Scalars['ID'];
};


export type QuerySignatureOrderArgs = {
  id: Scalars['ID'];
};


export type QueryTenantArgs = {
  id: Scalars['ID'];
};

export type RefreshApplicationApiKeyInput = {
  apiKeyId: Scalars['ID'];
  applicationId: Scalars['ID'];
};

export type RefreshApplicationApiKeyOutput = {
  __typename?: 'RefreshApplicationApiKeyOutput';
  apiKey: ApplicationApiKey;
  application: Application;
};

export type RejectSignatureOrderInput = {
  dummy: Scalars['Boolean'];
  reason?: InputMaybe<Scalars['String']>;
};

export type RejectSignatureOrderOutput = {
  __typename?: 'RejectSignatureOrderOutput';
  viewer: Viewer;
};

export type SignActingAsInput = {
  evidence: SignInput;
  signatoryId: Scalars['ID'];
};

export type SignActingAsOutput = {
  __typename?: 'SignActingAsOutput';
  signatory: Signatory;
  signatureOrder: SignatureOrder;
};

export type SignCriiptoVerifyInput = {
  jwt: Scalars['String'];
};

export type SignDrawableInput = {
  image: Scalars['Blob'];
  name?: InputMaybe<Scalars['String']>;
};

export type SignInput = {
  criiptoVerify?: InputMaybe<SignCriiptoVerifyInput>;
  drawable?: InputMaybe<SignDrawableInput>;
  /** EvidenceProvider id */
  id: Scalars['ID'];
  noop?: InputMaybe<Scalars['Boolean']>;
  oidc?: InputMaybe<SignOidcInput>;
};

export type SignOidcInput = {
  jwt: Scalars['String'];
};

export type SignOutput = {
  __typename?: 'SignOutput';
  viewer: Viewer;
};

export type Signatory = {
  __typename?: 'Signatory';
  documents: SignatoryDocumentConnection;
  evidenceProviders: Array<SignatureEvidenceProvider>;
  /** A link to the signatures frontend, you can send this link to your users to enable them to sign your documents. */
  href: Scalars['String'];
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  /** Signature order for the signatory. */
  signatureOrder: SignatureOrder;
  /** The current status of the signatory. */
  status: SignatoryStatus;
  /** The reason for the signatory status (rejection reason when rejected). */
  statusReason?: Maybe<Scalars['String']>;
  /** The signature frontend authentication token, only required if you need to build a custom url. */
  token: Scalars['String'];
};

export type SignatoryBeaconInput = {
  lastActionAt: Scalars['DateTime'];
};

export type SignatoryBeaconOutput = {
  __typename?: 'SignatoryBeaconOutput';
  viewer: Viewer;
};

export type SignatoryDocumentConnection = {
  __typename?: 'SignatoryDocumentConnection';
  edges: Array<SignatoryDocumentEdge>;
};

export type SignatoryDocumentEdge = {
  __typename?: 'SignatoryDocumentEdge';
  node: Document;
  status?: Maybe<SignatoryDocumentStatus>;
};

export type SignatoryDocumentInput = {
  id: Scalars['ID'];
  /** Define custom position for PDF seal. Uses PDF coordinate system (bottom-left as 0,0). If defined for one signatory/document, must be defined for all. */
  pdfSealPosition?: InputMaybe<PdfSealPosition>;
  preapproved?: InputMaybe<Scalars['Boolean']>;
};

export enum SignatoryDocumentStatus {
  Approved = 'APPROVED',
  Opened = 'OPENED',
  Preapproved = 'PREAPPROVED',
  Rejected = 'REJECTED'
}

export type SignatoryEvidenceProviderInput = {
  id: Scalars['ID'];
};

export type SignatoryEvidenceValidationInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export enum SignatoryStatus {
  Deleted = 'DELETED',
  Error = 'ERROR',
  Open = 'OPEN',
  Rejected = 'REJECTED',
  Signed = 'SIGNED'
}

export type SignatoryViewer = Viewer & {
  __typename?: 'SignatoryViewer';
  authenticated: Scalars['Boolean'];
  documents: SignatoryDocumentConnection;
  evidenceProviders: Array<SignatureEvidenceProvider>;
  id: Scalars['ID'];
  signatoryId: Scalars['ID'];
  signatureOrderStatus: SignatureOrderStatus;
  signer: Scalars['Boolean'];
  status: SignatoryStatus;
  ui: SignatureOrderUi;
};

/** Represents a signature on a document. */
export type Signature = {
  signatory?: Maybe<Signatory>;
};

export type SignatureAppearanceInput = {
  /** Render evidence claim as identifier in the signature appearance inside the document. You can supply multiple keys and they will be tried in order. If no key is found a GUID will be rendered. */
  identifierFromEvidence: Array<Scalars['String']>;
};

export type SignatureEvidenceProvider = CriiptoVerifySignatureEvidenceProvider | DrawableSignatureEvidenceProvider | NoopSignatureEvidenceProvider | OidcJwtSignatureEvidenceProvider;

export type SignatureOrder = {
  __typename?: 'SignatureOrder';
  application?: Maybe<Application>;
  closedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  documents: Array<Document>;
  evidenceProviders: Array<SignatureEvidenceProvider>;
  expiresAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** List of signatories for the signature order. */
  signatories: Array<Signatory>;
  status: SignatureOrderStatus;
  /** Tenants are only accessable from user viewers */
  tenant?: Maybe<Tenant>;
  timezone: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  ui: SignatureOrderUi;
};

/** A connection from an object to a list of objects of type SignatureOrder */
export type SignatureOrderConnection = {
  __typename?: 'SignatureOrderConnection';
  /** Information to aid in pagination. */
  edges: Array<SignatureOrderEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing \"5\" as the argument to `first`, then fetch the total count so it could display \"5 of 83\", for example. In cases where we employ infinite scrolling or don't have an exact count of entries, this field will return `null`. */
  totalCount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection from an object to another object of type SignatureOrder */
export type SignatureOrderEdge = {
  __typename?: 'SignatureOrderEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge. Must NOT be an enumerable collection. */
  node: SignatureOrder;
};

export enum SignatureOrderStatus {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Expired = 'EXPIRED',
  Open = 'OPEN'
}

export type SignatureOrderUi = {
  __typename?: 'SignatureOrderUI';
  disableRejection: Scalars['Boolean'];
  language: Language;
  logo?: Maybe<SignatureOrderUiLogo>;
  signatoryRedirectUri?: Maybe<Scalars['String']>;
  stylesheet?: Maybe<Scalars['String']>;
};

export type SignatureOrderUiLogo = {
  __typename?: 'SignatureOrderUILogo';
  href?: Maybe<Scalars['String']>;
  src: Scalars['String'];
};

export type SignatureOrderUiLogoInput = {
  /** Turns your logo into a link with the defined href. */
  href?: InputMaybe<Scalars['String']>;
  /** The image source for the logo. Must be an absolute HTTPS URL. */
  src: Scalars['String'];
};

export type Tenant = {
  __typename?: 'Tenant';
  applications: Array<Application>;
  id: Scalars['ID'];
};

export type UpdateSignatoryDocumentStatusInput = {
  documentId: Scalars['ID'];
  status: SignatoryDocumentStatus;
};

export type UpdateSignatoryDocumentStatusOutput = {
  __typename?: 'UpdateSignatoryDocumentStatusOutput';
  documentEdge: SignatoryDocumentEdge;
  viewer: Viewer;
};

export type UserViewer = Viewer & {
  __typename?: 'UserViewer';
  authenticated: Scalars['Boolean'];
  id: Scalars['ID'];
  tenants: Array<Tenant>;
};

export type VerifyApplication = {
  __typename?: 'VerifyApplication';
  domain: Scalars['String'];
  environment: VerifyApplicationEnvironment;
  realm: Scalars['String'];
};

export enum VerifyApplicationEnvironment {
  Production = 'PRODUCTION',
  Test = 'TEST'
}

export type Viewer = {
  id: Scalars['ID'];
};

export type ExampleAddSignatoriesMutationVariables = Exact<{
  input: AddSignatoriesInput;
}>;


export type ExampleAddSignatoriesMutation = { __typename?: 'Mutation', addSignatories?: { __typename?: 'AddSignatoriesOutput', signatories: Array<{ __typename?: 'Signatory', id: string, href: string }> } | null | undefined };

export type ExampleAddSignatoryMutationVariables = Exact<{
  input: AddSignatoryInput;
}>;


export type ExampleAddSignatoryMutation = { __typename?: 'Mutation', addSignatory?: { __typename?: 'AddSignatoryOutput', signatory: { __typename?: 'Signatory', id: string, href: string, token: string } } | null | undefined };

export type ExampleChangeSignatoryMutationVariables = Exact<{
  input: ChangeSignatoryInput;
}>;


export type ExampleChangeSignatoryMutation = { __typename?: 'Mutation', changeSignatory?: { __typename?: 'ChangeSignatoryOutput', signatory: { __typename?: 'Signatory', id: string, href: string, token: string } } | null | undefined };

export type ExampleSignActingAsMutationVariables = Exact<{
  input: SignActingAsInput;
}>;


export type ExampleSignActingAsMutation = { __typename?: 'Mutation', signActingAs?: { __typename?: 'SignActingAsOutput', signatory: { __typename?: 'Signatory', id: string, status: SignatoryStatus } } | null | undefined };

export type SignatoryWebhookQueryVariables = Exact<{
  signatoryId: Scalars['ID'];
}>;


export type SignatoryWebhookQuery = { __typename?: 'Query', signatory?: { __typename?: 'Signatory', status: SignatoryStatus, signatureOrder: { __typename?: 'SignatureOrder', id: string } } | null | undefined };
