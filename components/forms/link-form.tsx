'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { useAuth } from '@/components/context/auth-context';

interface LinkFormProps {
  editing?: boolean;
  initialData?: any;
}

const LinkForm: React.FC<LinkFormProps> = ({ editing = false, initialData = {} }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createSupabaseBrowserClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (editing) {
        // Update an existing link
        const { data, error } = await supabase
          .from('links')
          .update({
            name: formData.name,
            price: formData.price,
            url: formData.url,
            preview_url: formData.preview_url,
            description: formData.description,
          })
          .eq('id', formData.id);

        if (error) {
          setError(error.message);
        } else {
          router.push('/links');
        }
      } else {
        // Create a new link
        const { data, error } = await supabase
          .from('links')
          .insert([
            {
              owner: user.id,
              name: formData.name,
              price: formData.price,
              url: formData.url,
              preview_url: formData.preview_url,
              description: formData.description,
              unique_permalink: generatePermalink(),
            },
          ]);

        if (error) {
          setError(error.message);
        } else {
          router.push('/links');
        }
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this link? There's no going back!");
    if (!confirmed) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('links')
        .delete()
        .eq('id', formData.id);

      if (error) {
        setError(error.message);
      } else {
        router.push('/links');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const generatePermalink = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  return (
    <form id="large-form" onSubmit={handleSubmit} className={editing ? 'editing-link' : ''}>
      {editing && (
        <a href="#" id="delete_link" onClick={handleDelete}>delete this link</a>
      )}
      <h3>{editing ? 'Edit link' : 'Create a new link'}</h3>

      {error && <div className="error">{error}</div>}

      <p>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          value={formData.name || ''}
          onChange={handleChange}
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </p>
      <p>
        <label htmlFor="description">Description:<br /><span className="faint">(optional)</span></label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          disabled={loading}
        ></textarea>
      </p>
      <p><button type="submit" disabled={loading}>{editing ? 'Save changes' : 'Add link'}</button></p>

      {editing && (
        <div className="mini-rule"></div>
      )}
    </form>
  );
};

export default LinkForm;
