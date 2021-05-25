export type Maybe<T> = T | null;
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Feed = {
  __typename?: 'Feed';
  links: Array<Link>;
  count: Scalars['Int'];
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID'];
  description: Scalars['String'];
  url: Scalars['String'];
  postedBy?: Maybe<User>;
  votes: Array<Vote>;
};

export type LinksOrderByInput = {
  description?: Maybe<Sort>;
  url?: Maybe<Sort>;
  createdAt?: Maybe<Sort>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink: Link;
  updateLink?: Maybe<Link>;
  deleteLink?: Maybe<Link>;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  vote?: Maybe<Vote>;
};


export type MutationCreateLinkArgs = {
  url: Scalars['String'];
  description: Scalars['String'];
};


export type MutationUpdateLinkArgs = {
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};


export type MutationDeleteLinkArgs = {
  id: Scalars['ID'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  linkId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  link?: Maybe<Link>;
};


export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LinksOrderByInput>;
};


export type QueryLinkArgs = {
  id: Scalars['ID'];
};

export enum Sort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Subscription = {
  __typename?: 'Subscription';
  newLink?: Maybe<Link>;
  newVote?: Maybe<Vote>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  links: Array<Link>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  link: Link;
  user: User;
};
