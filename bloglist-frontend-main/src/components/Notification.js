const Notification = ({ message, errorFlag }) => {
  if (message === '') {
    return null
  }
  else if(errorFlag){
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  else{
    return(
      <div className='notification'>
        {message}
      </div>
    )
  }
}
export default Notification