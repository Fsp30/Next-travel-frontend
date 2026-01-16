'use client';

import { updateProfile } from '@/app/actions';
import type { CurrentUser } from '@/app/lib/auth';
import Image from 'next/image';
import { useState, useTransition } from 'react';

interface ProfileFormProps {
  user: NonNullable<CurrentUser>;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    profilePicture: user.profilePicture || '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.profilePicture || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      let profilePictureData = formData.profilePicture;

      if (selectedFile) {
        try {
          profilePictureData = await fileToBase64(selectedFile);
        } catch {
          setError('Erro ao processar a imagem');
          return;
        }
      }

      const result = await updateProfile({
        name: formData.name,
        profilePicture: profilePictureData,
      });

      if (result.success) {
        setSuccess(true);
        setSelectedFile(null);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error);
      }
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Imagem muito grande. Máximo 5MB.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Arquivo deve ser uma imagem.');
        return;
      }

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setSelectedFile(null);
      setImagePreview(user.profilePicture || null);
    }
  };

  const handleCancel = () => {
    setFormData({ name: user.name, profilePicture: user.profilePicture || '' });
    setImagePreview(user.profilePicture || null);
    setSelectedFile(null);
    setError(null);
    setSuccess(false);
  };

  const hasChanges = formData.name !== user.name || selectedFile !== null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 border p-6 rounded">
      <h2 className="text-xl font-semibold">Editar Perfil</h2>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-800 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-800 rounded">
          Perfil atualizado com sucesso!
        </div>
      )}

      <div>
        <label htmlFor="name" className="block font-medium mb-2">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          required
          className="w-full p-2 border rounded"
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="profilePicture" className="block font-medium mb-2">
          Foto de Perfil
        </label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          disabled={isPending}
        />

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Prévia:</p>
            <Image src={imagePreview} alt="Prévia da foto de perfil" />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={isPending || !hasChanges}>
          {isPending ? 'Salvando...' : 'Salvar Alterações'}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          disabled={isPending || !hasChanges}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Erro ao ler arquivo'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
