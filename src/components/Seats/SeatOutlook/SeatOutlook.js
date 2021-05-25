import styled from 'styled-components';
import PropTypes from 'prop-types';

const SeatOutlook = styled.div.attrs(props => ({
  style: {
    gridColumnStart: props.y + 1,
    gridRowStart: props.x + 1,
    backgroundColor: props.color
  },
}))`border: 1px solid darkblue;
height: calc(20px + 2vmin);
width: calc(20px + 2vmin);
@media (max-width: 1200px) {
  height: calc(10px + 2vmin);
  width: calc(10px + 2vmin);
}`;

SeatOutlook.defaultProps = {
  color: 'white',
};

SeatOutlook.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  color: PropTypes.string,
};

export default SeatOutlook;