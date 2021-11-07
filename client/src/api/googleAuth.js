import axios from "axios";

const login = async (response) => {
    axios({
        method: "POST",
        url: "/api/google/login",
        withCredentials : true,
        data: {tokenId: response}
    })
    .then((res) => {
        console.log(res)
        window.location.reload(false);
    });
};

export { login };