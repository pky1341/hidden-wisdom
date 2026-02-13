<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
        $emailColumn = Order::emailColumn();
        $nameColumn = Order::nameColumn();

        $customers = Order::selectRaw("{$emailColumn} as user_email, MAX({$nameColumn}) as user_name, COUNT(*) as total_orders, SUM(amount) as total_spent")
            ->paid()
            ->groupBy($emailColumn)
            ->orderByDesc('total_spent')
            ->paginate(20);

        return Inertia::render('Admin/Customers/Index', [
            'customers' => $customers,
        ]);
    }

    public function show(string $email): Response
    {
        $emailColumn = Order::emailColumn();

        $orders = Order::with('product:id,title,slug')
            ->where($emailColumn, $email)
            ->latest()
            ->get();

        $stats = [
            'total_orders' => $orders->count(),
            'total_spent' => (float) $orders->where('payment_status', 'paid')->sum('amount'),
            'customer_name' => $orders->first()->user_name ?? 'Customer',
        ];

        return Inertia::render('Admin/Customers/Show', [
            'orders' => $orders,
            'stats' => $stats,
            'email' => $email,
        ]);
    }
}
