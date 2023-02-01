const fetchProducts = async (page: number, per_page: number = 5) =>
  fetch(`https://reqres.in/api/products?per_page=${per_page}&page=${page}`)
    .then((response) => {
      if (response.status >= 500) return "server-error";
      if (response.status >= 400) return "bad-request";

      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });

export default fetchProducts;
