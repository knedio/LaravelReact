<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');
Route::get('profile/{id}', 'UserController@getUserProfile');
Route::get('all-users', 'UserController@getAllUsers');
Route::post('update-user', 'UserController@update_user');
Route::get('delete-user/{id}', 'UserController@delete_user');
