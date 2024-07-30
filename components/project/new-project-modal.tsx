import { COLUMNS, PRIORITY, TAGS, USERS } from "@/utils/constant";
import DropDown from "../reusable/dropdown";
import InputField from "../reusable/custom-input";
import { useState } from "react";
import { IOption } from "@/types";

interface ICreate {
  handleClose: () => void;
}
const CreateNewProject: React.FC<ICreate> = ({ handleClose }) => {
  const options = COLUMNS.map(({ type, title, pointColor }) => {
    return { key: type, value: title, icon: pointColor };
  });
  const userOptions = USERS.map(({ name, id }) => {
    return { key: id, value: name };
  });
  const [values, setValues] = useState({
    type: "todo",
    assignee: [],
    summary: "",
    priority: "low",
    tags: [],
  });

  const handleSet = ({
    name,
    value,
  }: {
    name: string;
    value: IOption | IOption[];
  }) => {
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.summary.length) {
      handleClose();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 pt-10">
        <DropDown
          options={options}
          label="Status"
          name="type"
          onChange={handleSet}
        />
        <DropDown
          options={userOptions}
          label="Assignee"
          multi={true}
          name="assignee"
          onChange={handleSet}
        />
        <InputField
          label="Title (*This field is required)"
          name="title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValues((prev) => {
              return { ...prev, summary: e.target.value };
            });
          }}
        />
        <DropDown
          options={PRIORITY}
          label="Priority"
          name="priority"
          onChange={handleSet}
        />
        <DropDown
          options={TAGS}
          label="Tags"
          multi={true}
          name="tags"
          onChange={handleSet}
        />
        <div className="w-full flex gap-2 mt-5">
          <button
            onClick={handleClose}
            className="text-dark-blue bg-ghost-white border border-gainsboro rounded-2xl py-2 w-full px-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-royal-purple text-white rounded-xl py-2 w-full px-6"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateNewProject;
