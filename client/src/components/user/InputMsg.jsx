import * as Icon from 'react-bootstrap-icons';

export const InputMsg = ({ msg }) => {
  return (
    <div className="input-msg-container">
      <Icon.ExclamationCircle /><p>{msg}</p>
    </div>
  );
};