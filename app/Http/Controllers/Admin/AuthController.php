<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $adminPassword = env('ADMIN_PASSWORD', 'admin123');

        if ($request->password === $adminPassword) {
            session(['admin_authenticated' => true]);
            return redirect('/admin');
        }

        return back()->withErrors(['password' => 'Invalid password']);
    }

    public function logout()
    {
        session()->forget('admin_authenticated');
        return redirect('/');
    }
}
