import React from 'react'
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './navbarMovil.css'

const NavbarMovil = ({result, isLogged, user, signOutUser, openModal}) => {
    const [navbarScale, setNavbarScale] = useState(0)
    const handleNavbar = () => {
        const navbar = document.getElementById('navbarBar');
        if(navbarScale == 0){
            setNavbarScale(1);
        }else{
            setNavbarScale(0);
        }
        navbar.style.transform = `scaleY(${navbarScale})`
    }

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div id='navbar'>
          <img onClick={() => handleNavbar()} src="/skyawards-logo.png" alt="" id='logo' />
        </div>
        <div id='navbarBar'>
            <h3><a href="/">Inicio</a></h3>
            <h3><a href="/categoria">Categorias</a></h3>
            <h3><a href="/resultado">Nominados</a></h3>
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

export default NavbarMovil