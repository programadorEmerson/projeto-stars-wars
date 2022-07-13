import { toast } from 'react-toastify';

const TIMMER_DELAY = 5000;

const AlertNotification = ({
  message,
  position = 'top-center',
  autoClose = TIMMER_DELAY,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = false,
  ...rest
}) => toast(message, {
  ...rest,
  progress: undefined,
  position,
  autoClose,
  hideProgressBar,
  closeOnClick,
  pauseOnHover,
  draggable,
});

export default AlertNotification;
