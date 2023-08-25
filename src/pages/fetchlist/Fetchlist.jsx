import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardMedia,
} from '@mui/material';

import { useDispatch } from "react-redux";
import { appActions } from '../../redux/appRedux';
import api from "../../services/api";
import POKE_IMG from "../../assets/images/pokemon.png"
import { IMG_URL } from "../../constants/index";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const mostrarModal = withReactContent(Swal);



const FetchList = () => {
    const dispatch = useDispatch()
    const [pokemons, setPokemons] = useState(null)
    const [next, setNext] = useState("")

    const getPokemons = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(api.pokemons)
            if (result) {
                console.log('poke: ', result)
                setPokemons(result.results)
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }

    useEffect(() => {
        getPokemons()
    }, [])


    const renderItem = (item) => {
        const path = item.url.split('/')
        const imgID = getPokemonImgId(path[6])
        console.log(path)

        const modalShow = () => {
            mostrarModal.fire({
                title: item.name,
                html: (
                    <div className="modal">
                        <img src={`${IMG_URL}/${imgID}.png`} alt="" width={150} />
                        <div className="description">
                            <p>Altura: {pokemons.height}</p>
                            <p>Peso: {pokemons.weight}</p>
                            <p>Experiencia Basica: {pokemons.base_experience}</p>
                            <p>
                                Habilidades:{" "}
                                {pokemons.abilities?.map((item, index) => {
                                    return <span key={index}>{item.ability.name}, </span>;
                                })}
                            </p>
                            <p>
                                Tipo/s:{" "}
                                {pokemons.types?.map((item, index) => {
                                    return <span key={index}>{item.type.name}, </span>;
                                })}
                            </p>
                        </div>
                    </div>
                ),
                showConfirmButton: false,
                showCloseButton: true,
            })
            console.log(pokemons[0].height);
        }

        return (


            <Card onClick={modalShow} p={2} sx={{
                display: 'flex', height: 100, cursor: 'pointer',
                '&:hover': { backgroundColor: '#5acdbd', color: 'white' },

            }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        N° {imgID}
                    </Typography>
                    <Typography component="div" variant="h5">
                        {item.name}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    src={`${IMG_URL}${imgID}.png`}
                    alt="Live from space album cover"
                />
            </Card >
        )
    }

    const getPokemonImgId = (id) => {
        console.log('long. ' + id.length)
        switch (id.length) {
            case 1:
                return `00${id}`
            case 2:
                return `0${id}`
            default:
                return id
        }
    }

    const loadMore = async () => {
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(next)
            if (result) {
                console.log('poke: ', result.results)
                setPokemons(prev => [...prev, ...result.results])
                setNext(result.next)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(appActions.loading(false))
        }
    }

    return (


        <Grid container spacing={3}>
            <Grid item xs={12}>

                <Typography component="div" variant="h5">
                    Mi Pokedex
                </Typography>
            </Grid>
            {
                pokemons && pokemons.map((p, index) => {
                    return (
                        <Grid item xs={4} key={index}>
                            {renderItem(p)}
                        </Grid>
                    )
                })
            }
            <Grid item xs={4} >
                <Card p={2} sx={{
                    display: 'flex', height: 100, cursor: 'pointer',
                    backgroundColor: '#317b52', '&:hover': { backgroundColor: '#5acdbd' }
                }}
                    onClick={() => loadMore()}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5" sx={{ color: 'white' }}>
                            Cargar Más
                        </Typography>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 100, p: 2 }}
                        image={POKE_IMG}
                        alt="Live from space album cover"
                    />
                </Card>

            </Grid>
        </Grid >
    );
};
export default FetchList;

// function FetchList() {
//     const [active, setActive] = useState(true)

//     const toogle = () => {
//         setActive(!active)
//     }

//     return (
//         <div className="fetchlist">
//             <button onClick={toogle}>
//                 abrir modal
//             </button>
//             <Modal active={active} toggle={toogle}>
//                 <h1>Hola Modal</h1>
//             </Modal>
//         </div>

//     )

// } export default FetchList;