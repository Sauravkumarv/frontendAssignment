import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import SearchBar from './SearchBar'
import LoadingSpinner from './LoadingSpinner'

const ITEMS_PER_PAGE = 8

export default function ProductList({ products }) {
  const [search, setSearch] = useState('')
  const [filtering, setFiltering] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setFiltering(true)
    const timer = setTimeout(() => {
      setFiltering(false)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Product Store</h1>
      <SearchBar value={search} onChange={setSearch} />

      {filtering ? (
        <LoadingSpinner />
      ) : (
        <>
          {paginated.length === 0 ? (
            <p className="text-center text-muted">No products found.</p>
          ) : (
            <div className="row">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => setCurrentPage(page)}>
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
