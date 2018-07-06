import * as React from 'react'
import { Query } from 'react-apollo'

import gql from 'graphql-tag'

import Link from './Link'

const QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

interface ILink {
  description: string;
  id: number;
  url: string;
}

const renderLinks = (links: ILink[]) => links.map((l: ILink) => <Link key={l.id} link={l} />)

export const LinkList: React.SFC = props => (
  <Query query={QUERY}>
    {({ loading, data, error }) => {
      if (loading) {
        return <div>Loading</div>;
      }
      if (error) {
        return <h1>ERROR</h1>;
      }
      if (!data) {
        return <div>no data</div>;
      }

      const { feed } = data;
      return (
        <div>
          {feed && (
            <div>
              <h3>Links</h3>
              {feed.links && renderLinks(feed.links)}
            </div>
          )}
        </div>
      )
    }}
  </Query>
)

export default LinkList
