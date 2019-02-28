<?php

namespace App\Http\Controllers;

use App\User; 

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTExceptions;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;

class UserController extends Controller
{
	protected $userM;


	public function __construct( User $user )
	{
		$this->userM = $user;
	}

	public function update_user(Request $request)
	{
		$user = $this->userM::where('id',$request->id)->first();
		$validator = Validator::make($request->json()->all() , [
			'name'	=> 'required|string|max:50',
			'email'	=> 'required|string|email|max:50|unique:users,email,'.$user->id,
			'address'	=> 'required|string',
			'description'	=> 'required|string',
			'access_type'	=> 'required|string',
			'gender'	=> 'required|string|max:15',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors()->toJson(), 400);
		}
		$update_data = [
			'name'	=> $request->name,
			'email'	=> $request->email,
			'address'	=> $request->address,
			'description'	=> $request->description,
			'access_type'	=> $request->access_type,
			'gender'	=> $request->gender
		];
		if ($request->password != '') {
			$update_data['password'] = Hash::make($request->password);
		}
		$user = $this->userM::where('id',$request->id)->update($update_data);

		return response()->json(compact('user'),200);
	}  

	public function register(Request $request)
	{
		$validator = Validator::make($request->json()->all() , [
			'name'	=> 'required|string|max:50',
			'email'	=> 'required|string|email|max:50|unique:users',
			'address'	=> 'required|string',
			'gender'	=> 'required|string|max:15',
			'description'	=> 'required|string',
			'access_type'	=> 'required|string',
			'password'	=> 'required|string|min:3',
		]);
		if ($validator->fails()) {
			return response()->json($validator->errors(), 400);
		}

		$user = User::create([
			'name'	=> $request->name,
			'email'	=> $request->email,
			'address'	=> $request->address,
			'description'	=> $request->description,
			'access_type'	=> $request->access_type,
			'gender'	=> $request->gender,
			'password'	=> Hash::make($request->password),
		]);

		$token = JWTAuth::fromUser($user);

		return response()->json(compact('user','token'),200);
	}    

	public function login(Request $request)
	{
		$credentials = $request->json()->all();
		// var_dump($credentials);exit();
		$token = JWTAuth::attempt($credentials);
		try {
			if ( !$token ) {
				return response()->json(['error' => 'invalid_credentials'], 400);
			}
		} catch (JWTException $e) {
			return response()->json(['error' => 'could_not_create_token'], 500);
		}

		$user = Auth::user();
		// var_dump($user);exit();
		return response()->json(compact('user','token'));
	}

	public function getAuthenticatedUser()
	{
		$user = JWTAuth::parseToken()->authenticate();
		try {
			if ( !$user ) {
				return reponse()->json(['user_not_found'], 404);
			}
		} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
			return response()->json(['token_expired'], $e->getStatusCode());
		} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
			return response()->json(['token_invalid'], $e->getStatusCode());
		} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
			return response()->json(['token_absent'], $e->getStatusCode());
		}

		return response()->json(compact('user'));
	}

	public function getAllUsers()
	{
		$all_users = $this->userM::all();

		if ( !$all_users ) {
			return response()->json(['error' => 'no users found'], 400);
		}
		return response()->json($all_users, 200);

	}

	public function getUserProfile(Request $request)
	{
		$id = $request->id;
		$user_record = $this->userM::where('id',$id)->first();

		if ( !$user_record ) {
			return response()->json(['error' => 'no user found'], 400);
		}
		return response()->json($user_record, 200);
	}

	public function delete_user(Request $request)
	{
		$id = $request->id;
		$delete = $this->userM::where('id',$id)->delete();

		if ( !$delete ) {
			return response()->json(['error' => 'delete user failed'], 400);
		}
		return response()->json($delete, 200);
	}

}
