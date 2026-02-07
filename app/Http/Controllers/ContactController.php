<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\ContactSubmission;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact');
    }

    public function store(ContactRequest $request): RedirectResponse
    {
        ContactSubmission::create($request->validated());

        return back()->with('success', 'Thank you for your message. We will respond soon.');
    }
}
