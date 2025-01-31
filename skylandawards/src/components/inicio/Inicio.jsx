import React from 'react'
import './inicio.css'
import '/src/general.css'
import { useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Login from '../login/Login'
import { supabase } from '../../supabaseClient'
import {motion} from 'framer-motion'
import NavbarPC from '../navbarPC/NavbarPC'
import NavbarMovil from '../navbarMovil/NavbarMovil'

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
        <NavbarPC result={result} isLogged={isLogged} user={user} signOutUser={() => signOutUser()} openModal={() => openModal()}/>
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
                marginLeft:'10%',
                marginRight:'10%'
                }}>Esta es la pagina oficial en donde podras votar en una amplia variedad de categorias que 
              recopilan lo mas relevante que ha acontecido durante el año 2024 dentro del servidor</p>
            <a className='btn-votar' style={{
                fontSize:'30px',
                textDecoration:'none',
                padding: '8px 28px',
            }} href="/categoria">Votar aqui</a>
            </motion.div>
            <motion.div id='container-lore' variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition}>
              <div style={{width:'600px'}}>
                <h1 style={{fontSize:'70px', marginBottom:'55px'}}>Que es Skyland?</h1>
                <p style={{lineHeight:'40px', marginRight:'8%', marginLeft:'8%', fontSize:'24px', marginBottom:'48px'}}>
                  Skyland nació como un pequeño pueblo dentro de un servidor de Minecraft. Con el pasar del
                  tiempo, más miembros se han ido integrando a este pueblo lo que llevo a la creación de un servidor de discord en donde todos
                  los integrantes puedan compartir sus experiencias dentro del servidor. Sin embargo, con el pasar del tiempo y la caída
                  del servidor de minecraft, Skyland tuvo que adoptar su propia identidad de forma independiente con los miembros que la conformaban
                </p><br />
              </div>
              <div id='slider'>
                <div id='slider-track'>
                  <img src="/inicio1.jpg" alt="" />
                  <img src="/inicio2.jpg" alt="" />
                  <img src="/inicio3.jpg" alt="" />
                  <img src="/inicio4.jpg" alt="" />
                  <img src="/inicio5.jpg" alt="" />
                  <img src="/inicio6.jpg" alt="" />
                  <img src="/inicio7.jpg" alt="" />
                </div>
              </div>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default Inicio