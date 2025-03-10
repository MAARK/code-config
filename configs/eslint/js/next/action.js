'use server'

export async function getProducts() {
  const response = await fetch('https://api.example.com/products')
  const products = await response.json()

  return products.map((product) => ({
    id: product.id,
    name: product.name || '',
  }))
}
