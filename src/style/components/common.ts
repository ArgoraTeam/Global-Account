import styled from 'styled-components';
import {Alert} from '@material-ui/lab';

const AlertS = styled(Alert)`
  margin: auto;
  max-width: 600px;
`;

const BannerS = styled('div')`
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: smaller;
  background-color: blue;
  color: white;
  text-align: center;
  padding: 5px;
  z-index: 1000;
`;

export {AlertS, BannerS};