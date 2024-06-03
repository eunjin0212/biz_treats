function handleSearch(keyword = '') {
    window.location.href = `/search?id=${keyword}`
}
const getParams = () => window.location.search.split('=')
export { handleSearch, getParams }