import { Head, Link } from '@inertiajs/react';
import SpiritualLayout from '../Components/SpiritualLayout';

export default function Products({ products, categories, selectedCategory }) {
    return (
        <SpiritualLayout>
            <Head title="Spiritual Ebooks & Digital Products" />

            <div className="mx-auto max-w-7xl px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="font-['Cinzel'] text-5xl text-[#5B3A29] mb-4">
                        Sacred Wisdom Collection
                    </h1>
                    <div className="w-20 h-1 bg-[#C6A75E] mx-auto mb-6"></div>
                    <p className="font-['Lora'] text-lg text-[#5B3A29]/70">
                        Explore practical digital books rooted in dharma and inner clarity.
                    </p>
                </div>

                {categories.length > 0 && (
                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        <Link
                            href="/products"
                            className={`px-6 py-2 rounded-full font-['Lora'] transition-colors ${
                                !selectedCategory
                                    ? 'bg-[#5B3A29] text-[#F5EBDD]'
                                    : 'bg-white text-[#5B3A29] hover:bg-[#C6A75E] hover:text-white'
                            }`}
                        >
                            All Products
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/products?category=${category.id}`}
                                className={`px-6 py-2 rounded-full font-['Lora'] transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-[#5B3A29] text-[#F5EBDD]'
                                        : 'bg-white text-[#5B3A29] hover:bg-[#C6A75E] hover:text-white'
                                }`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}

                <div className="grid md:grid-cols-3 gap-8">
                    {products.data.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                        >
                            {product.preview_image_url ? (
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        src={product.preview_image_url}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-[3/4] bg-gradient-to-br from-[#5B3A29] to-[#C6A75E] flex items-center justify-center p-8">
                                    <span className="text-[#F5EBDD] font-['Cinzel'] text-2xl text-center">
                                        {product.title}
                                    </span>
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="font-['Cinzel'] text-xl text-[#5B3A29] mb-3 group-hover:text-[#C6A75E] transition-colors">
                                    {product.title}
                                </h3>
                                <p className="font-['Lora'] text-[#5B3A29]/70 text-sm mb-4 line-clamp-3">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-end gap-3">
                                    <div>
                                        {product.has_discount && (
                                            <div className="text-sm text-[#5B3A29]/60 line-through">{product.formatted_original_price}</div>
                                        )}
                                        <div className="font-['Cinzel'] text-2xl text-[#C6A75E]">{product.formatted_price}</div>
                                    </div>
                                    <span className="text-[#5B3A29] group-hover:text-[#C6A75E] transition-colors">
                                        View Details →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {products.links.length > 3 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded font-['Lora'] ${
                                    link.active
                                        ? 'bg-[#5B3A29] text-[#F5EBDD]'
                                        : 'bg-white text-[#5B3A29] hover:bg-[#C6A75E] hover:text-white'
                                } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}

                {products.data.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-['Lora'] text-xl text-[#5B3A29]/70">
                            No products found in this category.
                        </p>
                    </div>
                )}
            </div>
        </SpiritualLayout>
    );
}
