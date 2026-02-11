<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Inertia\Inertia;
use Inertia\Response;

class ContactSubmissionController extends Controller
{
    public function index(): Response
    {
        $submissions = ContactSubmission::latest()->paginate(20);

        return Inertia::render('Admin/ContactSubmissions', [
            'submissions' => $submissions
        ]);
    }

    public function destroy(ContactSubmission $submission)
    {
        $submission->delete();
        return back()->with('success', 'Contact submission deleted successfully');
    }
}
