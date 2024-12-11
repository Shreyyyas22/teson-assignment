import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';
import { useTitle } from '../hooks/useTitle';

function Home() {
    useTitle('Home');
    
    return (
        <div className="px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Home;
