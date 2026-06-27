const API_BASE = 'https://fakestoreapi.com'

const fetchOptions = {
  headers: {
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0 (compatible; ProductStore/1.0)',
  },
  cache: 'no-store',
}

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`, fetchOptions)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export async function getProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, fetchOptions)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}
