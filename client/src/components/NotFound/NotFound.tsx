import NavigationBar from '../NavigationBar/NavigationBar'

function NotFound() {
  return (
    <>
      <NavigationBar />
      <div className="mt-32 mx-auto w-fit text-center">
        <h1 className="text-8xl mb-6">🤔</h1>
        <p className="text-3xl font-bold">404</p>
        <p className="text-lg">Page not found</p>
      </div>
    </>
  )
}

export default NotFound
