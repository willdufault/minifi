import Container from '../Container/Container'
import Divider from '../Divider/Divider'

function Footer() {
  const year: number = new Date().getFullYear()

  return (
    <>
      <Container>
        <Divider />
        <div className="pb-4 flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Copyright &copy; {year} Will Dufault
          </p>
          {/* //TODO ADD MORE STUFF TO FOOTER */}
        </div>
      </Container>
    </>
  )
}

export default Footer
