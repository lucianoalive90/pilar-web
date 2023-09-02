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
    const [pokemonSelected, setPokemonSelected]= useState(null)

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

    const openPokemonModal = async (pokemon) => {
    try {
      dispatch(appActions.loading(true));
      const response = await api.GET(pokemon.url);

      if (response) {
        setPokemonSelected(response);
        //setOpenDetailsDialog(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(appActions.loading(false));
    }
  };

    const renderItem = (item) => {
        const path = item.url.split('/')
        const imgID = getPokemonImgId(path[6])
        console.log(path)

        const modalShow = () => {
            openPokemonModal(item)
            mostrarModal.fire({
                title: item.name,
                html: (
                    <div className="modal">
                        <img src={`${IMG_URL}/${imgID}.png`} alt="" width={150} />
                        <div className="description">
                            <p>Altura:{" "}<b>{pokemonSelected.height}</b> </p>
                            <p>Peso:{" "} <b>{pokemonSelected.weight}</b></p>
                            <p>Experiencia Basica:{" "} <b>{pokemonSelected.base_experience}</b></p>
                            <p>Habilidades:{" "}</p>
                        
                                <p>{pokemonSelected.abilities?.map((item, index) => {
                                    return <li key={index}><b>{item.ability.name}</b> </li>;
                                })}</p>
                            
                            <p>
                                <p>Tipo/s:{" "}</p>
                                <p>{pokemonSelected.types?.map((item, index) => {
                                    return <li key={index}><b>{item.type.name} </b></li>;
                                })}</p>
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