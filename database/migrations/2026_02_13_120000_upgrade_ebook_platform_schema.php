<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('users') && ! Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->enum('role', ['admin', 'user'])->default('user')->after('password');
            });
        }

        if (Schema::hasTable('products')) {
            if (Schema::hasColumn('products', 'pdf_path') && ! Schema::hasColumn('products', 'file_path')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->renameColumn('pdf_path', 'file_path');
                });
            }

            if (Schema::hasColumn('products', 'cover_image') && ! Schema::hasColumn('products', 'preview_image')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->renameColumn('cover_image', 'preview_image');
                });
            }

            if (! Schema::hasColumn('products', 'discount_price')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->decimal('discount_price', 10, 2)->nullable()->after('price');
                });
            }

            if (Schema::hasColumn('products', 'is_active') && ! Schema::hasColumn('products', 'status')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->enum('status', ['active', 'inactive'])->default('active')->after('preview_image');
                });

                DB::table('products')->where('is_active', 1)->update(['status' => 'active']);
                DB::table('products')->where('is_active', 0)->update(['status' => 'inactive']);

                Schema::table('products', function (Blueprint $table): void {
                    $table->dropColumn('is_active');
                });
            }
        }

        if (Schema::hasTable('orders')) {
            if (Schema::hasColumn('orders', 'customer_name') && ! Schema::hasColumn('orders', 'user_name')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('customer_name', 'user_name');
                });
            }

            if (Schema::hasColumn('orders', 'customer_email') && ! Schema::hasColumn('orders', 'user_email')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('customer_email', 'user_email');
                });
            }

            if (Schema::hasColumn('orders', 'customer_phone') && ! Schema::hasColumn('orders', 'user_phone')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('customer_phone', 'user_phone');
                });
            }

            if (Schema::hasColumn('orders', 'status') && ! Schema::hasColumn('orders', 'payment_status')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('status', 'payment_status');
                });
            }
        }

        if (Schema::hasTable('downloads') && Schema::hasColumn('downloads', 'token') && ! Schema::hasColumn('downloads', 'download_token')) {
            Schema::table('downloads', function (Blueprint $table): void {
                $table->renameColumn('token', 'download_token');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('users') && Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table): void {
                $table->dropColumn('role');
            });
        }

        if (Schema::hasTable('products')) {
            if (Schema::hasColumn('products', 'status') && ! Schema::hasColumn('products', 'is_active')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->boolean('is_active')->default(true)->after('preview_image');
                });

                DB::table('products')->where('status', 'active')->update(['is_active' => true]);
                DB::table('products')->where('status', 'inactive')->update(['is_active' => false]);

                Schema::table('products', function (Blueprint $table): void {
                    $table->dropColumn('status');
                });
            }

            if (Schema::hasColumn('products', 'discount_price')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->dropColumn('discount_price');
                });
            }

            if (Schema::hasColumn('products', 'preview_image') && ! Schema::hasColumn('products', 'cover_image')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->renameColumn('preview_image', 'cover_image');
                });
            }

            if (Schema::hasColumn('products', 'file_path') && ! Schema::hasColumn('products', 'pdf_path')) {
                Schema::table('products', function (Blueprint $table): void {
                    $table->renameColumn('file_path', 'pdf_path');
                });
            }
        }

        if (Schema::hasTable('orders')) {
            if (Schema::hasColumn('orders', 'payment_status') && ! Schema::hasColumn('orders', 'status')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('payment_status', 'status');
                });
            }

            if (Schema::hasColumn('orders', 'user_phone') && ! Schema::hasColumn('orders', 'customer_phone')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('user_phone', 'customer_phone');
                });
            }

            if (Schema::hasColumn('orders', 'user_email') && ! Schema::hasColumn('orders', 'customer_email')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('user_email', 'customer_email');
                });
            }

            if (Schema::hasColumn('orders', 'user_name') && ! Schema::hasColumn('orders', 'customer_name')) {
                Schema::table('orders', function (Blueprint $table): void {
                    $table->renameColumn('user_name', 'customer_name');
                });
            }
        }

        if (Schema::hasTable('downloads') && Schema::hasColumn('downloads', 'download_token') && ! Schema::hasColumn('downloads', 'token')) {
            Schema::table('downloads', function (Blueprint $table): void {
                $table->renameColumn('download_token', 'token');
            });
        }
    }
};
