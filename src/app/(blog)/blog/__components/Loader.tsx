// ** import svg
import LoaderSvg from '../__icons/Loader'

const Loader = () => {
  return (
    <div className='mx-auto w-fit p-10' role='status'>
      <LoaderSvg />
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Loader
