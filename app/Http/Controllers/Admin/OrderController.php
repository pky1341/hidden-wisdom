<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Order::query()->with('product:id,title,slug');

        if ($request->filled('payment_status')) {
            $query->wherePaymentStatus($request->string('payment_status')->toString());
        }

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();

            $query->where(function ($builder) use ($search): void {
                $builder->where(Order::emailColumn(), 'like', '%' . $search . '%')
                    ->orWhere(Order::nameColumn(), 'like', '%' . $search . '%')
                    ->orWhere('razorpay_order_id', 'like', '%' . $search . '%')
                    ->orWhere('razorpay_payment_id', 'like', '%' . $search . '%');
            });
        }

        $orders = $query->latest()->paginate(20)->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['payment_status', 'search']),
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load(['product', 'download']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }
}
