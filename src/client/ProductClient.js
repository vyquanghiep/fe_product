import http from "@/http-common";

class ProductClient {
    getProducts() {
        return http.get("/product");
    }
    getProductById(id) {
        return http.get(`/product/${id}`);
    }
    saveProduct(ProductData) {
        return http.post("/product/save", ProductData);
    }
    deleteProduct(id) {
        return  http.delete(`/product/${id}`);
    }
    searchProducts(keyword) {
        return http.get(`/product/byKeyword?keyword=${keyword}`);
    }
    uploadImage(productId, file) {
        const formData = new FormData();
        formData.append("file", file);

        return http.post(`/product/${productId}/uploadImage`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}

export default new ProductClient();