import PropTypes from 'prop-types'; 

const Card =({image, name, mob, passId, paySlip, aadhar, schoolId}) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-4'>
        <img src={image} alt='image' className=' rounded-full h-32 w-32 object-cover' />
        <div>
            <div>{name}</div>
            <div>{passId}</div>
            <div>{mob}</div>
        </div>
        <div>
            <div>
                <span></span>
                <img src={paySlip} />
            </div>
            <div>
                <span></span>
                <img src={aadhar} />
            </div>
            <div>
                <span></span>
                <img src={schoolId} />
            </div>
        </div>
        <button>Verify</button>
    </div>
  );
}

export default Card;
Card.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    mob: PropTypes.number,
    passId: PropTypes.number,
    paySlip: PropTypes.string,
    aadhar: PropTypes.string,
    schoolId: PropTypes.string
}   