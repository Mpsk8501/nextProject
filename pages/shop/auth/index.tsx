import { ShopLayout } from '../../../components/layouts/shopLayout'
import { v4 } from 'uuid'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import client from '../../../components/ApolloClient'
import { useState } from 'react'

const CREATE_USER = gql`
  mutation registerUser($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        jwtAuthToken
        jwtRefreshToken
      }
    }
  }
`
const AUTH_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      authToken
      sessionToken
      user {
        id
        name
      }
    }
  }
`

const DELETE_USER = gql`
  mutation delUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      user {
        username
      }
    }
  }
`
const GET_Mail = gql`
  query {
    user(id: "dXNlcjoz") {
      email
      name
    }
  }
`

const AuthPage = () => {
  const [userName, setUserName] = useState('user')
  const [userPass, setUserPass] = useState('123456')

  const onComplitedF = (data) => {
    console.log('fff', data)
  }

  const { loading: er, error: sd, data: scsfsf, refetch } = useQuery(GET_Mail, {
    client,
    onCompleted: () => {
      refetch.bind(this)
      onComplitedF(scsfsf)
    },
    // Update cart in the localStorage.
  })
  const getMail = () => {
    refetch().then((e) => {
      onComplitedF(e)
    })
  }

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
      localStorage.setItem('token', data.registerCustomer.customer.jwtAuthToken)
    },
  })

  const [
    auth,
    { data: authData, loading: authLoad, error: authErr },
  ] = useMutation(AUTH_USER, {
    variables: {
      input: {
        clientMutationId: v4(),
        username: userName,
        password: userPass,
      },
    },
    client,
    onCompleted: (e) => {
      console.warn('completed Auth', e)
      localStorage.setItem('token', e.login.authToken)
      localStorage.setItem('woo-session', e.login.sessionToken)
    },
  })

  const [
    deleteUser,
    { data: authData2, loading: authLoad2, error: authErr2 },
  ] = useMutation(DELETE_USER, {
    variables: {
      input: {
        clientMutationId: v4(),
        id: '3',
      },
    },
    client,
    onCompleted: (e) => {
      console.warn('completed Auth', e)
      localStorage.setItem('token', e.login.authToken)
    },
  })

  const createUser = () => {
    register()
  }
  const authUser = () => {
    auth()
  }
  const delUser = () => {
    deleteUser()
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
        <button onClick={delUser} className="btn">
          Delete
        </button>
        <button onClick={getMail} className="btn">
          getMail
        </button>
      </div>
    </ShopLayout>
  )
}

export default AuthPage
