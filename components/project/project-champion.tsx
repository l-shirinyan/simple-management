import Breadcrumb from "../reusable/breadcrumb";
import FilterBoard from "../reusable/filter-board";
import MainBoard from "../reusable/main-board";
import AddTicket from "./add-project";
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
        <AddTicket />
      </div>
      <FilterBoard />
      <div className="py-[30px] overflow-x-auto overflow-y-hidden">
        <MainBoard />
      </div>
    </div>
  );
};

export default ProjectChampion;
