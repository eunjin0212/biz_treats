function handleSearch(keyword = '') {
    window.location.href = `/search?=${keyword}`
}
const getParams = () => window.location.search.split('=')
export { handleSearch, getParams }