import { cn } from "@/libs/utils/cn";
import Image from "next/image";

type NavbarAuthProfileProps = {
  profilePicture: string;
  tokenStatus: boolean;
};
const NavbarAuthProfile = ({
  profilePicture,
  tokenStatus,
}: NavbarAuthProfileProps) => {
  return (
    <div
      className={cn(
        "w-[47px!important] h-[47px!important] rounded-full relative bg-sidebarNavHover hidden cursor-pointer",
        tokenStatus && "block"
      )}
    >
      <Image
        src={profilePicture ? profilePicture : "/ProfilFoto.png"}
        alt="pp"
        fill
        className="object-cover rounded-full   "
        sizes="(max-width: 47px)"
      />
    </div>
  );
};

export default NavbarAuthProfile;
