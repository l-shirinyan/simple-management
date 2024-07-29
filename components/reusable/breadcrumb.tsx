import Link from "next/link";
interface IBreadcrumb {
  breadcrumbs: {
    link: string;
    text: string;
  }[];
}
const Breadcrumb: React.FC<IBreadcrumb> = ({ breadcrumbs }) => {
  return (
    <div>
      {breadcrumbs.map(({ link, text }, idx) => {
        return (
          <Link key={text} href={link} className="text-slate-gray text-sm/6">
            {text}
            {idx < breadcrumbs.length - 1 && " / "}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
