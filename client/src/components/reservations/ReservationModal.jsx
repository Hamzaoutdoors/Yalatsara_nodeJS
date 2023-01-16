/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { HowToRegOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import ReserveForm from './ReserveForm';
import store from '../../redux/configureStore';
import { expandModal } from '../../redux/reservations/reservationsSlice';
import { mobile } from '../../responsive';
import { COLORS } from '../../constants';
import { useNavigate } from 'react-router-dom';

const ReserveBtn = styled(Button)`
  border: none;
  padding: 10px 20px;
  background-color: ${COLORS.primary};
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  width: 150px;
  text-decoration: none;
  text-align: center;
  justify-content: space-around;
  &:hover {
    color: ${COLORS.primary};
    background-color: white;
  }
  ${mobile({
    margin: '0 1rem 2rem 0',
  })}
`;

const Title = styled(DialogTitle)`
  background-color: ${COLORS.secondary}; 
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
`;

const Content = styled(DialogContent)`
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;


const FormContainer = styled(Typography)`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  width: 100%;
`;


const ModalDesc = styled(Typography)`
text-align: justify;
font-size: 0.7rem;
word-wrap: normal;
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
    boxShadow: '0px 0px 5px 0px #dadada',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    boxShadow: '0px 0px 5px 0px #dadada',
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <Title sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'black'
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </Title>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ReserveModal = () => {
  const { openModal } = useSelector((state) => state.reservations.utils);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const toggleModal = () => {
    isAuthenticated ? store.dispatch(expandModal(!openModal)) : navigate('/login', {replace: true});
  };

  return (
    <>
      <ReserveBtn variant="outlined" onClick={toggleModal}>
        <HowToRegOutlined />
        Book
      </ReserveBtn>

      <BootstrapDialog
        onClose={toggleModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleModal}>
        Book your place 
        </BootstrapDialogTitle>
        <Content dividers>
          <ModalDesc>
            Could you please provide number of place you want to reserve
          </ModalDesc>
          <FormContainer variant="div">
            <ReserveForm />
          </FormContainer>
        </Content>
      </BootstrapDialog>
    </>
  );
};

export default ReserveModal;