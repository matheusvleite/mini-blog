import React, { useEffect } from 'react';
import styles from './EditPost.module.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, seTags] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tags.join(",")
            seTags(textTags);
        }
    }, [post])

    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument('posts');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar post: {post.title}</h2>
                    <p>Edite os dados do post.</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder='Pense num bom título'
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>Url da imagem:</span>
                            <input
                                type="text"
                                name="image"
                                required
                                placeholder='Insira uma imagem para o post'
                                onChange={e => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}>Preview da imagem:</p>
                        <img src={post.image} alt={post.title} className={styles.image_preview} />
                        <label>
                            <span>Conteúdo:</span>
                            <textarea
                                name="body"
                                required
                                placeholder='Insira o conteúdo do post'
                                onChange={e => setBody(e.target.value)}
                                value={body}
                            >
                            </textarea>
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input
                                type="text"
                                name="tags"
                                required
                                placeholder='Insira as tags separadas por vírgula'
                                onChange={e => seTags(e.target.value)}
                                value={tags}
                            />
                        </label>
                        {response.loading ? <button className='btn' disabled>Aguarde...</button> :
                            <button className='btn'>Editar post</button>
                        }
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost