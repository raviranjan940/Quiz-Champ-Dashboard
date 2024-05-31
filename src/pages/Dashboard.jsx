import Card from "./Card"


function Dashboard() {
  return (
    <div>
        <nav className="border border-gray-200">
            <div className='flex flex-wrap item-center justify-between mx-auto p-4'>
                <a href='https://www.satyalok.in/quizchamp' target="_blank" className='flex item-center space-x-2'>
                    <img src="quizChampLogo.png" className='h-16' alt='Quiz Champ Logo' />
                    <span className='self-center text-xl font-semibold'>Quiz Champ</span>
                </a>

                <button type='button' className='items-center px-10 bg-red-500  justify-center text-white rounded-lg hidden md:inline-flex hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200'>
                    <span className='self-center text-xl font-semibold'>Logout</span>
                </button>
            </div>
        </nav>
        <div>
            <Card name={'Ajimon'} mob={1234567890} passId={123456} paySlip={'paySlip.jpg'} aadhar={'aadhar.jpg'} schoolId={'schoolId.jpg'} />
        </div>
    </div>
  )
}

export default Dashboard