import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from "@inertiajs/react";
import React, { useState, useEffect } from 'react';
import ModalCustom from "@/Pages/ModalCustom";

export default function (props) {

    const [pokemons, setPokemon] = useState(props.allPokemons.results);
    const [visible, setVisible] = useState(false);
    const [modalData, setModalData] = useState()

    const handleVisible = event => {
        setVisible(!visible)
    }

    function handlePokemonData(data) {
        setModalData(data)
    }

    useEffect(() => {
        async function fetchData() {
            const pokemonData = await Promise.all(pokemons.map(async pokemon => {
                const pokeId = getPokemonId(pokemon.url);
                const pokeDetail = await getPokemonUrl(pokeId);
                return pokeDetail;
            }));
            setPokemon(pokemonData);
        }
        fetchData();
    }, []);

    function getPokemonId(url) {
        const id = url.split('/');
        return id[6];
    }

    async function getPokemonUrl(pokeId) {
        const url = `http://pokeapi.co/api/v2/pokemon/${pokeId}/`;
        const response = await fetch(url);
        const result = await response.json();
        return result
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pokedex</h2>}
        >
            <Head title="Pokedex" />

            <div className="p-5 sm:p-10 md:p-15 xl:p-20 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
                {pokemons !== undefined ? pokemons.map(pokemon => {
                    return (
                        <div key={pokemon.name} id={pokemon.id}>
                            <div
                                key={pokemon.id}
                                className={"w-sm flex flex-row justify-between border border-gray-200 rounded-lg hover:scale-105 md:hover:scale-110 transition-all ease-in-out duration-300 bg-" + (pokemon.types !== undefined ? pokemon.types[0].type.name : '') + " shadow-xl"}>
                                <div className="p-5">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 capitalize">{pokemon.name}</h5>
                                    <p className="mb-1 font-normal text-gray-700">PokeID: #{pokemon.id}</p>
                                    <div className="flex flex-row">
                                        <p className="mb-3 font-normal text-gray-700 flex flex-wrap">Element('s): {pokemon.types !== undefined ? pokemon.types.map(type => {
                                            return (
                                                <span className={"capitalize shadow-inner text-white font-bold px-3 ml-2 rounded-md " + type.type.name}>{type.type.name} </span>
                                            )
                                        }) : ''}</p>
                                    </div>
                                    <button
                                        onClick={() => {handleVisible(); handlePokemonData(pokemon)}}
                                        className="active:scale-90 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
                                        type="button"
                                    >
                                        Show details
                                    </button>
                                </div>
                                <p>
                                    {pokemon.sprites !== undefined ? (<img className="rounded-t-lg p-5 mt-6" src={pokemon.sprites.front_default} alt=""/>) : ''}
                                </p>
                            </div>
                        </div>
                    )
                }) : ''}
                    <ModalCustom visible={visible} changeVisibility={handleVisible} modalData={modalData} />

            </div>





        </AuthenticatedLayout>
    )
}





