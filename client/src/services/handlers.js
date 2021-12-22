const handleClick = (setState) => {
  setState(prevValue => !prevValue);
};

const handleClickOutsideHambMenu = (e, setHambMenu) => {
  const targetClasslist = e.target.classList;
  if (!targetClasslist.contains('nav__hamburger') && 
      !targetClasslist.contains('nav__hamburger-child')
  ) setHambMenu(false);
};

const handleClickOutsideCartContainer = (e, setCartContainer) => {
  const targetClasslist = e.target.classList;
  if (!targetClasslist.contains('cart-button') && 
      !e.target.parentElement.classList.contains('cart-button') &&
      !targetClasslist.contains('cart-container') &&
      !e.target.parentElement.classList.contains('cart-container')
  ) setCartContainer(false);
};

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const exportableFunctions = { 
  handleClick, 
  handleClickOutsideHambMenu, 
  handleClickOutsideCartContainer,
  numberWithCommas
};

export default exportableFunctions;