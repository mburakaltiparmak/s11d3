import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
const Movie = (props) => {
  const { addToFavorites, deleteMovie } = props;

  const [movie, setMovie] = useState('');
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://nextgen-project.onrender.com/api/s11d3/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);
  const deleteHandler = () => {
    deleteMovie(id);

    toast.success('Film başarıyla silindi.', {
      position: 'top-right',
      autoClose: 3000,
    });
    history.push('/movies');
  };
  const favoriteHandler = () => {
    addToFavorites(movie);

    toast.success('Film favorilere eklendi.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };
  return (
    <div className="bg-white rounded-md shadow flex-1 dark:bg-slate-800 dark:text-white">
      <div className="p-5 pb-3 border-b border-zinc-200">
        <h4 className="text-xl font-bold">{movie.title} Detayları</h4>
      </div>
      <div className="px-5 py-3">
        <div className="py-1 flex">
          <div className="view-label">İsim</div>
          <div className="flex-1">{movie.title}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Yönetmen</div>
          <div className="flex-1">{movie.director}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Tür</div>
          <div className="flex-1">{movie.genre}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Metascore</div>
          <div className="flex-1">{movie.metascore}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Açıklama</div>
          <p className="flex-1">{movie.description}</p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-zinc-200 flex justify-end gap-2">
        <button
          className="myButton bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:hover:bg-blue-400 dark:text-slate-800"
          onClick={favoriteHandler}
        >
          Favorilere ekle
        </button>
        <button
          className="myButton bg-red-600 hover:bg-blue-500 dark:bg-red-600 dark:hover:bg-blue-400 dark:text-slate-800"
          onClick={deleteHandler}
        >
          Sil
        </button>
        <Link
          to={`/movies/edit/${movie.id}`}
          className="myButton bg-blue-600 hover:bg-blue-500 dark:bg-blue-200 dark:hover:bg-blue-400 dark:text-slate-800"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default Movie;
