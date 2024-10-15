import React from 'react'
interface MyComponentProps {
  children: React.ReactNode;
}
const Paragraph : React.FC<MyComponentProps> = ({children}) => {
	return (
		<p>{children}</p>
	)
}

export default Paragraph