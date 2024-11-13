'use server'

export async function getProducts() {
  const products = await fetch('https://api.example.com/products')

  return products.map((product) => ({
    id: product.id,
    name: product.name || '',
  }))
}
