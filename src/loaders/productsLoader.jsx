const productsLoader = async () => {
  const res = await fetch(`/api/products/all`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data;
};

export default productsLoader;
