import * as Icon from 'react-bootstrap-icons';

export const PasswordEye = ({ isPasswordHidden, setIsPasswordHidden }) => {
  const handleClick = () => {
    setIsPasswordHidden(prevValue => !prevValue);
  }

  return (
    isPasswordHidden
      ? <Icon.EyeSlash className="password-input-eye big-icon" onClick={handleClick} />
      : <Icon.Eye className="password-input-eye big-icon" onClick={handleClick} />
  )
}