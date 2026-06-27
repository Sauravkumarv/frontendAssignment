function SearchBar({ value, onChange }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Search products by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
