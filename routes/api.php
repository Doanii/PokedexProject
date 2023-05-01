<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Ajax\TestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::name('data.')->prefix('/data')->group(function(){
    Route::get('/getData', [TestController::class, 'getData'])->name('get.data');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
