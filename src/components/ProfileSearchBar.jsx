const ProfileSearchBar = ({
  searchRef,
  handleSearch,
  sortBy,
  sortByList,
  handleSortBy,
}) => {
  return (
    <div className='search-sort-bar'>
      <div className="search">
        <form onSubmit={handleSearch}>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input type="text" ref={searchRef} placeholder="search" />
        </form>
      </div>
      <div className="sort">
        <select
          name="sortby"
          id="sortby"
          className="sort-by-select"
          onChange={handleSortBy}
        >
          {sortByList.map((sort) => {
            return (
              <option key={sort} value={sortBy}>
                {sort}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default ProfileSearchBar;
