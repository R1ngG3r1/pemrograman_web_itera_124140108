import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./BookForm.css";

const EMPTY_FORM = { title: "", author: "", status: "milik" };

function BookForm({ onSubmit, initialData = null, onCancel = () => {} }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  //  edit: isi form dengan data buku yang dipilih
  //  tambah: form akan kosong
  useEffect(() => {
    setForm(initialData ? initialData : EMPTY_FORM);
    setErrors({});
  }, [initialData]);

  // Satu handler untuk semua field (berdasarkan atribut name)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Peringatan kolom wajib diisi
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Judul wajib diisi";
    if (!form.author.trim()) newErrors.author = "Penulis wajib diisi";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      title: form.title.trim(),
      author: form.author.trim(),
      status: form.status,
    });
    setForm(EMPTY_FORM);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? "input-error" : ""}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          className={errors.author ? "input-error" : ""}
        />
        {errors.author && <span className="error-text">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang dibaca</option>
          <option value="beli">Ingin dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">
          {initialData ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
        {initialData && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(["milik", "baca", "beli"]),
  }),
  onCancel: PropTypes.func,
};

export default BookForm;
