type buttonProps = {
    text: string;
    cn?: string;
}
const SettingsButton = (buttonProps : buttonProps) => {
  return (
    <div>
      <button className={`bg-gray/35 hover:bg-gray/60 cursor-pointer text-textcolor font-normal py-2 px-4 rounded-lg ${buttonProps.cn || ''}`}>
        {`${buttonProps.text}`}
      </button>
    </div>
  )
}

export default SettingsButton
