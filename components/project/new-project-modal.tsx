import { COLUMNS, PRIORITY, TAGS, USERS } from "@/utils/constant";
import DropDown from "../reusable/dropdown";
import InputField from "../reusable/custom-input";
import { useState } from "react";
import { IOption, IUser } from "@/types";
import { useFetch, useMutationQuery } from "@/queries";
import { transformCreateTicketData } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";

interface ICreate {
  handleClose: () => void;
}
const CreateNewProject: React.FC<ICreate> = ({ handleClose }) => {
  const queryClient = useQueryClient();
  const { data: userData } = useFetch({
    url: "/user",
    queryKey: "user",
    select: (data: { users: IUser[] }) => {
      const user = data.users.map(({ name, id }) => {
        return { key: id, value: name };
      });
      return user;
    },
  });
  const mutate = useMutationQuery({
    method: "post",
    url: `/task`,
  });
  const options = COLUMNS.map(({ type, title, pointColor }) => {
    return { key: type, value: title, icon: pointColor };
  });
  const [values, setValues] = useState({
    type: "todo",
    users: [],
    title: "",
    priority: "low",
    tags: [],
    authorId: 1,
    content: "",
    published: true,
  });

  const handleSet = ({
    name,
    value,
  }: {
    name: string;
    value: IOption | IOption[] | number | string;
  }) => {
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.title.length) {
      const res = await mutate.mutateAsync(
        transformCreateTicketData(values as any)
      );
      if (res) {
        handleClose();
        await queryClient.refetchQueries();
      }
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
        {!!userData && (
          <DropDown
            options={userData}
            label="Users"
            multi={true}
            name="users"
            onChange={handleSet}
          />
        )}
        <InputField
          label="Title (*This field is required)"
          name="title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValues((prev) => {
              return { ...prev, title: e.target.value };
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
            id="create_ticket"
            type="submit"
            className="bg-royal-purple text-white rounded-xl py-2 w-full px-6 disabled:opacity-55"
            disabled={!values.title.length}
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateNewProject;
