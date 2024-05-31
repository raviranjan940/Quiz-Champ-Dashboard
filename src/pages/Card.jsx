import PropTypes from 'prop-types'; 

const Card =({image, name, mob, passId, paySlip, aadhar, schoolId}) => {
  return (
    <div className='max-w-[600px] rounded overflow-hidden shadow-2xl m-4 p-4'>
        <div className='flex gap-6 p-2 justify-center divide-x-2' >
            <img src={image} alt={image} className='rounded-full h-36 object-cover mb-5 border-4 border-orange-500 ' />
            <div className='p-4 text-[18px] font-semibold self-center'>
                <div>
                    <label>Name: </label>
                    <span>{name}</span>
                </div>
                <div>
                    <label>Pass Id: </label>
                    <span>{passId}</span>
                </div>
                <div>
                    <label>Mobile: </label>
                    <span>{mob}</span>
                </div>
            </div>
        </div>
        <hr/>
        <div className='mt-3 flex gap-6 text-[18px] font-semibold mb-6'>
            <div>
                <span>Payment Slip</span>
                <img className='object-cover w-[220px] h-[410px] border border-gray-300' src={paySlip} />
            </div>
            <div>
                <div>
                    <span>Aadhar Card</span>
                    <img className='object-cover h-[190px] w-[350px] border border-gray-300' src={aadhar} />
                </div>
                <div>
                    <span>School ID</span>
                    <img className='object-cover h-[190px] w-[350px] border border-gray-300' src={schoolId} />
                </div>
            </div>
        </div>
        <hr/>
        <div className='flex justify-end'>
            <button className='mt-4 p-2 px-10 bg-blue-500 rounded-lg text-white font-semibold text-lg hover:bg-blue-400'>Verify</button>
        </div>
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