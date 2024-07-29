"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableLocation,
  DropResult as DndDropResult,
} from "@hello-pangea/dnd";
import BoardCard from "./board-card";
import { TICKETS } from "@/utils/mockdata";
import { ICardInfo } from "@/types";
import { COLUMNS } from "@/utils/constant";

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
  const [state, setState] = useState<State>(() => {
    const initialState: State = {};
    COLUMNS.forEach(({ type }) => {
      initialState[type] = TICKETS.filter((ticket) => ticket.type === type);
    });
    return initialState;
  });

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;
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
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-4 gap-[30px] min-w-[1200px] w-full">
        {COLUMNS.map(({ type }) => (
          <Droppable key={type} droppableId={type} direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col"
              >
                <div className="max-h-[calc(100vh-350px)] overflow-y-auto overflow-x-hidden scrollbar-hide">
                  {state[type].map((ticket, index) => (
                    <Draggable
                      key={ticket.id}
                      draggableId={ticket.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <BoardCard ticket={ticket} />
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
  );
};

export default WorkingBoard;
