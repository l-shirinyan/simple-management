import Breadcrumb from "../reusable/breadcrumb";
import AddIcon from "@/assets/icons/icon-add.svg";
import FilterBoard from "../reusable/filter-board";
import MainBoard from "../reusable/main-board";
const breadcrumbs = [
  {
    link: "/",
    text: "Home",
  },
  {
    link: "/",
    text: "Projects",
  },
  {
    link: "/",
    text: "Projet champion 💪 ",
  },
];
const ProjectChampion = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between md:items-center mb-5 flex-col md:flex-row gap-5 md:gap-0">
        <div>
          <h5 className="text-dark-blue text-2xl/[30px] font-black mb-[6px]">
            Projet champion 💪
          </h5>
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <button className="bg-royal-purple rounded-lg flex items-center gap-[9px] pl-[13px] pr-[18px] py-[10px] text-base/6 font-black min-w-[234px] text-white">
          <AddIcon />
          Create a new procedure
        </button>
      </div>
      <FilterBoard />
      <div className="py-[30px] overflow-x-auto overflow-y-hidden">
        <MainBoard />
      </div>
    </div>
  );
};

export default ProjectChampion;
