import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import logoProfile from "/public/assets/foto-profile.png";

function Navbar() {
    const getUsername = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        window.location.href = '/';
    }

    return (
        <div className="flex items-center justify-between md:wrapper wrapper-mobile pt-5">
            <img src="/src/assets/logo-answerly.png" alt="" className="md:w-60 w-40" />
            <Popover>
                <PopoverTrigger>
                    <div className="flex items-center gap-3 border border-[#e48449] rounded-full px-5">
                        <Avatar className="h-14">
                            <AvatarImage src={logoProfile} />
                            <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        <h1>{getUsername}</h1>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-40 absolute -right-14 bg-[#FCFAEE] cursor-pointer" onClick={handleLogout}>
                    <button className="w-full px-2">Logout</button>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Navbar