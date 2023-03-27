import {useState} from "react";

export const FormComponent = ()=>{

    const [src, setSrc] = useState("");

    const submit = async (e)=>{
        e.preventDefault();
        
        let data = new FormData();
        data.append('image', e.target[0].files[0]) //il primo parametro è il name che usereme nel metodo single di multer

        let res = await fetch("http://localhost:3030/upload", {
            method: 'POST',
            body: data
        }).then(res=>res.json())
        console.log("RESPONSE", res);
        setSrc(res.upload);
        //aggiungere dati al backend
    }
    return (<form onSubmit={submit} encType="multipart/form-data">
        <h1>UPLOAD NUOVA IMMAGINE:</h1>
        <input type="file" name="uploadImage" />
        <button type="submit">Invia</button>


        <img alt="img" src={src} />
    </form>)
}

export const FormUpdateComponent = ()=>{

    const [src, setSrc] = useState("");
    const [authorId, setAuthorId] = useState("");
    console.log(authorId);

    const submit = async (e)=>{
        e.preventDefault();
        let data = new FormData();
        data.append('image', e.target[1].files[0]) //il primo parametro è il name che usereme nel metodo single di multer

        let res = await fetch(`http://localhost:3030/authors/${authorId}/avatar`, {
            method: 'PATCH',
            body: data
        }).then(res=>res.json())
        console.log("RESPONSE", res);
        setSrc(res.payload.avatar);
        //aggiungere dati al backend
    }
    return (<form onSubmit={submit} encType="multipart/form-data">
        <hr></hr>
        <h1>AGGIORNA AVATAR AUTORE:</h1>
        <input type="text" name="authorId" placeholder="Insert Author's ID" onChange={(e) => setAuthorId(e.target.value)} />
        <input type="file" name="uploadImage" />
        <button type="submit">Invia</button>


        <img alt="img" src={src} />
    </form>)
}

export const UpdatePostCover = ()=>{

    const [src, setSrc] = useState("");
    const [postId, setPostId] = useState("");
    console.log(postId);

    const submit = async (e)=>{
        e.preventDefault();
        let data = new FormData();
        data.append('image', e.target[1].files[0]) //il primo parametro è il name che usereme nel metodo single di multer

        let res = await fetch(`http://localhost:3030/posts/${postId}/cover`, {
            method: 'PATCH',
            body: data
        }).then(res=>res.json())
        console.log("RESPONSE", res);
        setSrc(res.payload.cover);
        //aggiungere dati al backend
    }
    return (<form onSubmit={submit} encType="multipart/form-data">
        <hr></hr>
        <h1>AGGIORNA COVER DEL POST:</h1>
        <input type="text" name="postId" placeholder="Insert Post's ID" onChange={(e) => setPostId(e.target.value)} />
        <input type="file" name="uploadImage" />
        <button type="submit">Invia</button>


        <img alt="img" src={src} />
    </form>)
}