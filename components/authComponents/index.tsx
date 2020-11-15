import classes from './auth.module.scss'

import { useState, useContext } from 'react'
import Modal from './modal'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { AppContext } from '../context/AppContext'
import Link from 'next/link'

const GET_NAME = gql`
  query {
    viewer {
      username
    }
  }
`

const AuthComponent = () => {
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState(false)

  const [cart, setCart] = useContext(AppContext)

  const onComplitedF = (data) => {
    console.log('fff', data)
    if (data.viewer) {
      setName(data.viewer.username)
    }
  }

  const { loading, error, data, refetch } = useQuery(GET_NAME, {
    onCompleted: () => {
      refetch.bind(this)
      onComplitedF(data)
    },
  })

  const authHandler = () => {
    if (name) {
      setCart(null)
      setName(false)
      localStorage.clear()
      location.reload()
    } else {
      setOpenModal(true)
    }
  }

  return (
    <div className={classes.auth}>
      <div className={classes.openModal} onClick={authHandler}>
        {name ? `Logout: ${name}` : 'Auth'}
      </div>
      {name ? (
        <Link href="/shop/userPage">
          <a>{name}</a>
        </Link>
      ) : (
        ''
      )}
      {!openModal ? '' : <Modal closeFunc={() => setOpenModal(false)} />}
    </div>
  )
}

export default AuthComponent
