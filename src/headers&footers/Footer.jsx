const Footer = ({darkMode}) => {
    return <div className={`h-[120px] ${darkMode ? 'dark' : 'light'} bg-slate-500 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 w-full font-bold border-t-4 border-fuchsia-700 flex justify-center items-center flex-col`}>
        <span className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-black ">Copyright ©{new Date().getFullYear()}. Made by</span>
        <span className="text-fuchsia-700 text-opacity-80 sm:text-lg md:text-xl xl:text-2xl">DRAGIŠA PETROVIĆ</span>
    </div>
    
}
export default Footer;