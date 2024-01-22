import http from "@/http-common";

class UserClient {
    getUsers() {
        return http.get("/user");
    }
    getUserById(id) {
        return http.get(`/user/${id}`);
    }
    saveUser(userData) {
        return http.post("/user/save", userData)
    }

    deleteUser(id) {
        return  http.delete(`/user/${id}`)
    }
    searchUsers(keyword) {
        return http.get(`/user/byKeyword?keyword=${keyword}`);
    }
}
export default new UserClient();