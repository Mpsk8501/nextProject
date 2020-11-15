import classes from '../auth.module.scss'
import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import delay from '../../../helpers/delay'

const GET_NAME = gql`
  query {
    viewer {
      username
    }
  }
`
const REGISTER_CUSTOMER = gql`
  mutation($input: RegisterCustomerInput!) {
    registerCustomer(input: $input) {
      customer {
        username
      }
    }
  }
`

const Modal = ({ closeFunc }) => {
  const [userName, setUserName] = useState('')
  const [userPass, setUserPass] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const { loading: load, error, data, refetch } = useQuery(GET_NAME, {
    onCompleted: () => {
      refetch.bind(this)
    },
    onError: async () => {
      setMessage('Querry error')
      await delay(1000)
      closeHandler()
    },
  })

  const [
    registerCustomer,
    { data: userData, loading: userLoading, error: userError },
  ] = useMutation(REGISTER_CUSTOMER, {
    variables: {
      input: {
        username: userName,
        password: userPass,
        email: userEmail,
      },
    },
    onCompleted: async (e) => {
      const base64token = btoa(`${userName}:${userPass}`)
      localStorage.setItem('baseToken', base64token)
      localStorage.setItem('isLogged', 'true')
      setMessage('You regisered')
      await delay(1000)
      location.reload()
    },
    onError: async (e) => {
      setMessage(e.message)
      await delay(1000)
      setMessage('')
      setLoading(false)
    },
  })

  const closeHandler = () => {
    closeFunc()
  }

  const onChangeNameHandler = (e) => {
    setUserName(e.target.value)
  }
  const onChangePassHandler = (e) => {
    setUserPass(e.target.value)
  }
  const onChangeEmaillHandler = (e) => {
    setUserEmail(e.target.value)
  }

  const registerUser = () => {
    //register
    setLoading(true)
    registerCustomer()
  }

  const authUser = async () => {
    //auth()
    setLoading(true)
    const base64token = btoa(`${userName}:${userPass}`)
    localStorage.setItem('baseToken', base64token)
    localStorage.setItem('isLogged', 'true')
    const viewData = await refetch()
    if (viewData.data.viewer) {
      setMessage('You Login')
      await delay(1000)
      location.reload()
    } else {
      setMessage('Wrong name or password')
      await delay(1000)
      localStorage.removeItem('baseToken')
      localStorage.removeItem('isLogged')
      setMessage('')
      setLoading(false)
    }
  }

  return (
    <div className={classes.modal}>
      <div className={classes.wrapper}>
        <div className={classes.modalWindow}>
          {loading ? (
            message || 'Loading...'
          ) : (
            <div>
              <div className={classes.inputBlock}>
                <label htmlFor="login">Login</label>
                <input
                  value={userName}
                  onChange={onChangeNameHandler}
                  name="login"
                  type="text"
                />
              </div>
              {isRegister ? (
                <div className={classes.inputBlock}>
                  <label htmlFor="email">Email</label>
                  <input
                    value={userEmail}
                    onChange={onChangeEmaillHandler}
                    name="email"
                    type="text"
                  />
                </div>
              ) : null}
              <div className={classes.inputBlock}>
                <label htmlFor="login">Pass</label>
                <input
                  value={userPass}
                  onChange={onChangePassHandler}
                  name="pass"
                  type="text"
                />
              </div>
            </div>
          )}

          <div className={classes.buttonBlock}>
            <div className={classes.inpMod}>
              <label
                onClick={() => setIsRegister(!isRegister)}
                htmlFor="isRegister"
              >
                Register new user
              </label>
              <input
                onChange={() => setIsRegister(!isRegister)}
                checked={isRegister}
                name="isRegister"
                type="checkbox"
              />
            </div>
            {isRegister ? (
              <button
                disabled={!!loading}
                onClick={registerUser}
                className="btn"
              >
                Register
              </button>
            ) : (
              <button disabled={!!loading} onClick={authUser} className="btn">
                Auth
              </button>
            )}

            <button disabled={!!loading} onClick={closeHandler} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
