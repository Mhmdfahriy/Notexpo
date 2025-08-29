import 'react-native-url-polyfill/auto';
import { useState, useEffect } from "react";
import { supabase } from "./supabase";

type Note = {
  id: number;
  title: string;
  content: string;
};

export function useNote() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // 🔹 Ambil data saat awal load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from("notes").select("*").order("id", { ascending: true });
    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      setNotes(data as Note[]);
    }
  };

  const addOrUpdateNote = async () => {
    if (note.trim() === "") return;

    if (editingNote) {
      // Update
      const { data, error } = await supabase
        .from("notes")
        .update({ content: note })
        .eq("id", editingNote.id)
        .select();

      if (!error && data) {
        setNotes(notes.map((n) => (n.id === editingNote.id ? data[0] : n)));
        setEditingNote(null);
      }
    } else {
      // Insert
      const { data, error } = await supabase
        .from("notes")
        .insert([{ title: "Catatan Baru", content: note }])
        .select();

      if (!error && data) {
        setNotes([...notes, data[0]]);
      }
    }
    setNote("");
  };

  const deleteNote = async (id: number) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (!error) {
      setNotes(notes.filter((n) => n.id !== id));
      if (editingNote?.id === id) {
        setNote("");
        setEditingNote(null);
      }
    }
  };

  const editNote = (n: Note) => {
    setNote(n.content);
    setEditingNote(n);
  };

  return { note, notes, editingNote, setNote, addOrUpdateNote, deleteNote, editNote };
}
