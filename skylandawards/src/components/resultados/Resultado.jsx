import React from 'react'
import './resultado.css'
import '/src/general.css'
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Login from '../login/Login';
import { supabase } from '../../supabaseClient';
import axios from 'axios';
import GraficoResultado from '../graficoResultado/graficoResultado'
import NavbarPC from '../navbarPC/NavbarPC'

const Resultado = () => {
    const result = true;
    const [votosCant, setVotosCant] = useState([]);
    const [nominadosNombres, setNominadosNombres] = useState([]);
    const url = 'https://overflowing-liberation-production.up.railway.app';
    const [categorias, setCategorias] = useState([]);
    const [nomCategoria, setNomCategoria] = useState([]);
    const [user, setUser] = useState({
        id: '',
        icon: '',
        email: ''
    })
    const [isLogged, setIsLogged] = useState(false)
    const [showModal, setShowModal] = useState(false)

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

    const fetchNomCatVotes = async () => {
        let votos = []
        categorias.map(async (cat)=>{
            await axios.get(url+'/get/categorias/nominados/idCat', {
                params:{
                    idCategoria: cat.id
                }
            }).then(res => {
                let arr = []
                const data = Array.from(res.data);
                data.map(async (nom, index)=>{
                await axios.get(url+`/get/categoria/nominados/count`,{
                    params:{
                        id: nom.id
                    }
                }).then(res => {
                    arr[index] = res.data[0].votes;
                    })
                    .catch(err => console.log(err))
                })
                votos[cat.id] = arr;
            }).catch(err => console.log(err))
        })
        setVotosCant(votos);
        console.log(votosCant)
    }

    const fetchNomCatNames = async () => {
        let nomsCat = [];
        categorias.map(async (cat)=>{
            await axios.get(url+'/get/categorias/nominados/idCat', {
                params:{
                    idCategoria: cat.id
                }
            }).then(res => {
                let arr = []
                const data = Array.from(res.data);
                data.map((nom, index)=>{
                    arr[index] = nom.nombre;
                })
                nomsCat[cat.id] = arr;
            }).catch(err => console.log(err))
        })
        setNominadosNombres(nomsCat);
        console.log(nominadosNombres)
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
        fetchCategorias();
        fetchNominadosCategoria();
        fetchNomCatNames();
        fetchNomCatVotes();
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
        <div id='main-resultado'>
            {categorias.map((cat) =>
                <div key={`cat${cat.id}`} style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <div style={{width:'950px', fontSize:'200px'}}>
                        <GraficoResultado titulos={nominadosNombres[cat.id]} datos={votosCant[cat.id]} label={cat.nombre}></GraficoResultado>
                    </div>
                    <br /><br />
                </div>
            )}
        </div>
    </div>
  )
}

export default Resultado