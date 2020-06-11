import { environment } from '../environments/environment';

environment;

const addPost = (title, content) => {
  return fetch(`${environment.apiUrl}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  }).then((r) => r.json());
};

const deletePost = (id) => {
  return fetch(`${environment.apiUrl}/api/posts/${id}`, {
    method: 'DELETE',
  }).then((r) => r.json());
};

const fetchStatus = () => {
  return fetch(`${environment.apiUrl}/api`).then((r) => r.json());
};

const fetchPosts = () => {
  return fetch(`${environment.apiUrl}/api/posts`).then((r) => r.json());
};

const updatePost = () => {
  return fetch(`${environment.apiUrl}/api/posts/gIt6mVlTqGonw7J8`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Moj nowy tytul po update',
      content: 'Nowe lorem ipsum',
    }),
  }).then((r) => r.json());
};

export { deletePost, addPost, fetchStatus, fetchPosts, updatePost };
