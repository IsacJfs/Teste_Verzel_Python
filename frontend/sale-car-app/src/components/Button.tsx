interface ButtonProps {
  label: string
  secondary?: boolean
  fullWidth?: boolean
  large?: boolean
  onClick: () => void
  disabled?: boolean
  outline?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-md
        font-semibold
        transition
        hover:opacity-80
        border-[1px]
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : 'bg-sky-500'}
        ${secondary ? 'text-black font-normal' : 'text-white'}
        ${secondary ? 'border-black' : 'border-sky-500'}
        ${secondary ? 'hover:bg-slate-100' : ''}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-1'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''}
      `}
    >
      {label}
    </button>
  )
}

export default Button
