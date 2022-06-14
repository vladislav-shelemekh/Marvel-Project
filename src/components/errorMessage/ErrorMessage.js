import img from './error.gif'

const ErrorMesage = () => {
    return (
        <img src={img} style={{display: 'block', width: '250px', height: '250px', 
        objectFit: 'contain', margin: '0 auto'}} alt='error'/>
    )
}

export default ErrorMesage;