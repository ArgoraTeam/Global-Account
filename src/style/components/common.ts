import { Button } from '@material-ui/core';
import styled from 'styled-components';
import {Alert} from '@material-ui/lab';
import { colors, transition } from '../../constants';

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

const ButtonS = styled(Button)`
  ${transition}
  color: ${colors.purple[0]};
  &:hover {
    color: ${colors.purple[2]};
  }
`;

const CenteredS = styled('div')`
  text-align: center;
`;

const JsonS = styled('div')`
  white-space: pre;
  font-family: monospace;
`;

export {AlertS, BannerS, ButtonS, CenteredS, JsonS};