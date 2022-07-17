import { listNavigate } from "@config/navigate/navigate-list";
import { useRouter } from "next/router";
import useUIStore from "store/useUI/useUIStore";

const MainSidebar = () => {
  const router = useRouter();
  const { closeDrawer } = useUIStore();

  const pathStart = (path: string) => {
    let basePage;
    if (path.startsWith("/deposit")) {
      basePage = "/deposit";
    } else if (path.startsWith("/withdraw")) {
      basePage = "/withdraw";
    } else if (path.startsWith("/transfer")) {
      basePage = "/transfer";
    } else {
      basePage = path;
    }
    return basePage;
  };

  const handleRouter = (route: string) => {
    router.push(route);
    closeDrawer();
  };

  return (
    <div className="text-white">
      <div className="px-4 mt-8">
        <div className="pb-2 border-b border-gray-500">
          <div className="text-2xl font-semibold text-center">Menu</div>
        </div>
        <div className="flex flex-col space-y-4 text-center mt-8 text-xl">
          <ul className="mb-0 space-x-6">
            {listNavigate.map((item, index) => {
              return (
                <a
                  className={`no-underline hover:text-white font-semibold ${
                    pathStart(router.pathname) === item.pathName
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                  key={index}
                  onClick={() => handleRouter(item.slug)}
                >
                  <li className="cursor-pointer">{item.name}</li>
                </a>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
