
const ComponentContainer = ({ className, children }) => {
    return <div className={`bg-white w-[80vw] xs:w-screen min-h-[100vh] rounded-xl sm:rounded-none  ${className}`}>{children}</div>;
}

export default ComponentContainer