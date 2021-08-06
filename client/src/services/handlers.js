const handleClick = (stateFunc) => {
  stateFunc(prevValue => !prevValue);
}

const handleHambMenuClick = (stateFunc) => {
  stateFunc(prevValue => !prevValue);
}

const handleClickOutsideHambMenu = (e, setHambMenu) => {
  const targetClasslist = e.target.classList;
  if (!targetClasslist.contains('nav__hamburger') && 
      !targetClasslist.contains('nav__hamburger-child')
    ) setHambMenu(false);
}

const exportableFunctions = { handleClick, handleHambMenuClick, handleClickOutsideHambMenu };

export default exportableFunctions;