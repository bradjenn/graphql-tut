import * as React from 'react'

interface IProps {
  link: { url: string, description: string };
}

const Link: React.SFC<IProps> = ({ link }) => (
  <div>
    {link.description} ({link.url})
  </div>
)

export default Link
