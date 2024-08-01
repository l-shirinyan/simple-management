"use client";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableLocation,
  DropResult as DndDropResult,
} from "@hello-pangea/dnd";
import { DateRange, ICardInfo, IUser, TimeOfDay } from "@/types";
import { COLUMNS } from "@/utils/constant";
import BoardCard from "../reusable/board-card";
import { useFetch, useMutationQuery } from "@/queries";
import SkeletonLoading from "../reusable/skeleton-loading";
import { cn, convertToISODateUTC } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import { useQueryParams } from "@/hooks/useQueryParams";

interface State {
  [key: string]: ICardInfo[];
}

interface DropResult extends DndDropResult {}

const reorder = (
  list: ICardInfo[],
  startIndex: number,
  endIndex: number
): ICardInfo[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (
  source: ICardInfo[],
  destination: ICardInfo[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
): State => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  return {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };
};

const WorkingBoard = () => {
  const [state, setState] = useState<State>({});
  const { startDate, endDate, searchTerm } = useQueryParams();
  const start = convertToISODateUTC(startDate);
  const end = convertToISODateUTC(endDate, TimeOfDay.EndOfDay);
  const { isLoading, data } = useFetch<ICardInfo[]>({
    url: "/task",
    params: {
      ...(!!searchTerm && { search: searchTerm }),
      startDate: start,
      endDate: end,
    },
    queryKey: "task" + searchTerm + startDate + endDate,
    select: (data) => {
      const initialState: State = {};

      COLUMNS.forEach(({ type }) => {
        initialState[type] = data.filter((ticket) => ticket.type === type);
      });

      return initialState;
    },
  });
  const { data: userData } = useFetch({
    url: "/user",
    queryKey: "user",
    select: (data: { users: IUser[] }) => {
      return data.users;
    },
  });
  const mutate = useMutationQuery({
    method: "patch",
    url: "/task",
  });
  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceList = state[source.droppableId];
    const destinationList = state[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const reorderedList = reorder(
        sourceList,
        source.index,
        destination.index
      );
      setState((prevState) => ({
        ...prevState,
        [source.droppableId]: reorderedList,
      }));
    } else {
      const result = move(sourceList, destinationList, source, destination);
      setState((prevState) => ({
        ...prevState,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      }));
      mutate.mutate({
        id: draggableId,
        type: destination.droppableId,
      });
    }
  };

  return (
    <div className="py-[30px] overflow-x-auto overflow-y-hidden">
      <div
        className="grid grid-cols-4 gap-[30px] min-w-[1200px] w-full"
        id="boards"
      >
        {COLUMNS.map(({ pointColor, title, type }, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center gap-[10px] sticky top-0 bg-light-silver pb-5"
            >
              <div className={cn(pointColor, "size-4 rounded-full")}></div>
              <h5 className="text-sm font-black text-dark-blue">
                {title}{" "}
                {!!state[type]?.length && <span>({state[type]?.length})</span>}
              </h5>
            </div>
          );
        })}
      </div>
      {isLoading ? (
        <div className="h-full grid grid-cols-4 gap-[30px] min-w-[1200px] w-full overflow-hidden">
          {new Array(4).fill(null).map((it, idx) => {
            return <SkeletonLoading key={idx} />;
          })}
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-[30px] min-w-[1200px] w-full">
            {COLUMNS.map(({ type }) => (
              <Droppable key={type} droppableId={type} direction="vertical">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col"
                    data-testid={`${type}-column`}
                  >
                    <div className="max-h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden scrollbar-hide">
                      {state[type]?.map((ticket, index) => (
                        <Draggable
                          key={ticket.id}
                          draggableId={ticket.id + ""}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              data-testid={`board-card-${ticket.id}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <BoardCard
                                ticket={ticket}
                                userData={userData as any}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
};

export default WorkingBoard;
