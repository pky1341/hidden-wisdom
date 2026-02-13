<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\Order;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::active()->count(),
            'total_orders' => Order::count(),
            'paid_orders' => Order::paid()->count(),
            'failed_orders' => Order::failed()->count(),
            'total_revenue' => (float) Order::paid()->sum('amount'),
            'average_order_value' => (float) Order::paid()->avg('amount'),
            'unread_messages' => ContactSubmission::where('is_read', false)->count(),
        ];

        $recentOrders = Order::with('product:id,title')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_orders' => $recentOrders,
        ]);
    }
}
