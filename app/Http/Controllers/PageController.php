<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PageController extends Controller
{
    public function pokedex () {
        $api = Http::get('http://pokeapi.co/api/v2/pokemon/?limit=811');
        $json = $api -> json();
        return Inertia::render('Pokedex', [
            'allPokemons' => $json,
        ]);
}
}
