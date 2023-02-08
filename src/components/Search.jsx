import React, {useState, useRef, useEffect} from "react";

const Search = ({
  locationInput,
  startDateInput,
  endDateInput,
  handleSearch,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  const options = [
    {value: "Amnat Charoen", label: "Amnat Charoen"},
    {value: "Ang Thong", label: "Ang Thong"},
    {value: "Bangkok", label: "Bangkok"},
    {value: "Buogkan", label: "Buogkan"},
    {value: "Buri Ram", label: "Buri Ram"},
    {value: "Chachoengsao", label: "Chachoengsao"},
    {value: "Chai Nat", label: "Chai Nat"},
    {value: "Chaiyaphum", label: "Chaiyaphum"},
    {value: "Chanthaburi", label: "Chanthaburi"},
    {value: "Chiang Mai", label: "Chiang Mai"},
    {value: "Chiang Rai", label: "Chiang Rai"},
    {value: "Chon Buri", label: "Chon Buri"},
    {value: "Chumphon", label: "Chumphon"},
    {value: "Kalasin", label: "Kalasin"},
    {value: "Kamphaeng Phet", label: "Kamphaeng Phet"},
    {value: "Kanchanaburi", label: "Kanchanaburi"},
    {value: "Khon Kaen", label: "Khon Kaen"},
    {value: "Krabi", label: "Krabi"},
    {value: "Lampang", label: "Lampang"},
    {value: "Lamphun", label: "Lamphun"},
    {value: "Loburi", label: "Loburi"},
    {value: "Loei", label: "Loei"},
    {value: "Mae Hong Son", label: "Mae Hong Son"},
    {value: "Maha Sarakham", label: "Maha Sarakham"},
    {value: "Mukdahan", label: "Mukdahan"},
    {value: "Nakhon Nayok", label: "Nakhon Nayok"},
    {value: "Nakhon Pathom", label: "Nakhon Pathom"},
    {value: "Nakhon Phanom", label: "Nakhon Phanom"},
    {value: "Nakhon Ratchasima", label: "Nakhon Ratchasima"},
    {value: "Nakhon Sawan", label: "Nakhon Sawan"},
    {value: "Nakhon Si Thammarat", label: "Nakhon Si Thammarat"},
    {value: "Nan", label: "Nan"},
    {value: "Narathiwat", label: "Narathiwat"},
    {value: "Nong Bua Lam Phu", label: "Nong Bua Lam Phu"},
    {value: "Nong Khai", label: "Nong Khai"},
    {value: "Nonthaburi", label: "Nonthaburi"},
    {value: "Pathum Thani", label: "Pathum Thani"},
    {value: "Pattani", label: "Pattani"},
    {value: "Phangnga", label: "Phangnga"},
    {value: "Phatthalung", label: "Phatthalung"},
    {value: "Phayao", label: "Phayao"},
    {value: "Phetchabun", label: "Phetchabun"},
    {value: "Phetchaburi", label: "Phetchaburi"},
    {value: "Phichit", label: "Phichit"},
    {value: "Phitsanulok", label: "Phitsanulok"},
    {value: "Phra Nakhon Si Ayutthaya", label: "Phra Nakhon Si Ayutthaya"},
    {value: "Phrae", label: "Phrae"},
    {value: "Phuket", label: "Phuket"},
    {value: "Prachin Buri", label: "Prachin Buri"},
    {value: "Prachuap Khiri Khan", label: "Prachuap Khiri Khan"},
    {value: "Ranong", label: "Ranong"},
    {value: "Ratchaburi", label: "Ratchaburi"},
    {value: "Rayong", label: "Rayong"},
    {value: "Roi Et", label: "Roi Et"},
    {value: "Sa Kaeo", label: "Sa Kaeo"},
    {value: "Sakon Nakhon", label: "Sakon Nakhon"},
    {value: "Samut Prakan", label: "Samut Prakan"},
    {value: "Samut Sakhon", label: "Samut Sakhon"},
    {value: "Samut Songkhram", label: "Samut Songkhram"},
    {value: "Saraburi", label: "Saraburi"},
    {value: "Satun", label: "Satun"},
    {value: "Si Sa Ket", label: "Si Sa Ket"},
    {value: "Sing Buri", label: "Sing Buri"},
    {value: "Songkhla", label: "Songkhla"},
    {value: "Sukhothai", label: "Sukhothai"},
    {value: "Suphan Buri", label: "Suphan Buri"},
    {value: "Surat Thani", label: "Surat Thani"},
    {value: "Surin", label: "Surin"},
    {value: "Tak", label: "Tak"},
    {value: "Trang", label: "Trang"},
    {value: "Trat", label: "Trat"},
    {value: "Ubon Ratchathani", label: "Ubon Ratchathani"},
    {value: "Udon Thani", label: "Udon Thani"},
    {value: "Uthai Thani", label: "Uthai Thani"},
    {value: "Uttaradit", label: "Uttaradit"},
    {value: "Yala", label: "Yala"},
    {value: "Yasothon", label: "Yasothon"},
  ];

  const handleOptionClick = (value) => {
    locationInput.current.value = value;
    setShowDropdown(false);
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className="search-container">
      <h1 className="title">Find Cars</h1>
      <div className="search-wrap">
        <div className="search-box">
          <input
            ref={locationInput}
            type="text"
            placeholder={"Fill location"}
            name="search"
            onClick={handleClick}
          />
        </div>
        {showDropdown && (
          <ul className="options" ref={ref}>
            {options.sort().map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="filter-box">
        <div className="time-filter">
          <label>Start Date And Time</label>
          <input ref={startDateInput} type="date" />
        </div>
        <div className="time-filter">
          <label>Return Date And Time</label>
          <input ref={endDateInput} type="date" />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
