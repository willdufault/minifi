import Container from '../Container/Container'
import Divider from '../Divider/Divider'
import Footer from '../Footer/Footer'
import NavigationBar from '../NavigationBar/NavigationBar'

function Loading() {
  return (
    <>
      <NavigationBar />
      <Container>
        <div className="h-8 max-w-36 bg-gray-100 rounded-full"></div>
        {Array.from({ length: 10 }).map((_: unknown, index: number) => (
          <div key={index}>
            <Divider />
            <div className="h-6 max-w-96 mb-5 bg-gray-100 rounded-full"></div>
            <div className="h-4 max-w-64 bg-gray-100 rounded-full"></div>
          </div>
        ))}
      </Container>
      <Footer />
    </>
  )
}

export default Loading
