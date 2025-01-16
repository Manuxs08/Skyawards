import React from 'react'
import '/src/general.css'
import './nominado.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Login from '../login/Login'
import { supabase } from '../../supabaseClient'

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
    
    supabase.auth.onAuthStateChange(async (event) => {
            if (event == "SIGNED_IN"){
                setIsLogged(true);
                setShowModal(false);
            }
    })

    const showResults = () => {
      if(fechaAnio == 2025 && fechaMes >= 0 && fechaDia >= 22){
        setResult(true);
      }
    }

    const openModal = () => {setShowModal(true); console.log(avatarUrl)};
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
        console.log(noms)
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
                      icon: 'src/assets/icons/emailIcon.svg',
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
          <a href="/" style={{marginLeft:'50px'}}><img src="src/assets/images/skyawards-logo.png" alt="" id='logo' /></a>
          <div id='sidebarBar'>
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
                borderRadius:'9999px'
            }} src="src/assets/icons/userIcon.svg" alt="" />}>
                <Dropdown.Item id='userHandlerItem' onClick={openModal}>Iniciar Sesion</Dropdown.Item>
            </DropdownButton>}
          </div>
        </div><br /><br /><br />
        <div id='main-nom' style={{marginLeft:'40px',marginRight:'40px'}}>
            {nominados.map((nominado, index) =>
                <div key={`nom${index}`} style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center'
                }}>
                    <img className='img-nom' src={`src/assets/images/${nominado.imagen}`} alt={nominado.imagen} />
                    <h1>{nominado.nombre}</h1>
                    <h2>{nominaciones[index] != undefined ? `${nominaciones[index]} nominaciones` : 'cargando...'}</h2>
                </div>
            )}
        </div><br /><br /><br />
    </div>
  )
}

export default Nominado