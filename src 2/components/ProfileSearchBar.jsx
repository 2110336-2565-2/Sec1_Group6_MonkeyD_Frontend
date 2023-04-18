const ProfileSearchBar = ({searchRef, handleSearch}) => {
  return (
    <div className="profile-search-bar">
      <form onSubmit={handleSearch}>
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" ref={searchRef} placeholder="search" />
      </form>
    </div>
  );
};
export default ProfileSearchBar;
