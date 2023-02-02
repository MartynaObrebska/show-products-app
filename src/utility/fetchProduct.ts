const fetchProduct = async (chosenId: number) =>
  fetch(`https://reqres.in/api/products/${chosenId}`)
    .then((response) => {
      if (response.status >= 500) return "server-error";
      if (response.status >= 400) return "bad-request";

      return response.json();
    })
    .then((response) => {
      if (response === "server-error" || response === "bad-request")
        return response;
      response.data = [response.data];
      return response;
    })
    .catch((error) => {
      console.error(error);
    });

export default fetchProduct;
