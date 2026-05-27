// Your verified live MockAPI endpoint
const API_URL = 'https://6a172d6c1b90031f81b21f33.mockapi.io/api/v1/books'; 

export const api = {
  getBooks: async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Status ${res.status}: ${errorText}`);
      }
      return await res.json();
    } catch (err) {
      console.error("API Fetch Error:", err);
      throw err;
    }
  },

  addBook: async (book) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        // This will grab the exact message from MockAPI's servers
        throw new Error(`Status ${res.status} - ${errorText}`);
      }
      
      return await res.json();
    } catch (err) {
      // Explains EXACTLY why it failed in the popup
      alert(`🚨 API ERROR DETAIL:\n\n${err.message}\n\nIf it says 404, your MockAPI resource name is not spelled 'books'.`);
      throw err;
    }
  },

  updateBook: async (id, book) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Status ${res.status}: ${errorText}`);
      }
      return await res.json();
    } catch (err) {
      alert(`Failed to update book:\n${err.message}`);
      throw err;
    }
  },

  deleteBook: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Status ${res.status}: ${errorText}`);
      }
      return await res.json();
    } catch (err) {
      alert(`Failed to delete book:\n${err.message}`);
      throw err;
    }
  }
};