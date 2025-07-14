import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { KeyboardEvent } from 'react'
import { NavigateFunction, useNavigate } from 'react-router'

function SearchBar() {
  const navigate: NavigateFunction = useNavigate()

  /**
   * Redirect the user to the search page with their query.
   */
  function searchArticles(query: string): void {
    if (query.length > 0) {
      navigate(`/search?query=${query}`)
    }
  }

  /**
   * Search articles if the enter key is pressed.
   * @param event The keyboard event.
   */
  function searchBarKeyDownHandler(
    event: KeyboardEvent<HTMLInputElement>
  ): void {
    if (event.key === 'Enter') {
      searchArticles(event.currentTarget.value)
    }
  }

  return (
    <>
      <div className="border border-gray-400 rounded-full p-3 flex gap-2 justify-center items-center  hover:border-blue-500 focus-within:text-blue-500 focus-within:border-blue-500">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          onKeyDown={searchBarKeyDownHandler}
          placeholder="Search"
          className="h-[1rem] w-20 sm:w-48 outline-none"
        ></input>
      </div>
    </>
  )
}

export default SearchBar
