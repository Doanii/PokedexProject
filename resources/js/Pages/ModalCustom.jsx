import React, {useEffect, useState} from "react";

export default function (props) {
    function handleVisibility() {
        return props.visible === true ? "fixed top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 backdrop-blur-lg" : "hidden";
    }
    console.log(props.modalData)

    return (
            <div tabIndex="-1"
                 className={handleVisibility()}>
                <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-4xl max-h-full shadow-xl">

                    <div className="bg-gray-200 rounded-lg shadow relative dark:bg-gray-700">

                        <div
                            className={"flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600 bg-" + (props.modalData !== undefined ? props.modalData.types[0].type.name : '')}>
                            <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white capitalize">
                                {props.modalData !== undefined ? props.modalData.name : ''}
                            </h3>
                            <button type="button"
                                    onClick={props.changeVisibility}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6 flex flex-col sm:flex-row justify-between gap-5">
                            <div className="flex flex-col gap-5 w-full sm:w-[85%]">
                                <div className="bg-white rounded-2xl p-5 shadow-xl flex flex-col gap-5">
                                    <div>
                                        <p className="font-bold text-xl">Details:</p>
                                        <div>
                                            <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">
                                                PokeID: #{props.modalData !== undefined ? props.modalData.id : ''}
                                            </p>
                                            <div className="flex flex-row mt-2">
                                                <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400 flex flex-wrap">Element('s): {props.modalData !== undefined ? props.modalData.types.map(type => {
                                                    return (
                                                        <span className={"capitalize shadow-inner text-white font-bold px-3 ml-2 rounded-md " + type.type.name}>{type.type.name} </span>
                                                    )
                                                }) : ''}</p>
                                            </div>
                                            <div className="flex flex-row mt-2">
                                                <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400 flex flex-wrap">Abilities: {props.modalData !== undefined ? props.modalData.abilities.map(ability => {
                                                    return (
                                                        <span className={"capitalize shadow-inner text-white font-bold px-3 ml-2 rounded-md bg-gray-600"}>{ability.ability.name} </span>
                                                    )
                                                }) : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-5">
                                    <div className="bg-white rounded-2xl p-5 shadow-xl">
                                        <div>
                                            <p className="font-bold text-xl">Stats:</p>
                                            {props.modalData !== undefined ? props.modalData.stats.map(stats => {
                                                return (
                                                    <div>
                                                        <div className="flex justify-between mb-1 mt-5">
                                                            <span className={"text-base font-medium capitalize " + (stats.stat.name)}>{stats.stat.name}</span>
                                                            <span className={"text-sm font-bold  "  + (stats.stat.name)}>{stats.base_stat} / 255</span>
                                                        </div>
                                                        <div>
                                                            <progress className={"h-2.5 w-full bar bg-" + (stats.stat.name)} value={stats.base_stat} max="255"></progress>
                                                        </div>
                                                    </div>
                                                )
                                            }) : ''}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl p-5 shadow-xl">
                                    <div>
                                        <p className="font-bold text-xl">Moves:</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                            {props.modalData !== undefined ? props.modalData.moves.map(moves => {
                                                return (
                                                    <div>
                                                        <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400 capitalize">{moves.move.name}</p>
                                                    </div>
                                                )
                                            }) : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center gap-4 mt-[-2rem]">
                                <div className="bg-white rounded-2xl p-5 shadow-xl sm:block grid grid-cols-2 justify-center align-items-center">
                                    <div>
                                        <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">Default sprite</p>
                                        <img src={props.modalData !== undefined ? props.modalData.sprites.front_default : ''} />
                                    </div>
                                    <div>
                                        <img className="sm:mt-0 mt-6" src={props.modalData !== undefined ? props.modalData.sprites.back_default : ''} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">Shiny sprite</p>
                                        <img src={props.modalData !== undefined ? props.modalData.sprites.front_shiny : ''} />
                                    </div>
                                    <div>
                                        <img className="sm:mt-0 mt-6" src={props.modalData !== undefined ? props.modalData.sprites.back_shiny : ''} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
 }
