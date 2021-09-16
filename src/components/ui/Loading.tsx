import {SelfBuildingSquareSpinner} from 'react-epic-spinners';
import {colors} from '../../constants';

function Loading() {
  return(
    <div style={{
      position: 'absolute',
      left: '50%',
    }}>
      <div style={{
        position: 'relative',
        left: '-50%',
        marginTop: '50%',
        zIndex: 100
      }}>
        <SelfBuildingSquareSpinner color={colors.purple[1]} />
      </div>
    </div>
  );
}

export default Loading;