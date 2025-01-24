import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './navbarPC.css'

const NavbarPC = ({result, isLogged, user, signOutUser, openModal}) => {
  return (
    <div id='navbar'>
          <a href="/" style={{marginLeft:'50px'}}><img src="/skyawards-logo.png" alt="" id='logo' /></a>
          <div id='navbarBar'>
            <h3><a href="/categoria">Categorias</a></h3>
            <h3><a href="/nominado">Nominados</a></h3>
            {result?
            <h3><a href="/resultado">Resultados</a></h3>:
            null
            }
            {isLogged?
            <DropdownButton id='userHandler'
            style={{marginRight:'16px'}}
            title={<img style={{
                width:'64px',
                color:'whitesmoke',
                borderRadius:'9999px'
            }} src={user.icon} alt="" />}>
                <Dropdown.Item id='userHandlerItem' onClick={signOutUser}>Cerrar Sesion</Dropdown.Item>
            </DropdownButton>:
            <DropdownButton id='userHandler'
            style={{marginRight:'16px'}}
            title={<img style={{
                width:'64px',
                color:'whitesmoke',
            }} src="/userIcon.svg" alt="" />}>
                <Dropdown.Item id='userHandlerItem' onClick={openModal}>Iniciar Sesion</Dropdown.Item>
            </DropdownButton>}
          </div>
    </div>
  )
}

export default NavbarPC