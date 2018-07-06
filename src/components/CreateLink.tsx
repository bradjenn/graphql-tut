import * as React from 'react'
import { graphql } from 'react-apollo'
import { compose, withHandlers, withStateHandlers } from 'recompose'

import gql from 'graphql-tag'

const initialState = { description: '', url: '', }
type State = Readonly<typeof initialState>

const setDescriptionState = ({ description }: State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  return { description: event.target.value }
}

const setUrlState = ({ url }: State) => (event: React.ChangeEvent<HTMLInputElement>) => ({
  url: event.target.value
})

const createNewLink = ({ description, url, postMutation }: IProps) => async (event: void) => {
  await postMutation({
    variables: {
      description,
      url
    }
  })
}

const stateHandlers = withStateHandlers(initialState, {
  setDescription: setDescriptionState,
  setUrl: setUrlState
})

const handlers = withHandlers({ onSubmit: createNewLink })

interface IProps {
  onSubmit: (event: React.MouseEvent<HTMLElement>) => Promise<object>,
  description: string;
  postMutation: (mutation: object) => void,
  url: string;
  setDescription: (event: React.ChangeEvent<HTMLInputElement>) => (value: string) => object;
  setUrl: (event: React.ChangeEvent<HTMLInputElement>) => (value: string) => object;
}

const POST_MUTATION = gql`
  # 2
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`

const enhance = compose(
  graphql(POST_MUTATION, { name: 'postMutation' }),
  stateHandlers,
  handlers
)

const CreateLink: React.SFC<IProps> = ({
  onSubmit,
  description,
  url,
  setDescription,
  setUrl
}) => (
  <div>
    <div className="flex flex-column mt3">
      <input
        className="mb2"
        value={description}
        onChange={setDescription}
        type="text"
        placeholder="A description for the link"
      />

      <input
        className="mb2"
        value={url}
        onChange={setUrl}
        type="text"
        placeholder="The URL for the link"
      />
    </div>

    <button onClick={onSubmit}>Submit</button>
  </div>
)

export default enhance(CreateLink)
