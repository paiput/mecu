const handleClick = (setState) => {
  setState(prevValue => !prevValue);
}

const handleClickOutsideHambMenu = (e, setHambMenu) => {
  const targetClasslist = e.target.classList;
  if (!targetClasslist.contains('nav__hamburger') && 
      !targetClasslist.contains('nav__hamburger-child')
    ) setHambMenu(false);
}

const handleClickOutsideCartContainer = (e, setCartContainer) => {
  const targetClasslist = e.target.classList;
  if (!targetClasslist.contains('cart-button') && 
      !e.target.parentElement.classList.contains('cart-button')
    ) setCartContainer(false);
}

const exportableFunctions = { handleClick, handleClickOutsideHambMenu, handleClickOutsideCartContainer };

export default exportableFunctions;