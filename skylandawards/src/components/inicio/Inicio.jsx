import React from 'react'
import './inicio.css'
import '/src/general.css'
import { useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Login from '../login/Login'
import { supabase } from '../../supabaseClient'
import {motion} from 'framer-motion'

const Inicio = () => {
  const fechaDia = new Date().getDate();
  const fechaMes = new Date().getMonth();
  const fechaAnio = new Date().getFullYear();
  const [user, setUser] = useState({
    id: '',
    icon: '',
    email: ''
  })
  const [result, setResult] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const gridContainerVariants = {
    hidden: {
      opacity: 0
      }, 
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  }

  const gridElementVariants = {
    hidden: {opacity: 0, y: 70},
    show: {opacity: 1, y: 0}
  }

  const gridElementTransition = {
    duration: 0.5,
    delay: 0.25
  }

  supabase.auth.onAuthStateChange(async (event) => {
          if (event == "SIGNED_IN"){
              setIsLogged(true);
              setShowModal(false);
          }
  })

  const showResults = () => {
    if(fechaAnio == 2025 && fechaMes >= 0 && fechaDia >= 24){
      setResult(true);
    }
  }

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  const signOutUser = async () => {
    const {error} = await supabase.auth.signOut();
    window.location.reload();
  }
  useEffect(()=>{
      async function getUserData(){
        await supabase.auth.getUser().then((value) => {
          if (value.data?.user) {
            const usuario = value.data.user;
            try {
              if(usuario.app_metadata.provider == "discord"){
                  setUser({
                      id: usuario.id,
                      icon: usuario.user_metadata.avatar_url,
                      email: usuario.email
                  });
              }else{
                  setUser({
                      id: usuario.id,
                      icon: '/emailIcon.svg',
                      email: usuario.email
                  });
              }
            } catch (error) {
                console.log(error)
            }
          }
        })
      }
      getUserData();
      showResults();
   },[])

  return (
    <div id='content'>
        <div>
        <Modal show={showModal} onHide={closeModal} backdrop="static" centered>
            <Modal.Header closeButton className='modal-login'></Modal.Header>
            <Modal.Body className='modal-login'>
                <Login supabase={supabase}></Login>
            </Modal.Body>
        </Modal>
        </div>
        <div id='sidebar'>
          <a href="/" style={{marginLeft:'50px'}}><img src="/skyawards-logo.png" alt="" id='logo' /></a>
          <div id='sidebarBar'>
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
        <motion.div id='main-inicio' variants={gridContainerVariants}
              initial="hidden"
              animate="show">
            
            <br />
            <motion.img variants={gridElementVariants} id='img-trofeo' style={{width:'256px'}} src="/trofeo.png" alt="" /><br /><br />
            <motion.div style={{marginBottom:'200px'}} variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition}>
            <h1 style={{fontSize:'70px', marginBottom:'64px'}}>Bienvenido a los Skyland Awards</h1>
            <p style={{
                fontSize:'24px',
                lineHeight:'40px',
                marginLeft:'90px',
                marginRight:'90px'
                }}>Esta es la pagina oficial en donde podras votar en una amplia variedad de categorias que 
              recopilan lo mas relevante que ha acontecido durante el año 2024 dentro del servidor</p>
            <a className='btn-votar' style={{
                fontSize:'30px',
                textDecoration:'none',
                padding: '8px 28px',
            }} href="/categoria">Votar aqui</a>
            </motion.div>
            <motion.div variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition} style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
              <div style={{width:'600px'}}>
                <h1 style={{fontSize:'70px', marginBottom:'55px'}}>Que es Skyland?</h1>
                <p style={{lineHeight:'40px', marginRight:'20px', marginLeft:'20px', fontSize:'24px', marginBottom:'48px'}}>
                  Skyland nació como un pequeño pueblo dentro de un servidor de Minecraft. Con el pasar del
                  tiempo, más miembros se han ido integrando a este pueblo lo que llevo a la creación de un servidor de discord en donde todos
                  los integrantes puedan compartir sus experiencias dentro del servidor. Sin embargo, con el pasar del tiempo y la caída
                  del servidor de minecraft, Skyland tuvo que adoptar su propia identidad de forma independiente con los miembros que la conformaban
                </p><br />
              </div>
              <div id='slider'>
                <div id='slider-track'>
                  <img style={{aspectRatio:'16 / 9'}} src="/inicio1.jpg" alt="" />
                  <img style={{aspectRatio:'16 / 9'}} src="/inicio2.jpg" alt="" />
                  <img style={{aspectRatio:'16 / 9'}} src="/inicio3.jpg" alt="" />
                  <img style={{aspectRatio:'16 / 9'}} src="/inicio4.jpg" alt="" />
                  <img style={{aspectRatio:'16 / 9'}} src="/inicio5.jpg" alt="" />
                  <img style={{aspectRatio:'16 / 9'}} src="/inicio6.jpg" alt="" />
                  <img style={{aspectRatio:'16 / 9'}} src="/inicio7.jpg" alt="" />
                </div>
              </div>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Inicio