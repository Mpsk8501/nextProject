import { FC } from 'react'
import ColorShemeComponent from '../../components/ColorShemeComponent'
import { MainLayout } from '../../components/layouts/mainLayout'

const ColorSheme: FC = () => {
  return (
    <MainLayout>
      <ColorShemeComponent />
    </MainLayout>
  )
}

export default ColorSheme
