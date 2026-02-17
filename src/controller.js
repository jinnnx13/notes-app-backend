import { nanoid } from 'nanoid';
import notes from '../src/notes.js';

export const createNote = (req, res) => {
  const { title = 'untitled', tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = { title, tags, body, id, createdAt, updatedAt };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: { noteId: id }
    });
  }

  return res.status(500).json({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });
};

export const getNotes = (req, res) => {
  return res.json({
    status: 'success',
    data: { notes }
  });
};

export const getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find((n) => n.id === id);
  if (note) {
    return res.json({
      status: 'success',
      data: { note }
    });
  }
  return res.status(404).json({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  });
};

export const updateNoteById = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((n) => n.id === id);

  if (index != -1){
    notes[index] = { ...notes[index], title, tags, body, updatedAt };
    return res.json({
      status: 'success',
      message: 'Catatan Berhasil diperbarui'
    });
  }
  return res.status(404).json({
    status: 'fail',
    message: 'Gagal Mengubah Note, No Id Found'
  });
};

export const deleteNotebyID = (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1){
    notes.splice(index, 1);
    return res.json({
      status: 'success',
      message: 'Catatan Berhasil dihapus'
    });
  }
  return res.status(404).json({
    status: 'fail',
    message: 'catatan gagal dhapus. No Id Found'
  });
};