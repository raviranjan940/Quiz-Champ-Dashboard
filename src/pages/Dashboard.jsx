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
            <Card image="https://pbs.twimg.com/profile_images/819627547877056514/1_E9oabg_400x400.jpg" name={'Ajimon'} mob={1234567890} passId={123456} paySlip="https://public.bnbstatic.com/image/cms/article/body/202302/d9f75be540977a5782c30a277ff180b1.jpeg" aadhar="https://www.medianama.com/wp-content/uploads/2023/03/aadhaar-card-7579588_1280.png" schoolId="https://t3.ftcdn.net/jpg/02/72/40/44/360_F_272404412_MD9Qnk52bpTk9BEhpq2ZofYupyF8UWbg.jpg" />
        </div>
    </div>
  )
}

export default Dashboard