<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(Request $request): Response
    {
        $customers = Order::selectRaw('customer_email, customer_name, COUNT(*) as total_orders, SUM(amount) as total_spent')
            ->where('status', 'paid')
            ->groupBy('customer_email', 'customer_name')
            ->orderByDesc('total_spent')
            ->paginate(20);

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
        ]);
    }

    public function show(string $email): Response
    {
        $orders = Order::with('product')
            ->where('customer_email', $email)
            ->latest()
            ->get();

        $stats = [
            'total_orders' => $orders->count(),
            'total_spent' => $orders->where('status', 'paid')->sum('amount'),
            'customer_name' => $orders->first()->customer_name ?? 'Unknown',
        ];

        return Inertia::render('Admin/Customers/Show', [
            'orders' => $orders,
            'stats' => $stats,
            'email' => $email,
        ]);
    }
}
