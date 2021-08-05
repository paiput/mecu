const handleChange = (stateFunc) => {
  stateFunc(prevValue => !prevValue);
}

const exportableFunctions = { handleChange };

export default exportableFunctions;