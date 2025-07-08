import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { Link, NavigateFunction, useNavigate } from 'react-router'
import IconButton from '../IconButton/IconButton'
import SearchBar from '../SearchBar/SearchBar'

function NavigationBar() {
  const navigate: NavigateFunction = useNavigate()

  return (
    <>
      <div className="max-w-screen px-5 py-4 mb-5 flex justify-between items-center sticky top-0 shadow-md bg-white lg:bg-transparent backdrop-blur-xl">
        <Link className="text-3xl" to="/">
          m<span className="text-red-500">i</span>n
          <span className="text-green-500">i</span>f
          <span className="text-blue-500">i</span>
        </Link>
        <div className="flex gap-4">
          <SearchBar />
          <IconButton
            icon={faPenToSquare}
            text="Write"
            color="blue"
            callback={() => navigate('/write')}
          />
        </div>
      </div>
    </>
  )
}

export default NavigationBar
