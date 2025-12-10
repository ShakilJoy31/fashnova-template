import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../ui/ProductCard";
import { Product } from "@/types/product/productCardTypes";

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductCard className="hover:scale-105 transition-transform" imageHeight="h-48" product={product} />
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    );
}

