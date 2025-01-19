import React from 'react'
import './categoria.css'
import '/src/general.css'
import { useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Login from '../login/Login'
import { supabase } from '../../supabaseClient'
import axios from 'axios'
import {motion} from 'framer-motion'

const Categoria = () => {
    const fechaDia = new Date().getDate();
    const fechaMes = new Date().getMonth();
    const fechaAnio = new Date().getFullYear();
    const url = 'https://overflowing-liberation-production.up.railway.app';
    const [nomCategoria, setNomCategoria] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [user, setUser] = useState({
        id: '',
        icon: '',
        email: ''
    });
    const [result, setResult] = useState(false)
    const [votos, setVotos] = useState([]);
    const [nomsCat, setNomsCat] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [image, setImage] = useState('');
  
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
    
    const playAudio = (id) => {
        let audioSource;
        switch(id){
            case 45: //ZYDER
                audioSource = '/amongus.mp3'
            break;
            case 46: //MEMO
                audioSource = '/apestate.mp3'
            break;
            case 47: //KUSER
                audioSource = '/vaquitas.mp3'
            break;
            case 48: //MYLO
                audioSource = '/chupa.mp3'
            break;
            case 49: //MANUXS
                audioSource = '/beyaco.mp3'
            break;
        }
        new Audio(audioSource).play();
    }

    const updateBtnVote = async (catID, nomID) => {
        const btnsActiveVotes = document.getElementsByClassName(` btn-activeVote cat${catID}`);
        const btnVotar = document.getElementById(`btn${nomID}`);

        if(btnsActiveVotes.length > 0){
            for (let i = 0; i < btnsActiveVotes.length; i++) {
                btnsActiveVotes[i].className = btnsActiveVotes[i].className.replace(" btn-activeVote", "");
            }
        }
        btnVotar.className += " btn-activeVote";
    }

    const handleVote = async (catID, nom) => {
        if(fechaAnio == 2025 && fechaMes >= 0 && fechaDia >= 24){
            return alert("Las votaciones han finalizado. Ya no puedes votar")
          }
        if(isLogged){
            const voto = {
                idVotante: user.id,
                idCategoria: catID,
                idNominado1: nom.idNominado1,
                idNominado2: nom.idNominado2,
                idNomCategoria: nom.id
            }
            //Comprobar si el usuario ya esta registrado en la base de datos
            await axios.get((url+'/get/usuario'),{
                params:{
                    idVotante:voto.idVotante
                }
            }).then(res => {
                console.log('Usuario ya registrado')
                })
            .catch(err => {
                axios.post((url+'/post/usuario'), user)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            })

            //Comprobar si el voto ya fue registrado
            await axios.get((url+'/get/voto'),{
                params:{
                    idVotante:voto.idVotante,
                    idCategoria:voto.idCategoria
                }
            }).then(res => {
                axios.put(url+'/put/voto', voto)
                .then(res => console.log(res))
                .catch(err => console.log(err))
                updateBtnVote(catID, nom.id);
            })
            .catch(err => {
                axios.post(url+'/post/voto', voto)
                .then(res => console.log(res))
                .catch(err => console.log(err))
                updateBtnVote(catID, nom.id);
            })
        }else openModal();
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const openImage = () => setShowImage(true)

    const signOutUser = async () => {
        const {error} = await supabase.auth.signOut();
        window.location.reload();
    }

    const fetchNominadosCategoria = async () => {
        await axios.get(url+'/get/categoria/nominados').then(res => {
            setNomCategoria(res.data);})
        .catch(err => console.log(err))
    }

    const fetchCategorias = async () => {
        await axios.get(url+'/get/categorias').then(res => {
            setCategorias(res.data);})
        .catch(err => console.log(err))
    };
    
    const viewImage = async (img) => {
        openImage();
        setImage(img);
    }

    const getVotosNomCat = async (id) => {
        await axios.get(url+'/get/categorias').then(res=> {
            const arr = [];
            const arrCat = res.data;
            arrCat.map((cat) => {
                axios.get((url+'/get/categorias/nominados/idCat'),{
                    params:{
                        idCategoria: cat.id
                    }
                }).then(res=>{
                    const arrNomsCat = res.data;
                    console.log(arrNomsCat);
                    arrNomsCat.map((nomCat) => {
                        axios.get((url+'/get/voto/nomCat'),{
                            params:{
                                idNomCategoria: nomCat.id,
                                idVotante: id
                            }
                        }).then(res => {
                            arr[cat.id][nomCat.id] = 'btn-activeVote';
                        }).catch(err => {
                            arr[cat.id][nomCat.id] = '';
                        })
                    })
                }).catch(err => console.log(err))
            })
            setNomsCat(arr);
            console.log(nomsCat)
        }).catch(err => console.log(err))
    }

    const fetchVotos = async (usuarioID) => {
        await axios.get(url+`/get/votos`,{
            params:{
                id: usuarioID
            }
        }).then(res => {
            setVotos(res.data);})
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        fetchCategorias();
        fetchNominadosCategoria();
        showResults();
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
                        fetchVotos(usuario.id)
                        const votosArr = Array.of(votos)
                        votosArr.map((voto)=>{
                            updateBtnVote(voto.idCategoria, voto.idNomCategoria)
                        })
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
        <Modal dialogClassName='imageModal' show={showImage} onHide={() => setShowImage(false)} centered>
            <Modal.Body className='modal-login' style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <img style={{width:'70%'}} src={'/modalImages/'+image} alt="" />
            </Modal.Body>
        </Modal>
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
                borderRadius:'9999px'
            }} src="/userIcon.svg" alt="" />}>
                <Dropdown.Item id='userHandlerItem' onClick={openModal}>Iniciar Sesion</Dropdown.Item>
            </DropdownButton>}
          </div>
        </div>
        <div id='main-cat'>
            <br />
            <motion.div variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition} style={{marginBottom:'40px', fontSize:'30px'}}>Aqui podras votar a criterio propio en cada una de las categorias seleccionadas</motion.div>
            <div>
                {categorias.map((cat, index)=>
                    <motion.div variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition} key={`categoria${index}`} className='categoria'>
                        <h1 style={{
                            marginTop:'40px',
                            marginBottom:'40px',
                            fontSize:'72px'
                        }}>{cat.nombre}</h1>
                        <div className='container-nom'>
                                {
                                    nomCategoria.map((nom, index)=>{
                                        if(nom.idCategoria == cat.id){
                                            if(cat.id == 9){
                                                return(
                                                    <motion.div variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition} key={`nomCat${index}`} style={{
                                                        display:'flex',
                                                        flexDirection:'column',
                                                        justifyContent:'center',
                                                        alignItems:'center'
                                                    }}>
                                                        <h2>{nom.nombre}</h2>
                                                        <img onClick={()=>playAudio(nom.id)} className='img-cat' src={'/'+nom.imagen} alt={nom.imagen} />
                                                        <div id={`btn${nom.id}`} className={`btn-votar cat${cat.id}`} onClick={() => handleVote(cat.id, nom)}>Votar</div>
                                                    </motion.div>);
                                            }else{
                                                return(
                                                    <motion.div variants={gridElementVariants} initial="hidden" animate="show" transition={gridElementTransition} key={`nomCat${index}`} style={{
                                                        display:'flex',
                                                        flexDirection:'column',
                                                        justifyContent:'center',
                                                        alignItems:'center'
                                                    }}>
                                                        <h2>{nom.nombre}</h2>
                                                        <img onClick={() => viewImage(nom.imagen)} className='img-cat' src={'/'+nom.imagen} alt={nom.imagen} />
                                                        <div id={`btn${nom.id}`} className={`btn-votar cat${cat.id}`} onClick={() => handleVote(cat.id, nom)}>Votar</div>
                                                    </motion.div>);
                                            }
                                        }
                                    }
                                )}
                        </div><br /><br />
                    </motion.div>
                )}
            </div>
        </div><br />
    </div>
  )
}

export default Categoria