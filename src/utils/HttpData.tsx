export const getArticulos = async () => {
    console.log("🚀 ~ getArticulos")

    fetch("https://pqt-calva-ws.onrender.com/api/articulos", {
        method: "GET",
        redirect: "follow"
    }).then(async (response) => {
        const codigo = response.status;
        const data = await response.json();
        return { codigo, data };
    }).then((result) => {
        console.log(result)
        if (result.codigo == 200) {
            console.log("🚀 ~ getArticulos ~ result.data:", result.data);

            if (result.data && result.data.length > 0)
                return result.data;
            else
                return [];
        }

    }).catch((error) => {
        console.error(error);
        return [];
    });
};