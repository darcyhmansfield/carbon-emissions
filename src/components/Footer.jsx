

const Footer = () => {
    const year = new Date().getFullYear();

    return (
    <footer className="py-4 text-center text-gray-100">
        {`Copyright © CarbonTrack ${year}`}
    </footer>
    )
}

export default Footer;