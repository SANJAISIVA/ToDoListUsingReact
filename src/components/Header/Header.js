import './Header.css';


function Header() {

    const dateObj = new Date();
    const day = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const date = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    const curDate = `${day}, ${date}-${month}-${year}`;
    
    return(
        <div className="headerContainer">
            <img src='logo192.png' alt='logo'></img>
            {/* <h1>Siva's ToDo List</h1> */}
            {/* Changing the header */}
            <h1>Today's ToDo List</h1>
            <h3>{curDate}</h3>
        </div>
    );
    
}

export default Header;