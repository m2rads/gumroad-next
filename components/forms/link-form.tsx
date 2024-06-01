'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { supabase } from '../utils/supabase';

interface LinkFormProps {
  editing?: boolean;
  initialData?: any;
}

const LinkForm: React.FC<LinkFormProps> = ({ editing = false, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);

    // if (editing) {
    //   const { error } = await supabase
    //     .from('links')
    //     .update(formData)
    //     .eq('id', formData.id);
    //   if (error) {
    //     console.error(error.message);
    //   } else {
    //     router.push('/links');
    //   }
    // } else {
    //   const { error } = await supabase
    //     .from('links')
    //     .insert([formData]);
    //   if (error) {
    //     console.error(error.message);
    //   } else {
    //     router.push('/links');
    //   }
    // }

    setLoading(false);
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this link? There's no going back!");
    // if (confirmed) {
    //   const { error } = await supabase
    //     .from('links')
    //     .delete()
    //     .eq('id', formData.id);
    //   if (error) {
    //     console.error(error.message);
    //   } else {
    //     router.push('/links');
    //   }
    // }
  };

  return (
    <form id="large-form" onSubmit={handleSubmit} className={editing ? 'editing-link' : ''}>
      {editing && (
        <a href="#" id="delete_link" onClick={handleDelete}>delete this link</a>
      )}
      <h3>{editing ? 'Edit link' : 'Create a new link'}</h3>

      <p>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          value={formData.name || ''}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="price">Price:</label>
        <input
          id="price"
          name="price"
          type="text"
          placeholder="$10"
          value={formData.price || ''}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          name="url"
          type="text"
          placeholder="http://"
          value={formData.url || ''}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="preview_url">Preview URL:</label>
        <input
          id="preview_url"
          name="preview_url"
          type="text"
          placeholder="http://"
          value={formData.preview_url || ''}
          onChange={handleChange}
        />
      </p>
      <p>
        <label htmlFor="description">Description:<br /><span className="faint">(optional)</span></label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
        ></textarea>
      </p>
      <p><button type="submit">{editing ? 'Save changes' : 'Add link'}</button></p>

      {editing && (
        <div className="mini-rule"></div>
      )}
    </form>
  );
};

export default LinkForm;
