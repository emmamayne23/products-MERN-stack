import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products:[],
    setProducts: (products) => set({ products }),
    createProduct : async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all the fields" }
        }

        const res = await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
        const data = await res.json()
        set((state) => ({ products: [...state.products, data] }))
        return { success: true, message: "Product created successfully" }
    },
    fetchProducts: async () => {
        const res = await fetch("http://localhost:5000/products")
        const data = await res.json()
        set({ products: data.data })
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`http://localhost:5000/products/${pid}`, {
            method: "DELETE",
        })
        const data = await res.json()
        if(!data.success) return { success: false, message: data.message }
        set((state) => ({ products: state.products.filter((product) => product._id !== data.pid) }))
        return { success: true, message: "Product deleted successfully" }
    },
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`http://localhost:5000/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        })
        const data = await res.json()
        if(!data.success) return { success: false, message: data.message }
        set((state) => ({ products: state.products.map((product) => product._id === data.pid ? data.product : product) }))
        return { success: true, message: "Product updated successfully" }
    },
}))