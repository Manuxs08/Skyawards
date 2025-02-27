import React from 'react'
import '/src/general.css'
import './nominado.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Login from '../login/Login'
import { supabase } from '../../supabaseClient'
import {motion} from 'framer-motion'
import NavbarPC from '../navbarPC/NavbarPC'

const Nominado = () => {
    const fechaDia = new Date().getDate();
    const fechaMes = new Date().getMonth();
    const fechaAnio = new Date().getFullYear();
    const url = 'https://overflowing-liberation-production.up.railway.app';
    const [nominados, setNominados] = useState([])
    const [nominaciones, setNominaciones] = useState([])
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

    const fetchNominados = async () => {
        await axios.get(url+'/get/nominados').then(res => {
            setNominados(res.data);})
        .catch(err => console.log(err))
    }

    const fetchNominadosCount = async () => {
      const nominaciones = []
      await axios.get(url+'/get/nominados').then(res => {
        const noms = res.data;
        noms.map(async (nom)=>{
            await axios.get(url+'/get/nominados/count',{
                params:{
                  idNom1: nom.id,
                  idNom2: nom.id
                }
            }).then(res => {
                nominaciones[nom.id] = res.data[0].nominaciones;
            })
              .catch(err => console.log(err))
            })
          })
          .catch(err => console.log(err))
      setNominaciones(nominaciones);
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
                  })
              }
            } catch (error) {
                console.log(error)
            }
          }
        })
      }
      getUserData();
      fetchNominados();
      fetchNominadosCount();
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
        <br /><br /><br />
        <motion.div variants={gridContainerVariants} id='main-nom' style={{marginLeft:'40px',marginRight:'40px'}}>
            {nominados.map((nominado, index) =>
                <motion.div variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition} key={`nom${index}`} style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }}>
                    <img className='img-nom' src={`/${nominado.imagen}`} alt={nominado.imagen} />
                    <h1>{nominado.nombre}</h1>
                    <h2>{nominaciones[index] != undefined ? `${nominaciones[index]} nominaciones` : ''}</h2>
                </motion.div>
            )}
        </motion.div><br /><br /><br />
    </div>
  )
}

export default Nominado