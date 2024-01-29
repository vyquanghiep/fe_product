import http from "@/http-common";


class CategoryClient {
    getCategories() {
        return http.get('/product/category');
    }
    getProductsByIdCategory(id){
        return http.get(`/product/category/getpr/${id}`);
    }

}

export default new CategoryClient();