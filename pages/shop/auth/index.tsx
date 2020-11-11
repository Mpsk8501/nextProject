import { ShopLayout } from '../../../components/layouts/shopLayout'
import { v4 } from 'uuid'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import client from '../../../components/ApolloClient'

const CREATE_USER = gql`
  mutation RegisterUser($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`
const AUTH_USER = gql`
  mutation RegisterUser($input: LoginUserInput!) {
    login(input: $input) {
      user {
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`

const AuthPage = () => {
  const [register, { data, loading, error }] = useMutation(CREATE_USER, {
    variables: {
      input: {
        clientMutationId: v4(),
        username: 'mpakTest3',
        password: '123456',
        email: 'mpak85045@gmail.com',
      },
    },
    client,
    onCompleted: (data) => {
      console.warn('completed Register', data)
      const token = localStorage.setItem(
        'token',
        data.registerCustomer.customer.jwtAuthToken
      )
    },
  })

  const [
    auth,
    { data: authData, loading: authLoad, error: authErr },
  ] = useMutation(AUTH_USER, {
    variables: {
      input: {
        clientMutationId: v4(),
        username: 'mpakTest',
        password: '123456',
      },
    },
    client,
    onCompleted: () => {
      console.warn('completed Auth', data)
    },
  })

  const createUser = () => {
    register()
  }
  const authUser = () => {
    auth()
  }

  return (
    <ShopLayout>
      <div className="container">
        <button onClick={createUser} className="btn">
          Create User
        </button>
        <button onClick={authUser} className="btn">
          Auth
        </button>
      </div>
    </ShopLayout>
  )
}

export default AuthPage
