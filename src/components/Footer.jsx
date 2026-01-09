import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaInstagram, FaGithub } from "react-icons/fa";

const socialLinks = [
    { href: "https://github.com/ajay-ackerman", icon: <FaGithub /> },
    { href: "https://x.com/India_KTM/", icon: <FaTwitter /> },
    { href: "https://www.instagram.com/ktm_official/?hl=en", icon: <FaInstagram /> },
];

const Footer = () => {
    return (
        <footer className="w-screen bg-orange-400 py-4 text-black">
            <div className="container mx-auto flex  items-center justify-between gap-4 px-4 flex-row w-full">

                <div className="flex justify-center gap-4 w-full ">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black transition-colors duration-500 ease-in-out hover:text-white"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;