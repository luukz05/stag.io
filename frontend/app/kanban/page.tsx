"use client";

import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { cardsData } from "./dataObject";
import { columnData } from "./dataObject";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { id } from "date-fns/locale";
import { get } from "http";

type Card = {
  id: number;
  text: string;
  description: string;
  column_id: number;
};

type Column = {
  id: number;
  title: string;
};

export default function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>(cardsData);
  const [kanbans, setKanbans] = useState<Column[]>(columnData);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [open, setOpen] = useState(false);

  const getCardsPos = (id: number) => cards.findIndex((card) => card.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeCardId = parseInt(active.id);
    const overCardId = parseInt(over.id);

    const activeCard = cards.find((card) => card.id === activeCardId);
    const overCard = cards.find((card) => card.id === overCardId);

    if (!activeCard || !overCard) return;

    const activeColumnId = activeCard.column_id;
    const overColumnId = overCard.column_id;

    // Lista de cards da coluna de origem e destino
    const activeColumnCards = cards.filter(
      (c) => c.column_id === activeColumnId
    );
    const overColumnCards = cards.filter((c) => c.column_id === overColumnId);

    const activeIndex = activeColumnCards.findIndex(
      (c) => c.id === activeCardId
    );
    const overIndex = overColumnCards.findIndex((c) => c.id === overCardId);

    if (activeColumnId === overColumnId) {
      // Reordenando dentro da mesma coluna
      const updatedColumnCards = arrayMove(
        activeColumnCards,
        activeIndex,
        overIndex
      );

      const updatedCards = cards.map((card) => {
        if (card.column_id !== activeColumnId) return card;
        return updatedColumnCards.find((c) => c.id === card.id) || card;
      });

      setCards(updatedCards);
    } else {
      // Movendo entre colunas
      const updatedCards = cards.map((card) => {
        if (card.id === activeCardId) {
          return { ...card, column_id: overColumnId };
        }
        return card;
      });

      setCards(updatedCards);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header fixo */}
        <header className="fixed w-full z-50 h-16 flex items-center gap-2 px-4 text-white bg-zinc-900 shadow-md">
          {/* <SidebarTrigger className="-ml-1" /> */}
          <h1 className="text-3xl font-bold">Kanban Board</h1>
        </header>
        {kanbans.length === 0 ? (
          <main className="h-full pt-16 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white flex items-center justify-center">
            {/* Coluna fantasma para adicionar nova */}
            <div className="w-96 h-96 flex-shrink-0 bg-white/5  backdrop-blur-md border border-dashed border-white/10 rounded-2xl shadow-inner p-4 flex flex-col items-center justify-center text-white cursor-pointer hover:bg-white/10 transition">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-purple-400 hover:bg-transparent flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Criar novo Kanban
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="sm:max-w-[425px]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Criar novo Kanban</AlertDialogTitle>
                  </AlertDialogHeader>

                  <form action="">
                    <div className="flex flex-col gap-4 mt-2">
                      <input
                        type="text"
                        placeholder="Título do Kanban"
                        className="bg-zinc-900 text-white rounded-md p-2 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        // value={newKanbanTitle}
                        // onChange={(e) => setNewKanbanTitle(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <AlertDialogCancel asChild>
                        <Button variant="outline">Cancelar</Button>
                      </AlertDialogCancel>
                      {/* <Button onClick={addKanban}>Criar</Button> */}
                    </div>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </main>
        ) : (
          <main className="h-full pt-16 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
            <DndContext onDragEnd={handleDragEnd}>
              <div className="flex flex-row gap-6 mt-5 h-fit max-h-full px-6 pb-6">
                {kanbans.map((column) => {
                  const columnCards = cards.filter(
                    (card) => card.column_id === column.id
                  );
                  return (
                    <KanbanColumn
                      key={column.id}
                      column={column}
                      cards={columnCards}
                    />
                  );
                })}

                {/* Coluna fantasma para adicionar nova */}
                <div className="w-96 flex-shrink-0 bg-white/5  backdrop-blur-md border border-dashed border-white/10 rounded-2xl shadow-inner p-4 flex flex-col items-center justify-center text-white cursor-pointer hover:bg-white/10 transition">
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-purple-400 hover:bg-transparent flex items-center gap-2"
                      >
                        <Plus size={18} />
                        Adicionar nova lista
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="sm:max-w-[425px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Criar nova coluna</AlertDialogTitle>
                      </AlertDialogHeader>

                      <form action="">
                        <div className="flex flex-col gap-4 mt-2">
                          <input
                            type="text"
                            placeholder="Título da coluna"
                            className="bg-zinc-900 text-white rounded-md p-2 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            autoFocus
                          />
                          <div className="flex justify-end gap-2">
                            <AlertDialogCancel asChild>
                              <Button variant="outline">Cancelar</Button>
                            </AlertDialogCancel>
                            {/* <Button onClick={addColumn}>Criar</Button> */}
                          </div>
                        </div>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </DndContext>
          </main>
        )}
        {/* Main com scroll-x para colunas, sem scroll-y */}
      </SidebarInset>
    </SidebarProvider>
  );
}

function KanbanColumn({ column, cards }: { column: Column; cards: Card[] }) {
  const { setNodeRef } = useDroppable({ id: column.id.toString() });

  return (
    <div
      ref={setNodeRef}
      className="w-96 flex-shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-4 flex flex-col"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-white">{column.title}</h2>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-purple-400 hover:bg-white/10 bg-transparent flex items-center gap-2"
          onClick={() => alert("Futuramente pode editar título")}
        >
          <Plus size={16} />
        </Button>
      </div>

      <SortableContext
        items={cards.map((card) => card.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3 pr-1">
          {cards.length === 0 ? (
            <p className="text-sm text-zinc-400 italic">
              Nenhuma tarefa nesta coluna.
            </p>
          ) : (
            cards.map((card) => <KanbanCard key={card.id} card={card} />)
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function KanbanCard({ card }: { card: Card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white/10 border border-white/10 backdrop-blur-md w-full max-h-20 rounded-xl p-4 text-white shadow flex flex-col justify-between"
    >
      <h3 className="font-medium break-words">{card.text}</h3>
    </div>
  );
}
