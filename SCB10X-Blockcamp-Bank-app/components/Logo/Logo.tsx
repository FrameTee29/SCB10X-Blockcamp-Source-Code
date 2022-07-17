import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="font-bold tracking-wider text-xl cursor-pointer">
        <h1 className="logo">10XBank</h1>
        {/* <span className="text-purple1">10</span>
        <span className="text-blue">X</span>
        <span className="text-green1">Bank</span> */}
      </div>
    </Link>
  );
};

export default Logo;
