const handleClick = (stateFunc) => {
  stateFunc(prevValue => !prevValue);
}

const exportableFunctions = { handleClick };

export default exportableFunctions;